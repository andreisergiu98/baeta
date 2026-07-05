import type { AddSubscriptionParams, SubscriptionState } from '@baeta/subscriptions-stateless';
import type { ExecutionResult } from 'graphql';
import {
	type ErrorMessage,
	handleProtocols,
	MessageType,
	type SubscribeMessage,
	stringifyMessage,
} from 'graphql-ws';
import type { SubscriptionsOptions } from './subscription-options.ts';
import type { PublishData } from './transport.ts';
import { useWebsocket } from './use-websocket.ts';

export interface SubscriptionLifecycle<ContextParams> {
	addSubscription: (
		params: AddSubscriptionParams<ContextParams>,
	) => Promise<{ ok: true; value: SubscriptionState } | { ok: false; value: ExecutionResult }>;
	removeSubscription: (subscriptionId: string) => Promise<void>;
	removeConnection: (connectionId: string) => Promise<void>;
}

export function createWsConnectionsClass<Context, ContextParams>(
	options: SubscriptionsOptions<Context, ContextParams>,
	lifecycle: SubscriptionLifecycle<ContextParams>,
): new (state: DurableObjectState, env: unknown) => DurableObject {
	return class BaetaWsConnections implements DurableObject {
		connections = new Map<string, WebSocket>();

		async fetch(request: Request) {
			const pathName = new URL(request.url).pathname.slice(1);

			const path = pathName.split('/');
			const action = path[0];

			if (action === 'connect') {
				return await this.createConnection(request, path);
			}

			if (action === 'close') {
				return await this.close(path);
			}

			if (action === 'publish') {
				return await this.publish(request);
			}

			throw new Error('bad_request');
		}

		async createConnection(request: Request, path: string[]) {
			const connectionId = path[1];

			const wsPair = new WebSocketPair();
			const client = wsPair[0];
			const connection = wsPair[1];

			this.connections.set(connectionId, connection);

			const protocolHeader = request.headers.get('Sec-WebSocket-Protocol');
			const protocol = handleProtocols(protocolHeader ?? '');

			const handleCreateSubscription = async (message: SubscribeMessage) => {
				const contextParams = await options.context?.getContextParams(request);

				const result = await lifecycle.addSubscription({
					id: message.id,
					connectionId,
					request: {
						query: message.payload.query,
						variables: message.payload.variables,
						operationName: message.payload.operationName,
					},
					contextParams: contextParams as ContextParams,
				});

				if (!result.ok) {
					const errorMessage: ErrorMessage = {
						id: message.id,
						type: MessageType.Error,
						payload: (result.value.errors ?? []).map((error) => error.toJSON()),
					};
					connection.send(stringifyMessage(errorMessage));
				}
			};

			const handleDeleteSubscription = (id: string) => {
				return lifecycle.removeSubscription(id);
			};

			const handleDeleteSubscriptions = () => {
				return lifecycle.removeConnection(connectionId);
			};

			useWebsocket(
				connection,
				protocol,
				handleCreateSubscription,
				handleDeleteSubscription,
				handleDeleteSubscriptions,
			);

			return new Response(null, {
				status: 101,
				webSocket: client,
				headers: protocol ? { 'Sec-WebSocket-Protocol': protocol } : {},
			});
		}

		async close(path: string[]) {
			const connectionId = path[1];

			const connection = this.connections.get(connectionId);

			if (!connection || connection.readyState === WebSocket.READY_STATE_CLOSED) {
				await lifecycle.removeConnection(connectionId);
				throw new Error('bad_request');
			}

			connection.close(1000, 'closed');
			this.connections.delete(connectionId);

			return new Response('ok');
		}

		async publish(request: Request) {
			const messagesAndConnectionIds: PublishData[] = await request.json();

			const deletePromises: Promise<void>[] = [];

			for (const { message, connectionId } of messagesAndConnectionIds) {
				const connection = this.connections.get(connectionId);
				if (!connection || connection.readyState === WebSocket.READY_STATE_CLOSED) {
					deletePromises.push(lifecycle.removeConnection(connectionId));
					continue;
				}
				connection.send(JSON.stringify(message));
			}

			await Promise.all(deletePromises);

			return new Response('ok');
		}
	};
}
