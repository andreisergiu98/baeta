import { execute, parse } from 'graphql';
import { MessageType, NextMessage } from 'graphql-ws';
import { SubscriptionInfo } from './subscribe';
import { SubscriptionsOptions } from './subscription';

export interface PublishData {
  message: NextMessage;
  connectionId: string;
}

export async function publish<Env>(
  env: Env,
  executionContext: ExecutionContext,
  options: SubscriptionsOptions<Env>,
  topic: string,
  payload: any
) {
  const db = options.getDatabase(env);
  const subscriptions = await db.getSubscriptions(topic);
  const connectionPoolMap = createConnectionMap(subscriptions);

  const promises = Object.keys(connectionPoolMap).map((poolingId) =>
    publishToConnectionPool(
      env,
      executionContext,
      options,
      poolingId,
      connectionPoolMap[poolingId],
      payload
    )
  );

  return Promise.all(promises).then(() => {});
}

async function publishToConnectionPool<Env>(
  env: Env,
  executionContext: ExecutionContext,
  options: SubscriptionsOptions<Env>,
  connectionPoolId: string,
  subscriptions: SubscriptionInfo[],
  payload: any
) {
  const promises = subscriptions.map((subInfo) =>
    publishToSubscription(env, executionContext, options, subInfo, payload)
  );

  const messages = await Promise.all(promises);

  const wsConnections = options.getWSConnections(env);
  const stubId = wsConnections.idFromString(connectionPoolId);
  const stub = wsConnections.get(stubId);

  return stub.fetch('https://ws-connections-durable-object.internal/publish', {
    method: 'POST',
    body: JSON.stringify(messages),
    headers: { 'content-type': 'application/json' },
  });
}

async function publishToSubscription<Env>(
  env: Env,
  executionContext: ExecutionContext,
  options: SubscriptionsOptions<Env>,
  subInfo: SubscriptionInfo,
  payload: any
): Promise<PublishData> {
  const context = options.context?.createContext(subInfo.contextParams, env, executionContext);

  const result = await execute({
    schema: options.schema,
    document: parse(subInfo.subscription.query),
    rootValue: payload,
    contextValue: context,
    variableValues: subInfo.subscription.variables,
    operationName: subInfo.subscription.operationName,
  });

  const message: NextMessage = {
    id: subInfo.id,
    type: MessageType.Next,
    payload: result,
  };

  return {
    message,
    connectionId: subInfo.connectionId,
  };
}

function createConnectionMap(subscriptions: SubscriptionInfo[]) {
  const connectionPoolMap: Record<string, SubscriptionInfo[]> = {};

  for (const subscription of subscriptions) {
    const connectionPoolId = subscription.connectionPoolId;
    if (!connectionPoolMap[connectionPoolId]) {
      connectionPoolMap[connectionPoolId] = [];
    }
    connectionPoolMap[connectionPoolId].push(subscription);
  }

  return connectionPoolMap;
}
