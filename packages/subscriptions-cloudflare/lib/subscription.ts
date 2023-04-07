import { GraphQLSchema } from 'graphql';
import { handleWS } from './handle-ws';
import { PoolingType } from './pooling-type';
import { publish } from './publish';
import { DefaultPubSubMap } from './pubsub-map';
import { subscribe } from './subscribe';
import { SubscriptionDatabase } from './subscription-database';
import { createWsConnectionsClass } from './ws-connections';

interface ContextLoader<Env, Context, ContextParams> {
  createContext: (params: ContextParams, env: Env, executionContext: ExecutionContext) => Context;
  getContextParams: (request: Request, env: Env) => ContextParams;
}

export interface SubscriptionsOptions<Env, Context = any, ContextParams = any> {
  schema: GraphQLSchema;
  poolingType?: PoolingType;
  context?: ContextLoader<Env, Context, ContextParams>;
  getDatabase: (env: Env) => SubscriptionDatabase;
  getWSConnections: (env: Env) => DurableObjectNamespace;
}

export function createCloudflareSubscription<
  Env,
  Context = any,
  ContextParams = any,
  PubSubMap extends DefaultPubSubMap = DefaultPubSubMap
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

export type Publish<Map extends DefaultPubSubMap> = <C extends keyof Map, P extends Map[C]>(
  topic: C,
  payload: P
) => Promise<void>;

export type Subscribe<Map extends DefaultPubSubMap> = <C extends keyof Map, P extends Map[C]>(
  topic: C
) => AsyncIterator<P>;
