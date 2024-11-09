import type { Server } from 'node:http';
import type { Socket } from 'node:net';
import { useServer } from 'graphql-ws/lib/use/ws';
import type { YogaServerInstance } from 'graphql-yoga';
import { WebSocketServer } from 'ws';

/** 
/* See https://github.com/dotansimha/graphql-yoga/blob/main/examples/graphql-ws/src/app.ts
/* for the original implementation
*/

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useWebSocketServer(server: Server, yoga: YogaServerInstance<any, any>) {
	const wss = new WebSocketServer({
		server,
		path: yoga.graphqlEndpoint,
	});

	const instance = useServer(
		{
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			execute: (args: any) => args.execute(args),
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			subscribe: (args: any) => args.subscribe(args),
			onSubscribe: async (ctx, msg) => {
				const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
					...ctx,
					req: ctx.extra.request,
					socket: ctx.extra.socket,
					params: msg.payload,
				});

				const args = {
					schema,
					operationName: msg.payload.operationName,
					document: parse(msg.payload.query),
					variableValues: msg.payload.variables,
					contextValue: await contextFactory(),
					execute,
					subscribe,
				};

				const errors = validate(args.schema, args.document);
				if (errors.length) {
					return errors;
				}
				return args;
			},
		},
		wss,
	);

	// for termination
	const sockets = new Set<Socket>();

	server.on('connection', (socket) => {
		sockets.add(socket);
		server.once('close', () => sockets.delete(socket));
	});

	return {
		getWss() {
			return wss;
		},
		async dispose() {
			for (const socket of sockets) {
				socket.destroy();
				sockets.delete(socket);
			}

			await instance.dispose();
		},
	};
}
