import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { modules } from './modules/autoload.ts';

const baeta = createApplication({
	modules,
});

// biome-ignore lint/complexity/noBannedTypes: Empty contexts
export const yoga = createYoga<{}, {}>({
	schema: baeta.schema,
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});
