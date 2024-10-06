import { execute, parse } from 'graphql';
import { MessageType, type NextMessage } from 'graphql-ws';
import type { SubscriptionInfo } from './subscribe.ts';
import type { SubscriptionsOptions } from './subscription.ts';

export interface PublishData {
	message: NextMessage;
	connectionId: string;
}

export async function publish<Env, Context, ContextParams>(
	env: Env,
	executionContext: ExecutionContext,
	options: SubscriptionsOptions<Env, Context, ContextParams>,
	topic: string,
	payload: unknown,
) {
	const db = options.getDatabase(env);
	const subscriptions = await db.getSubscriptions(topic);
	const connectionPoolMap = createConnectionMap(subscriptions);
	const connectionPoolIds = Object.keys(connectionPoolMap);

	const promises = connectionPoolIds.map((poolingId) =>
		publishToConnectionPool(
			env,
			executionContext,
			options,
			poolingId,
			connectionPoolMap[poolingId],
			payload,
		),
	);

	return Promise.all(promises).then(() => {});
}

async function publishToConnectionPool<Env, Context, ContextParams>(
	env: Env,
	executionContext: ExecutionContext,
	options: SubscriptionsOptions<Env, Context, ContextParams>,
	connectionPoolId: string,
	subscriptions: SubscriptionInfo[],
	payload: unknown,
) {
	const promises = subscriptions.map((subInfo) =>
		publishToSubscription(env, executionContext, options, subInfo, payload),
	);

	const messages = await Promise.all(promises);
	const connections = options.getWSConnections(env);
	const stubId = connections.idFromString(connectionPoolId);
	const stub = connections.get(stubId);

	return stub.fetch('https://baeta-ws-connections-durable-object.internal/publish', {
		method: 'POST',
		body: JSON.stringify(messages),
		headers: { 'content-type': 'application/json' },
	});
}

async function publishToSubscription<Env, Context, ContextParams>(
	env: Env,
	executionContext: ExecutionContext,
	options: SubscriptionsOptions<Env, Context, ContextParams>,
	subInfo: SubscriptionInfo,
	payload: unknown,
): Promise<PublishData> {
	const context = options.context?.createContext(
		subInfo.contextParams as ContextParams,
		env,
		executionContext,
	);

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
