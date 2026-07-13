import { type ExecutionResult, type GraphQLSchema } from 'graphql';
import type { AbortSignalLike } from './abort-signal.ts';
import { executeSubscriptionSubscribe } from './execution.ts';
import { isSubscriptionTopic } from './topic.ts';

export interface SubscriptionRequest {
	query: string;
	variables?: Record<string, unknown> | null;
	operationName?: string | null;
}

export interface SubscriptionState {
	id: string;
	connectionId: string;
	topic: string;
	query: string;
	variables: string | undefined;
	operationName: string | undefined;
	contextParams: string | undefined;
}

export interface CreateSubscriptionStateParams {
	id: string;
	connectionId: string;
	request: SubscriptionRequest;
	context: unknown;
	contextParams: unknown;
	hideSuggestions?: boolean;
	signal?: AbortSignalLike;
	schema: GraphQLSchema;
}

export async function createSubscriptionState(
	params: CreateSubscriptionStateParams,
): Promise<
	| { ok: true; state: SubscriptionState; payloads: unknown[] }
	| { ok: false; executionResult: ExecutionResult }
> {
	const result = await executeSubscriptionSubscribe({
		schema: params.schema,
		query: params.request.query,
		context: params.context,
		variables: params.request.variables ?? undefined,
		operationName: params.request.operationName ?? undefined,
		hideSuggestions: params.hideSuggestions,
		abortSignal: params.signal,
	});

	if (!isSubscriptionTopic(result)) {
		return { ok: false, executionResult: result };
	}

	return {
		ok: true,
		state: {
			id: params.id,
			connectionId: params.connectionId,
			topic: result.topic,
			query: params.request.query,
			variables: params.request.variables ? JSON.stringify(params.request.variables) : undefined,
			operationName: params.request.operationName ?? undefined,
			contextParams:
				params.contextParams === undefined ? undefined : JSON.stringify(params.contextParams),
		},
		payloads: result.payloads,
	};
}
