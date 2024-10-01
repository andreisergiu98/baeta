import { SubscribeMessage, handleProtocols } from 'graphql-ws';
import { PublishData } from './publish';
import { createSubscriptionInfo } from './subscribe';
import { SubscriptionsOptions } from './subscription';
import { useWebsocket } from './use-websocket';

const forgedCtx: ExecutionContext = {
	passThroughOnException() {
		console.error("passThroughOnException is not supported for 'subscribe'");
	},
	waitUntil() {
		console.error("waitUntil is not supported for 'subscribe'");
	},
};

export function createWsConnectionsClass<Env>(options: SubscriptionsOptions<Env>) {
	return class BaetaWsConnections implements DurableObject {
		connections = new Map<string, WebSocket>();

		constructor(
			public state: DurableObjectState,
			public env: Env,
		) {}

		async fetch(request: Request) {
			const pathName = new URL(request.url).pathname.slice(1);

			const path = pathName.split('/');
			const action = path[0];

			if (action === 'connect') {
				return this.connect(request, path);
			}

			if (action === 'close') {
				return this.close(path);
			}

			if (action === 'publish') {
				return this.publish(request);
			}

			throw new Error('bad_request');
		}

		async connect(request: Request, path: string[]) {
			const connectionId = path[1];

			const wsPair = new WebSocketPair();
			const client = wsPair[0];
			const connection = wsPair[1];

			this.connections.set(connectionId, connection);

			const protocolHeader = request.headers.get('Sec-WebSocket-Protocol');
			const protocol = handleProtocols(protocolHeader ?? '');

			const connectionPoolId = this.state.id.toString();

			const handleCreateSubscription = (message: SubscribeMessage) => {
				const contextParams = options.context?.getContextParams(request, this.env);
				const context = options.context?.createContext(contextParams, this.env, forgedCtx);

				const subscriptionInfo = createSubscriptionInfo(
					options.schema,
					message,
					connectionId,
					connectionPoolId,
					context,
					contextParams,
				);

				const db = options.getDatabase(this.env);
				return db.createSubscription(subscriptionInfo);
			};

			const handleDeleteSubscription = (id: string) => {
				const db = options.getDatabase(this.env);
				return db.deleteSubscription(id);
			};

			const handleDeleteSubscriptions = () => {
				const db = options.getDatabase(this.env);
				return db.deleteSubscriptions(connectionId);
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
				const db = options.getDatabase(this.env);
				await db.deleteSubscriptions(connectionId);
				throw new Error('bad_request');
			}

			connection.close(1000, 'closed');
			this.connections.delete(connectionId);

			return new Response('ok');
		}

		async publish(request: Request) {
			const db = options.getDatabase(this.env);
			const messagesAndConnectionIds: PublishData[] = await request.json();

			const deletePromises: Promise<void>[] = [];

			for (const { message, connectionId } of messagesAndConnectionIds) {
				const connection = this.connections.get(connectionId);
				if (!connection || connection.readyState === WebSocket.READY_STATE_CLOSED) {
					deletePromises.push(db.deleteSubscriptions(connectionId));
					continue;
				}
				connection.send(JSON.stringify(message));
			}

			await Promise.all(deletePromises);

			return new Response('ok');
		}
	};
}
