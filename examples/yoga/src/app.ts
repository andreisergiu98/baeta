import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { Plugin, createGraphQLError, createSchema, createYoga } from 'graphql-yoga';
import { modules } from './modules/autoload.js';

const baeta = createApplication({
	modules,
});

export const yoga = createYoga({
	schema: baeta.schema,
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});
