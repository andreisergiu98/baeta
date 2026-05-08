import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import modules from './modules/index.ts';

const baeta = createApplication({
	modules,
});

export const yoga = createYoga<{}, {}>({
	schema: baeta.schema,
});

const server = createServer((req, res) => {
	void yoga(req, res);
});

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});
