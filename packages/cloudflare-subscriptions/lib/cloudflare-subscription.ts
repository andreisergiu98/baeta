import { GraphQLSchema } from 'graphql';
import { v4 as uuid } from 'uuid';
import { getPoolingId, PoolingType } from './pooling-type';
import { SubscriptionDatabase } from './subscription-database';
import { createWsConnectionsClass } from './ws-connections';

export interface SubscriptionsOptions<Env, Context = any> {
  schema: GraphQLSchema;
  poolingType?: PoolingType;
  createContext: (request: Request, env: Env, execContext: ExecutionContext) => Context;
  getDatabase: (env: Env) => SubscriptionDatabase;
  getWSConnections: (env: Env) => DurableObjectNamespace;
}

export function createCloudflareSubscription<Env, Context>(options: SubscriptionsOptions<Env>) {
  return {
    handleWS: (request: Request, env: Env, execContext: ExecutionContext) => {
      return handleWS(request, env, execContext, options);
    },
    handlePublish: (fetchEvent: FetchEvent) => handlePublish(fetchEvent, options),
    publish: () => publish(options),
    subscribe: (topic: string) => subscribe(topic, options),
    createWsConnectionsClass: () => createWsConnectionsClass(options),
  };
}

function handleWS<Env>(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
  options: SubscriptionsOptions<Env>
) {
  const upgradeHeader = request.headers.get('upgrade');

  if (upgradeHeader !== 'websocket') {
    throw new Error('request is not a websocket request');
  }

  const poolingId = getPoolingId(request, options.poolingType ?? 'global');
  const connectionPool = options.getWSConnections(env);
  const stubId = connectionPool.idFromName(poolingId);
  const stub = connectionPool.get(stubId);

  const connectionId = uuid();

  return stub.fetch(
    `https://ws-connection-durable-object.internal/connect/${connectionId}`,
    request
  );
}

function handlePublish<Env>(fetchEvent: FetchEvent, options: SubscriptionsOptions<Env>) {}

function publish<Env>(options: SubscriptionsOptions<Env>) {
  //
}

function subscribe<Env>(topic: string, options: SubscriptionsOptions<Env>) {
  return { topic };
}
