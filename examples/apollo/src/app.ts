import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createApplication } from '@baeta/core';
import { userModule } from './modules/user';
import { userPhotosModule } from './modules/user-photos';
import { Context } from './types/context';

const app = createApplication({
  modules: [userModule, userPhotosModule],
  pruneSchema: true,
});

const apollo = new ApolloServer<Context>({
  schema: app.schema,
});

startStandaloneServer(apollo, {
  listen: { port: 5000 },
  context: async ({ req, res }) => {
    return {
      userId: '123',
    };
  },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
