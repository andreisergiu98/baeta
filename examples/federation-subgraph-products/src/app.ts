import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createApplication } from '@baeta/core';
import sources from './modules/index.ts';
import type { Context } from './types/context.ts';

const baeta = createApplication({
	sources,
});

const server = new ApolloServer<Context>({
	schema: baeta.schema,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4002 },
	context: async () => ({ appVersion: '1.0.0' }),
});

console.log(`🚀  Server ready at: ${url}`);
