import { handleProtocols, SubscribeMessage } from 'graphql-ws';
import { SubscriptionsOptions } from './cloudflare-subscription';
import { createSubscriptionInfo } from './graphql';
import { useWebsocket } from './use-websocket';

export function createWsConnectionsClass<Env>(options: SubscriptionsOptions<Env>) {
  return class WsConnections implements DurableObject {
    private connections = new Map<string, WebSocket>();

    constructor(private state: DurableObjectState, private env: Env) {}

    async fetch(request: Request) {
      const pathName = new URL(request.url).pathname.slice(1);
      const path = pathName.split('/');
      const action = path[0];

      if (action === 'connect') {
        return this.connect(request, path);
      }

      if (action === 'close') {
        return this.close(request, path);
      }

      if (action === 'publish') {
        return this.publish(request, path);
      }

      throw new Error('bad_request');
    }

    private async connect(request: Request, path: string[]) {
      const connectionId = path[1];

      const wsPair = new WebSocketPair();
      const client = wsPair[0];
      const connection = wsPair[1];

      this.connections.set(connectionId, connection);

      const protocolHeader = request.headers.get('Sec-WebSocket-Protocol');
      const protocol = handleProtocols(protocolHeader || '');

      const connectionPoolId = this.state.id.toString();

      const handleCreateSubscription = (message: SubscribeMessage) => {
        const subscriptionInfo = createSubscriptionInfo(
          options.schema,
          message,
          connectionId,
          connectionPoolId
        );

        const db = options.getDatabase(this.env);
        return db.createSubscription(subscriptionInfo);
      };

      const handleDeleteSubscriptions = () => {
        const db = options.getDatabase(this.env);
        return db.deleteSubscriptions(connectionId);
      };

      await useWebsocket(
        request,
        connection,
        options.schema,
        protocol,
        handleCreateSubscription,
        handleDeleteSubscriptions
      );

      return new Response(null, {
        status: 101,
        webSocket: client,
        headers: protocol ? { 'Sec-WebSocket-Protocol': protocol } : {},
      });
    }

    private async close(request: Request, path: string[]) {
      const connectionId = path[1];

      const connection = this.connections.get(connectionId);

      if (!connection) {
        throw new Error('bad_request');
      }

      // TODO: delete from d1

      connection.close(1000, 'closed');
      this.connections.delete(connectionId);

      return new Response('ok');
    }

    private async publish(request: Request, path: string[]) {
      return new Response('ok');
    }
  };
}
