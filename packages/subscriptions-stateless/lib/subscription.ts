import type { ExecutionResult } from 'graphql';
import type { AbortSignalLike } from './abort-signal.ts';
import { emit, emitSubscribePayloads, type EmitOptions } from './emit.ts';
import { createSubscriptionsCache } from './execution-cache.ts';
import { listen } from './listen.ts';
import type { StatelessSubscriptionsOptions } from './options.ts';
import { readSubscriptionDedupe, readSubscriptionFilters } from './schema-state.ts';
import {
	createSubscriptionState,
	type SubscriptionRequest,
	type SubscriptionState,
} from './state.ts';
import { resolveStore } from './store.ts';

export type Emit<Map extends Record<string, any>> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
	payload: P,
	options?: EmitOptions,
) => Promise<void>;

export type Listen<Map extends Record<string, any>> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
) => AsyncIterable<P>;

export interface AddSubscriptionParams<ContextParams> {
	id: string;
	connectionId: string;
	request: SubscriptionRequest;
	contextParams: ContextParams;
	signal?: AbortSignalLike;
}

export interface StatelessSubscriptions<
	ContextParams = unknown,
	TopicMap extends Record<string, any> = Record<string, unknown>,
> {
	addSubscription: (
		params: AddSubscriptionParams<ContextParams>,
	) => Promise<{ ok: true; value: SubscriptionState } | { ok: false; value: ExecutionResult }>;
	removeSubscription: (subscriptionId: string) => Promise<void>;
	removeConnection: (connectionId: string) => Promise<void>;
	createListener: () => Listen<TopicMap>;
	createEmitter: () => Emit<TopicMap>;
}

export function createStatelessSubscriptions<
	Context = unknown,
	ContextParams = unknown,
	TopicMap extends Record<string, any> = Record<string, unknown>,
>(
	options: StatelessSubscriptionsOptions<Context, ContextParams>,
): StatelessSubscriptions<ContextParams, TopicMap> {
	const optionsFilterRegistry = options.filterRegistry;
	const schemaFilterRegistry = readSubscriptionFilters(options.schema);
	const filterRegistry = schemaFilterRegistry ?? optionsFilterRegistry;
	if (optionsFilterRegistry && schemaFilterRegistry) {
		throw new Error(
			'"filterRegistry" is defined in options, but the schema already has a "filterRegistry" registered. "filterRegistry" is needed only in contexts outside of Baeta ecosystem.',
		);
	}

	const optionsDedupeRegistry = options.dedupeRegistry;
	const schemaDedupeRegistry = readSubscriptionDedupe(options.schema);
	const dedupeRegistry = schemaDedupeRegistry ?? optionsDedupeRegistry;
	if (optionsDedupeRegistry && schemaDedupeRegistry) {
		throw new Error(
			'"dedupeRegistry" is defined in options, but the schema already has a "dedupeRegistry" registered. "dedupeRegistry" is needed only in contexts outside of Baeta ecosystem.',
		);
	}

	const cache = createSubscriptionsCache(
		options.schema,
		options.hideSuggestions,
		options.cache ?? {},
	);

	return {
		addSubscription: async (params) => {
			const context = await options.createContext?.(params.contextParams);
			const result = await createSubscriptionState({
				schema: options.schema,
				id: params.id,
				connectionId: params.connectionId,
				request: params.request,
				context,
				contextParams: params.contextParams,
				hideSuggestions: options.hideSuggestions,
				signal: params.signal,
			});
			if (!result.ok) {
				return { ok: false, value: result.executionResult };
			}
			const store = await resolveStore(options.store);
			await store.createSubscription(result.state);
			if (result.payloads.length > 0) {
				await emitSubscribePayloads(
					cache,
					options.transport,
					context,
					result.state,
					result.payloads,
					filterRegistry,
					dedupeRegistry,
				).catch(() => {
					// todo: add log
				});
			}
			return { ok: true, value: result.state };
		},
		removeSubscription: async (subscriptionId) => {
			const store = await resolveStore(options.store);
			await store.deleteSubscription(subscriptionId);
		},
		removeConnection: async (connectionId) => {
			const store = await resolveStore(options.store);
			await store.deleteSubscriptions(connectionId);
		},
		createListener: () => {
			return (topic) => {
				return listen(topic.toString());
			};
		},
		createEmitter: () => {
			return (topic, payload, emitOptions) => {
				return emit(
					cache,
					options.store,
					options.transport,
					options.createContext,
					topic.toString(),
					payload,
					filterRegistry,
					dedupeRegistry,
					emitOptions,
				);
			};
		},
	};
}
