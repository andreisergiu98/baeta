import type { ExecutionResult } from 'graphql';
import type { AbortSignalLike } from './abort-signal.ts';
import type { DedupeKey, DedupeRegistry } from './dedupe.ts';
import type { CompiledOperation, SubscriptionsCache } from './execution-cache.ts';
import { executeSubscriptionResolve } from './execution.ts';
import type { FilterRegistry } from './filter.ts';
import type { CreateContext } from './options.ts';
import type { SubscriptionState } from './state.ts';
import { resolveStore, type SubscriptionStoreProvider } from './store.ts';
import type { SubscriptionBatchMessage, SubscriptionTransport } from './transport.ts';

export interface EmitOptions {
	signal?: AbortSignalLike;
}

export async function emit<Context, ContextParams>(
	cache: SubscriptionsCache,
	storeProvider: SubscriptionStoreProvider,
	transport: SubscriptionTransport,
	createContext: CreateContext<Context, ContextParams> | undefined,
	topic: string,
	payload: unknown,
	filterRegistry?: FilterRegistry,
	dedupeRegistry?: DedupeRegistry,
	emitOptions?: EmitOptions,
): Promise<void> {
	const store = await resolveStore(storeProvider);
	const subscriptions = await store.getSubscriptions(topic);
	if (subscriptions.length === 0) {
		return;
	}
	const dedupeMap = new Map<CompiledOperation, Map<DedupeKey, Promise<ExecutionResult>>>();
	const rawMessages = await Promise.all(
		subscriptions.map((state) =>
			createMessage(
				cache,
				createContext,
				state,
				payload,
				dedupeMap,
				filterRegistry,
				dedupeRegistry,
				emitOptions,
			),
		),
	);

	const messages = dedupeMessage(rawMessages);
	if (messages.length === 0) {
		return;
	}

	await transport.sendBatch(messages);
}

export async function emitSubscribePayloads<Context>(
	cache: SubscriptionsCache,
	transport: SubscriptionTransport,
	context: Context,
	state: SubscriptionState,
	payloads: unknown[],
	filterRegistry?: FilterRegistry,
	dedupeRegistry?: DedupeRegistry,
	emitOptions?: EmitOptions,
): Promise<void> {
	const createContext: CreateContext<Context, unknown> = () => context;
	const rawMessages = await Promise.all(
		payloads.map((item) =>
			createMessage(
				cache,
				createContext,
				state,
				item,
				new Map<CompiledOperation, Map<DedupeKey, Promise<ExecutionResult>>>(),
				filterRegistry,
				dedupeRegistry,
				emitOptions,
			),
		),
	);

	const messages: SubscriptionBatchMessage[] = [];
	for (const rawMessage of rawMessages) {
		if (rawMessage === null) {
			continue;
		}
		messages.push({
			destinations: [
				{ connectionId: rawMessage.connectionId, subscriptionId: rawMessage.subscriptionId },
			],
			result: rawMessage.result,
		});
	}

	if (messages.length === 0) {
		return;
	}

	await transport.sendBatch(messages);
}

function dedupeMessage(rawMessages: Array<RawMessage | null>): SubscriptionBatchMessage[] {
	const map = new Map<ExecutionResult, Array<{ connectionId: string; subscriptionId: string }>>();

	for (const rawMessage of rawMessages) {
		if (rawMessage === null) {
			continue;
		}
		const { connectionId, subscriptionId, result } = rawMessage;
		const destinations = map.get(result);
		if (destinations) {
			destinations.push({ connectionId, subscriptionId });
		} else {
			map.set(result, [{ connectionId, subscriptionId }]);
		}
	}

	return Array.from(map.entries(), ([result, destinations]) => ({
		destinations,
		result,
	}));
}

interface RawMessage {
	connectionId: string;
	subscriptionId: string;
	result: ExecutionResult;
}

async function createMessage<Context, ContextParams>(
	cache: SubscriptionsCache,
	createContext: CreateContext<Context, ContextParams> | undefined,
	state: SubscriptionState,
	payload: unknown,
	dedupeMap: Map<CompiledOperation, Map<DedupeKey, Promise<ExecutionResult>>>,
	filterRegistry?: FilterRegistry,
	dedupeRegistry?: DedupeRegistry,
	emitOptions?: EmitOptions,
): Promise<RawMessage | null> {
	const result = await executeSubscriptionResolve(
		{
			state,
			payload,
			createContext,
			abortSignal: emitOptions?.signal,
		},
		cache,
		dedupeMap,
		filterRegistry,
		dedupeRegistry,
	);
	if (result === null) {
		return null;
	}
	return {
		connectionId: state.connectionId,
		subscriptionId: state.id,
		result,
	};
}
