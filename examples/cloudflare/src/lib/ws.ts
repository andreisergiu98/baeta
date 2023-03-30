import { GraphQLSchema } from 'graphql';
import { handleProtocols, makeServer, MessageType, stringifyMessage } from 'graphql-ws';
import { Context as HonoContext } from 'hono';
import { Context as AppContext } from '../types/context';
import { createPubSubWrapper } from './pubsub';

export function createWebsocketPair() {
  const pair = new WebSocketPair();
  return [pair[0], pair[1]] as const;
}

type MessageCallback = (data: string) => Promise<void>;

export function useWebsocket(
  schema: GraphQLSchema,
  socket: WebSocket,
  ctx: HonoContext,
  protocol: string
) {
  const request = ctx.req.raw;

  const server = makeServer({
    schema,
    context: (): AppContext => {
      return {
        executionCtx: ctx.executionCtx,
        pubsub: createPubSubWrapper(ctx.executionCtx),
      };
    },
  });

  socket.accept();

  const pingMessage = stringifyMessage({ type: MessageType.Ping });

  const pinger = setInterval(() => ping(), 12000);
  let pongTimeout: number | null = null;

  const handlePongTimeout = () => {
    clearInterval(pinger);
    close();
  };

  const ping = () => {
    if (socket.readyState !== WebSocket.READY_STATE_OPEN) {
      return;
    }

    socket.send(pingMessage);
    pongTimeout = setTimeout(handlePongTimeout, 6000);
  };

  const send = (data: string) => {
    socket.send(data);
  };

  const close = (code?: number, reason?: string) => {
    socket.close(code, reason);
  };

  const onPong = () => {
    clearTimeout(pongTimeout);
  };

  const handleEvent = (event: MessageEvent, callback: MessageCallback) => {
    callback(event.data.toString()).catch((err) => {
      close(1011, 'Internal error');
    });
  };

  const onMessage = (callback: MessageCallback) => {
    socket.addEventListener('message', (ev) => handleEvent(ev, callback));
  };

  const onClose = (e: CloseEvent) => {
    clearTimeout(pongTimeout);
    clearInterval(pinger);
    closed(e.code || 1000, e.reason || 'Normal Closure');
  };

  const closed = server.opened(
    {
      protocol,
      send,
      close,
      onPong,
      onMessage,
    },
    { socket, request }
  );

  socket.addEventListener('close', onClose);
}

export function createGraphqlWSHandler(schema: GraphQLSchema) {
  return (ctx: HonoContext) => {
    const [client, server] = createWebsocketPair();

    const protoHeader = 'Sec-WebSocket-Protocol';
    const protoHeaderValue = ctx.req.headers.get(protoHeader) || '';
    const protocol = handleProtocols(protoHeaderValue) || '';

    useWebsocket(schema, server, ctx, protocol);

    const headers: HeadersInit = {};

    // As per the WS spec, if the server does not accept any subprotocol - it should omit this header.
    // Beware that doing so will have Chrome abruptly close the WebSocket connection with a 1006 code.
    if (protocol) {
      headers[protoHeader] = protocol;
    }

    return new Response(null, {
      status: 101,
      headers,
      webSocket: client,
    });
  };
}

type FetchHandler = (ctx: HonoContext) => Response | Promise<Response>;

export function splitWS(handleWs: FetchHandler, handleGraphql: FetchHandler) {
  return (ctx: HonoContext) => {
    const upgradeHeader = ctx.req.headers.get('upgrade');

    if (upgradeHeader === 'websocket') {
      return handleWs(ctx);
    }

    return handleGraphql(ctx);
  };
}
