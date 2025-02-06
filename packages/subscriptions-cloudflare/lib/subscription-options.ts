import type { GraphQLSchema } from 'graphql';
import type { PoolingType } from './pooling-type.ts';
import type { SubscriptionDatabase } from './subscription-database.ts';

export interface SubscriptionsContextLoader<Env, Context, ContextParams> {
	createContext: (
		params: ContextParams,
		env: Env,
		executionContext: Pick<ExecutionContext, 'passThroughOnException' | 'waitUntil'>,
	) => Context;
	getContextParams: (request: Request, env: Env) => ContextParams;
}

export interface SubscriptionsOptions<Env, Context, ContextParams> {
	schema: GraphQLSchema;
	poolingType?: PoolingType;
	context?: SubscriptionsContextLoader<Env, Context, ContextParams>;
	getDatabase: (env: Env) => SubscriptionDatabase;
	getWSConnections: (env: Env) => DurableObjectNamespace;
}
