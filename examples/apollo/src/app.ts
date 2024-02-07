import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createApplication } from '@baeta/core';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { modules } from './modules/autoload';
import { Context } from './types/context';

const baeta = createApplication({
  modules,
  pruneSchema: true,
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

async function start() {
  await apollo.start();

  app.use('/graphql', cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(apollo));

  await new Promise<void>((resolve) => httpServer.listen({ port: 5001 }, resolve));

  console.log('🚀 Server ready at http://localhost:5001/graphql');
}

start();
