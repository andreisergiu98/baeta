import { createServer } from 'node:http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createApplication } from '@baeta/core';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/use/ws';
import { WebSocketServer } from 'ws';
import { pubsub } from './lib/pubsub.ts';
import { modules } from './modules/autoload.ts';
import type { Context } from './types/context.ts';

const baeta = createApplication({
	modules,
});

const app = express();
const httpServer = createServer(app);

const ws = new WebSocketServer({
	path: '/graphql',
	server: httpServer,
});

const cleanup = useServer({ schema: baeta.schema }, ws);

const apollo = new ApolloServer<Context>({
	schema: baeta.schema,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		{
			async serverWillStart() {
				return {
					async drainServer() {
						await cleanup.dispose();
					},
				};
			},
		},
	],
});

await apollo.start();

const apolloMiddleware = expressMiddleware<Context>(apollo, {
	context: async () => {
		return {
			pubsub,
		};
	},
});

app.use('/graphql', cors(), bodyParser.json(), apolloMiddleware);

httpServer.listen({ port: 4000 }, () => {
	console.log('🚀 Server ready at http://localhost:4000/graphql');
});
