import type { GraphQLSchema } from 'graphql';
import type { PoolingType } from './pooling-type.ts';
import type { SubscriptionDatabase } from './subscription-database.ts';

interface ContextLoader<Env, Context, ContextParams> {
	createContext: (params: ContextParams, env: Env, executionContext: ExecutionContext) => Context;
	getContextParams: (request: Request, env: Env) => ContextParams;
}

export interface SubscriptionsOptions<Env, Context, ContextParams> {
	schema: GraphQLSchema;
	poolingType?: PoolingType;
	context?: ContextLoader<Env, Context, ContextParams>;
	getDatabase: (env: Env) => SubscriptionDatabase;
	getWSConnections: (env: Env) => DurableObjectNamespace;
}
