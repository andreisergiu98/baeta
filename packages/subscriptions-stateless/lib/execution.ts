import {
	type ExecutionResult,
	GraphQLError,
	type GraphQLSchema,
	type ValidatedSubscriptionArgs,
	createSourceEventStream,
	executeSubscriptionEvent,
	parse,
	validate,
	validateSubscriptionArgs,
} from 'graphql';
import { isAsyncIterable } from 'graphql/jsutils/isAsyncIterable.js';
import type { AbortSignalLike } from './abort-signal.ts';
import type { DedupeKey, DedupeRegistry } from './dedupe.ts';
import { toUnexpectedGraphQLError } from './errors.ts';
import type { CompiledOperation, SubscriptionsCache } from './execution-cache.ts';
import { isValidationErrorList } from './execution-utils.ts';
import { type FilterRegistry } from './filter.ts';
import type { SubscriptionState } from './state.ts';
import { type SubscriptionTopic, isSubscriptionTopic } from './topic.ts';

const defaultDedupeKey = Symbol('@baeta/subscriptions-stateless/default-dedupe-key');

export interface ExecuteSubscribeArgs {
	schema: GraphQLSchema;
	query: string;
	context: unknown;
	variables?: Record<string, unknown> | null;
	operationName?: string | null;
	hideSuggestions?: boolean;
	abortSignal?: AbortSignalLike;
}

export async function executeSubscriptionSubscribe(
	args: ExecuteSubscribeArgs,
): Promise<ExecutionResult | SubscriptionTopic> {
	try {
		const document = parse(args.query);
		const validationErrors = validate(args.schema, document, undefined, {
			hideSuggestions: args.hideSuggestions,
		});
		if (validationErrors.length > 0) {
			return { errors: validationErrors };
		}

		const validatedArgs = validateSubscriptionArgs({
			schema: args.schema,
			document,
			contextValue: args.context,
			variableValues: args.variables ?? undefined,
			operationName: args.operationName ?? undefined,
			hideSuggestions: args.hideSuggestions,
			abortSignal: args.abortSignal as any,
		});
		if (isValidationErrorList(validatedArgs)) {
			return { errors: validatedArgs };
		}

		const result = await createSourceEventStream(validatedArgs);
		if (!isAsyncIterable(result)) {
			return result;
		}
		if (!isSubscriptionTopic(result)) {
			throw new GraphQLError(
				'The result of createSourceEventStream is not a valid SubscriptionTopic',
			);
		}

		return result;
	} catch (err) {
		if (err instanceof GraphQLError) {
			return { errors: [err] };
		}
		return { errors: [toUnexpectedGraphQLError(err)] };
	}
}

export interface ExecuteResolveArgs<Context, ContextParams> {
	state: SubscriptionState;
	payload: unknown;
	createContext?: (params: ContextParams) => Context | PromiseLike<Context>;
	abortSignal?: AbortSignalLike;
}

export async function executeSubscriptionResolve<Context, ContextParams>(
	args: ExecuteResolveArgs<Context, ContextParams>,
	cache: SubscriptionsCache,
	dedupeMap: Map<CompiledOperation, Map<DedupeKey, Promise<ExecutionResult>>>,
	filterRegistry?: FilterRegistry,
	dedupeRegistry?: DedupeRegistry,
): Promise<ExecutionResult | null> {
	try {
		const operation = cache.getOperation(
			args.state.query,
			args.state.variables,
			args.state.operationName,
		);

		if (isValidationErrorList(operation.validated)) {
			return { errors: operation.validated };
		}

		const loadContext = lazyLoadContext(async () => {
			const context = args.state.contextParams ? JSON.parse(args.state.contextParams) : undefined;
			return await args.createContext?.(context);
		});

		if (filterRegistry && filterRegistry.size > 0) {
			const filtered = await isFiltered(operation, loadContext, args.payload, filterRegistry);
			if (filtered) return null;
		}

		const dedupeKey = await getDedupeKey(operation, loadContext, args.payload, dedupeRegistry);

		if (dedupeKey != null) {
			const dedupedResult = dedupeMap.get(operation)?.get(dedupeKey);
			if (dedupedResult) {
				try {
					const result = await dedupedResult;
					return result;
				} catch {
					// If deduped result failed, we will continue to execute the subscription resolve for this operation.
				}
			}
		}

		const resultPromise = executeSubscriptionEventWithContext(
			operation.validated,
			args.payload,
			args.abortSignal,
			loadContext,
		);

		if (dedupeKey != null) {
			let operationDedupeMap = dedupeMap.get(operation);
			if (!operationDedupeMap) {
				operationDedupeMap = new Map<DedupeKey, Promise<ExecutionResult>>();
				dedupeMap.set(operation, operationDedupeMap);
			}
			operationDedupeMap.set(dedupeKey, resultPromise);
		}

		return await resultPromise;
	} catch (err) {
		if (err instanceof GraphQLError) return { errors: [err] };
		return { errors: [toUnexpectedGraphQLError(err)] };
	}
}

async function executeSubscriptionEventWithContext<Context>(
	validatedArgs: ValidatedSubscriptionArgs,
	payload: unknown,
	abortSignal: AbortSignalLike | undefined,
	loadContext: () => Promise<Context>,
) {
	const contextValue = await loadContext();

	return await executeSubscriptionEvent({
		...validatedArgs,
		rootValue: payload,
		contextValue,
		externalAbortSignal: abortSignal as any,
	});
}

async function getDedupeKey(
	operation: CompiledOperation,
	loadContext: () => Promise<unknown>,
	payload: unknown,
	dedupeRegistry?: DedupeRegistry,
): Promise<DedupeKey | null> {
	if (dedupeRegistry == null) {
		return null;
	}

	const rootField = operation.getRootField();
	if (!rootField.ok) {
		throw rootField.error;
	}

	const dedupeConfig = dedupeRegistry.get(rootField.value.fieldDef.name);
	if (!dedupeConfig?.enabled) {
		return null;
	}

	if (dedupeConfig.getKey == null) {
		return defaultDedupeKey;
	}

	const args = operation.getArgValues();
	const key = await dedupeConfig.getKey({
		source: payload,
		args,
		loadContext,
	});

	return key;
}

async function isFiltered(
	operation: CompiledOperation,
	loadContext: () => Promise<unknown>,
	payload: unknown,
	filterRegistry: FilterRegistry,
): Promise<boolean> {
	const rootField = operation.getRootField();
	if (!rootField.ok) {
		throw rootField.error;
	}
	const args = operation.getArgValues();
	const predicates = filterRegistry.get(rootField.value.fieldDef.name);
	if (!predicates || predicates.length === 0) {
		return false;
	}
	const results = await Promise.all(
		predicates.map(async (predicate) => {
			const result = await predicate({
				source: payload,
				args,
				loadContext,
			});
			return result === true;
		}),
	);
	return results.some((result) => result === true);
}

function lazyLoadContext<T>(run: () => Promise<T>): () => Promise<T> {
	let promise: Promise<T> | null = null;
	return (): Promise<T> => {
		if (promise) {
			return promise;
		}
		try {
			promise = run();
			promise.catch(() => {});
			return promise;
		} catch (error) {
			promise = Promise.reject(error);
			return promise;
		}
	};
}
