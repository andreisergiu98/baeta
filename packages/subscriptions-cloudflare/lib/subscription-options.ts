import type { CacheOptions } from '@baeta/subscriptions-stateless';
import type { GraphQLSchema } from 'graphql';
import type { PoolingType } from './pooling-type.ts';
import type { SubscriptionDatabase } from './subscription-database.ts';

export interface SubscriptionsContextLoader<Context, ContextParams> {
	createContext: (params: ContextParams) => Context | PromiseLike<Context>;
	getContextParams: (request: Request) => ContextParams | PromiseLike<ContextParams>;
}

export interface SubscriptionsOptions<Context, ContextParams> {
	schema: GraphQLSchema;
	poolingType?: PoolingType;
	context?: SubscriptionsContextLoader<Context, ContextParams>;
	hideSuggestions?: boolean;
	cache?: CacheOptions;
	getDatabase: () => SubscriptionDatabase;
	getWSConnections: () => DurableObjectNamespace;
}
