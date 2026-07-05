import {
	type DocumentNode,
	type GraphQLError,
	type GraphQLSchema,
	type ValidatedSubscriptionArgs,
	getArgumentValues,
	parse,
	validateSubscriptionArgs,
} from 'graphql';
import { LRUCache } from 'lru-cache';
import {
	getSubscriptionRootField,
	isValidationErrorList,
	type SubscriptionRootField,
} from './execution-utils.ts';

const DEFAULT_CACHE_SIZE_MB = 1;
const BYTES_PER_MB = 1024 * 1024;

export type SubscriptionRootFieldResult =
	| { ok: true; value: SubscriptionRootField }
	| { ok: false; error: Error };

export interface CompiledOperation {
	validated: readonly GraphQLError[] | ValidatedSubscriptionArgs;
	getRootField: () => SubscriptionRootFieldResult;
	getArgValues: () => Record<string, unknown>;
}

export interface CacheOptions {
	cacheSizeMb?: number;
}

export interface SubscriptionsCache {
	getOperation: (query: string, variables?: string, operationName?: string) => CompiledOperation;
}

export function createSubscriptionsCache(
	schema: GraphQLSchema,
	hideSuggestions: boolean | undefined,
	options: CacheOptions,
): SubscriptionsCache {
	const cache = makeCache(options);

	const parseQuery = (query: string): DocumentNode => {
		const cached = cache.document.get(query);
		if (cached != null) {
			return cached;
		}
		const document = parse(query);
		cache.document.set(query, document);
		return document;
	};

	const compileOperation = (
		query: string,
		variables?: string,
		operationName?: string,
	): CompiledOperation => {
		const validated = validateSubscriptionArgs({
			schema,
			document: parseQuery(query),
			variableValues: variables ? JSON.parse(variables) : undefined,
			operationName,
			hideSuggestions,
		});

		let rootField: SubscriptionRootFieldResult | undefined;
		let argValues: Record<string, unknown> | undefined;

		const getRootField = (): SubscriptionRootFieldResult => {
			rootField ??= resolveRootField(validated);
			return rootField;
		};

		const getArgValues = (): Record<string, unknown> => {
			if (argValues != null) {
				return argValues;
			}
			if (isValidationErrorList(validated)) {
				throw new Error('Cannot coerce the arguments of an invalid operation.');
			}
			const root = getRootField();
			if (!root.ok) {
				throw root.error;
			}
			argValues = getArgumentValues(
				root.value.fieldDef,
				root.value.fieldNode,
				validated.variableValues,
				undefined,
				hideSuggestions,
			);
			return argValues;
		};

		return { validated, getRootField, getArgValues };
	};

	return {
		getOperation: (query, variables, operationName) => {
			const key = makeOperationKey(query, variables, operationName);
			const cached = cache.operation.get(key);
			if (cached != null) {
				return cached;
			}
			const operation = compileOperation(query, variables, operationName);
			cache.operation.set(key, operation);
			return operation;
		},
	};
}

type CacheEntry =
	| {
			type: 'document';
			value: DocumentNode;
	  }
	| {
			type: 'operation';
			value: CompiledOperation;
	  };

type CacheEntryType = CacheEntry['type'];

function makeCache(options: CacheOptions) {
	const cache = new LRUCache<string, CacheEntry>({
		maxSize: toCacheMaxSize(options.cacheSizeMb),
		sizeCalculation: (_value, key) => key.length,
	});
	const withType = <T extends CacheEntryType>(type: T) => ({
		get: (key: string) => {
			const entry = cache.get(`${type}:${key}`);
			if (entry == undefined) {
				return undefined;
			}
			if (entry.type !== type) {
				return undefined;
			}
			return entry.value as Extract<CacheEntry, { type: T }>['value'];
		},
		set: (key: string, value: Extract<CacheEntry, { type: T }>['value']) => {
			const cachedValue = { type, value } as const;
			cache.set(`${type}:${key}`, cachedValue as CacheEntry);
		},
	});
	return {
		document: withType('document'),
		operation: withType('operation'),
	};
}

function resolveRootField(
	validated: readonly GraphQLError[] | ValidatedSubscriptionArgs,
): SubscriptionRootFieldResult {
	if (isValidationErrorList(validated)) {
		return {
			ok: false,
			error: new Error('Cannot resolve the root field of an invalid operation.'),
		};
	}
	try {
		return { ok: true, value: getSubscriptionRootField(validated) };
	} catch (error) {
		return { ok: false, error: error as Error };
	}
}

function makeOperationKey(query: string, variables?: string, operationName?: string) {
	return [
		'query',
		query,
		'variables',
		variables ?? '_null_',
		'operationName',
		operationName ?? '_null_',
	].join('|');
}

function toCacheMaxSize(sizeMb?: number): number {
	if (sizeMb == null) {
		return DEFAULT_CACHE_SIZE_MB * BYTES_PER_MB;
	}
	return Math.max(1, Math.round(sizeMb * BYTES_PER_MB));
}
