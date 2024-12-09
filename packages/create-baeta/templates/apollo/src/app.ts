import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createApplication } from '@baeta/core';
import { modules } from './modules/autoload.ts';
import type { Context } from './types/context.ts';

const baeta = createApplication({
	modules,
});

const server = new ApolloServer<Context>({
	schema: baeta.schema,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
