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
import { userModule } from './modules/user';
import { userPhotosModule } from './modules/user-photos';

const baeta = createApplication({
  modules: [userModule, userPhotosModule],
  pruneSchema: true,
});

const app = express();
const httpServer = createServer(app);

const ws = new WebSocketServer({
  path: '/graphql',
  server: httpServer,
});

const cleanup = useServer({ schema: baeta.schema }, ws);

const apollo = new ApolloServer({
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
  await new Promise<void>((resolve) => httpServer.listen({ port: 5000 }, resolve));
  console.log('🚀 Server ready at http://localhost:5000/graphql');
}

start();
