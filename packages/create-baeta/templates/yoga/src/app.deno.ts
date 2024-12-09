import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { modules } from './modules/autoload.ts';
import type { Context, ServerContext } from './types/context.ts';

const baeta = createApplication({
	modules,
});

export const yoga = createYoga<ServerContext, Context>({
	schema: baeta.schema,
	context: {
		appVersion: '1.0.0',
	},
});

Deno.serve(
	{
		port: 4000,
		onListen() {
			console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
		},
	},
	yoga.fetch,
);
