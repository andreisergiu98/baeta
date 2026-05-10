import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { complexityAppPlugin } from './lib/complexity.ts';
import modules from './modules/index.ts';
import type { Context, ServerContext } from './types/context.ts';

const baeta = createApplication({
	modules,
	plugins: [complexityAppPlugin],
});

export const yoga = createYoga<ServerContext, Context>({
	schema: baeta.schema,
	context: {
		appVersion: '1.0.0',
	},
});

const server = createServer((req, res) => {
	void yoga(req, res);
});

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});
