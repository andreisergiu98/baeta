import type {
	SubscriptionBatchMessage,
	SubscriptionTransport,
} from '@baeta/subscriptions-stateless';
import { MessageType, type NextMessage } from 'graphql-ws';
import { getConnectionPoolId } from './connection-id.ts';
import type { SubscriptionsOptions } from './subscription-options.ts';

export interface PublishData {
	message: NextMessage;
	connectionId: string;
}

export function createWsTransport<Context, ContextParams>(
	options: SubscriptionsOptions<Context, ContextParams>,
): SubscriptionTransport {
	const sendBatch = async (messages: SubscriptionBatchMessage[]) => {
		if (messages.length === 0) {
			return;
		}

		const pools = new Map<string, PublishData[]>();
		for (const message of messages) {
			for (const destination of message.destinations) {
				const poolId = getConnectionPoolId(destination.connectionId);
				const data: PublishData = {
					connectionId: destination.connectionId,
					message: {
						id: destination.subscriptionId,
						type: MessageType.Next,
						payload: message.result,
					},
				};
				const pool = pools.get(poolId);
				if (pool) {
					pool.push(data);
				} else {
					pools.set(poolId, [data]);
				}
			}
		}

		const connections = options.getWSConnections();
		const promises = Array.from(pools, ([poolId, data]) => {
			const stub = connections.get(connections.idFromString(poolId));
			return stub.fetch('https://baeta-ws-connections-durable-object.internal/publish', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: { 'content-type': 'application/json' },
			});
		});

		await Promise.all(promises);
	};

	return {
		sendBatch,
	};
}
