import { GraphQLSchema } from 'graphql';
import { makeServer, MessageType, stringifyMessage, SubscribeMessage } from 'graphql-ws';

type MessageCallback = (data: string) => Promise<void>;

export function useWebsocket(
  request: Request,
  socket: WebSocket,
  schema: GraphQLSchema,
  protocol: string | false,
  createSubscription: (message: SubscribeMessage) => Promise<void>,
  deleteSubscriptions: () => Promise<void>
) {
  if (!protocol) {
    throw new Error('invalid_ws_protocol');
  }

  const server = makeServer({
    schema,
  });

  socket.accept();

  const pingMessage = stringifyMessage({ type: MessageType.Ping });

  const pinger = setInterval(() => ping(), 12000);
  let pongTimeout: number | null = null;

  const handlePongTimeout = () => {
    clearInterval(pinger);
    socket.close();
  };

  const ping = () => {
    if (socket.readyState !== WebSocket.READY_STATE_OPEN) {
      return;
    }

    socket.send(pingMessage);
    pongTimeout = setTimeout(handlePongTimeout, 6000);
  };

  const onPong = () => {
    clearTimeout(pongTimeout);
  };

  const handleEvent = async (event: MessageEvent, callback: MessageCallback) => {
    try {
      const dataStr = event.data.toString();
      const data = JSON.parse(dataStr);

      if (data.type === MessageType.Subscribe) {
        await createSubscription(data);
      } else {
        await callback(dataStr);
      }
    } catch (e) {
      socket.close(1011, 'Internal error');
    }
  };

  const onMessage = (callback: MessageCallback) => {
    socket.addEventListener('message', (ev) => {
      handleEvent(ev, callback);
    });
  };

  const onClose = (e: CloseEvent) => {
    clearTimeout(pongTimeout);
    clearInterval(pinger);
    closed(e.code || 1000, e.reason || 'Normal Closure');
    deleteSubscriptions();
  };

  const closed = server.opened(
    {
      protocol,
      send: socket.send,
      close: socket.close,
      onPong,
      onMessage,
    },
    { socket, request }
  );

  socket.addEventListener('close', onClose);
}
