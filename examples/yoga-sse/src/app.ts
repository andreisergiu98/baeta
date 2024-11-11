import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { pubsub } from './lib/pubsub.ts';
import { modules } from './modules/autoload.ts';
import type { Context, ServerContext } from './types/context.ts';

const baeta = createApplication({
	modules,
});

export const yoga = createYoga<ServerContext, Context>({
	schema: baeta.schema,
	context: {
		pubsub,
	},
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});
