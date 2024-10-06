import type { GraphQLSchema } from 'graphql';
import { handleWS } from './handle-ws.ts';
import type { PoolingType } from './pooling-type.ts';
import { publish } from './publish.ts';
import type { DefaultPubSubMap } from './pubsub-map.ts';
import { subscribe } from './subscribe.ts';
import type { SubscriptionDatabase } from './subscription-database.ts';
import { createWsConnectionsClass } from './ws-connections.ts';

export interface SubscriptionsOptions<Env, Context, ContextParams> {
	schema: GraphQLSchema;
	poolingType?: PoolingType;
	context?: ContextLoader<Env, Context, ContextParams>;
	getDatabase: (env: Env) => SubscriptionDatabase;
	getWSConnections: (env: Env) => DurableObjectNamespace;
}

export type Publish<Map extends DefaultPubSubMap> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
	payload: P,
) => Promise<void>;

export type Subscribe<Map extends DefaultPubSubMap> = <C extends keyof Map, P extends Map[C]>(
	topic: C,
) => AsyncIterator<P>;

interface ContextLoader<Env, Context, ContextParams> {
	createContext: (params: ContextParams, env: Env, executionContext: ExecutionContext) => Context;
	getContextParams: (request: Request, env: Env) => ContextParams;
}

export function createCloudflareSubscription<
	Env,
	Context,
	ContextParams,
	PubSubMap extends DefaultPubSubMap = DefaultPubSubMap,
>(options: SubscriptionsOptions<Env, Context, ContextParams>) {
	return {
		handleWS: (request: Request, env: Env, execContext: ExecutionContext) => {
			return handleWS(request, env, execContext, options);
		},
		createSubscriber: (): Subscribe<PubSubMap> => {
			return (topic) => {
				return subscribe(topic.toString());
			};
		},
		createPublisher: (env: Env, execContext: ExecutionContext): Publish<PubSubMap> => {
			return (topic, payload) => {
				const promise = publish(env, execContext, options, topic.toString(), payload);
				execContext.waitUntil(promise);
				return promise;
			};
		},
		createWsConnectionsClass: () => createWsConnectionsClass(options),
	};
}
