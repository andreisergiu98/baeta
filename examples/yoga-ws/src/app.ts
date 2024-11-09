import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { pubsub } from './lib/pubsub.ts';
import { useWebSocketServer } from './lib/ws.ts';
import { modules } from './modules/autoload.ts';
import type { Context, ServerContext } from './types/context.ts';

const baeta = createApplication({
	modules,
});

const yoga = createYoga<ServerContext, Context>({
	schema: baeta.schema,
	context: {
		appVersion: '1.0.0',
		pubsub,
	},
	graphiql: {
		subscriptionsProtocol: 'WS',
	},
});

const server = createServer(yoga);

const ws = useWebSocketServer(server, yoga);

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});

const stop = async () => {
	await ws.dispose();
	return new Promise<void>((resolve) => server.close(() => resolve()));
};

process.on('SIGINT', async () => {
	await stop();
	process.exit(0);
});
