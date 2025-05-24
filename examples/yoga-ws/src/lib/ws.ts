import type { Server } from 'node:http';
import type { Socket } from 'node:net';
import { useServer } from 'graphql-ws/use/ws';
import type { YogaServerInstance } from 'graphql-yoga';
import { WebSocketServer } from 'ws';

/** 
/* See https://github.com/dotansimha/graphql-yoga/blob/main/examples/graphql-ws/src/app.ts
/* for the original implementation
*/

// biome-ignore lint/suspicious/noExplicitAny: allow all
export function useWebSocketServer(server: Server, yoga: YogaServerInstance<any, any>) {
	const wss = new WebSocketServer({
		server,
		path: yoga.graphqlEndpoint,
	});

	const instance = useServer(
		{
			// biome-ignore lint/suspicious/noExplicitAny: allow all
			execute: (args: any) => args.execute(args),
			// biome-ignore lint/suspicious/noExplicitAny: allow all
			subscribe: (args: any) => args.subscribe(args),
			onSubscribe: async (ctx, _id, params) => {
				const { schema, execute, subscribe, contextFactory, parse, validate } = yoga.getEnveloped({
					...ctx,
					req: ctx.extra.request,
					socket: ctx.extra.socket,
					params: params,
				});

				const args = {
					schema,
					operationName: params.operationName,
					document: parse(params.query),
					variableValues: params.variables,
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
