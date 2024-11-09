import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { modules } from './modules/autoload.ts';
import type { ServerContext, UserContext } from './types/context.ts';

const baeta = createApplication({
	modules,
});

export const yoga = createYoga<ServerContext, UserContext>({
	schema: baeta.schema,
	context: {
		appVersion: '1.0.0',
	},
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});
