import type { GraphQLSchema } from 'graphql';
import type { DedupeRegistry } from './dedupe.ts';
import type { CacheOptions } from './execution-cache.ts';
import type { FilterRegistry } from './filter.ts';
import type { SubscriptionStoreProvider } from './store.ts';
import type { SubscriptionTransport } from './transport.ts';

export interface StatelessSubscriptionsOptions<Context, ContextParams> {
	schema: GraphQLSchema;
	store: SubscriptionStoreProvider;
	transport: SubscriptionTransport;
	createContext?: (params: ContextParams) => Context | PromiseLike<Context>;
	hideSuggestions?: boolean;
	cache?: CacheOptions;
	filterRegistry?: FilterRegistry;
	dedupeRegistry?: DedupeRegistry;
}

export type CreateContext<Context, ContextParams> = (
	params: ContextParams,
) => Context | PromiseLike<Context>;
