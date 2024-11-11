import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { createYoga } from 'graphql-yoga';
import { modules } from './modules/autoload.ts';
import { loadOptionalUser, loadUser, setOptionalUserLoader, setUserLoader } from './store.ts';
import type { Context, ServerContext } from './types/context.ts';

const baeta = createApplication({
	modules,
});

export const yoga = createYoga<ServerContext, Context>({
	schema: baeta.schema,
	context: () => {
		const ctx: Context = {
			userId: '1', // Comment this line to 'logout' the user
		};

		setOptionalUserLoader(ctx, () => loadOptionalUser(ctx));
		setUserLoader(ctx, () => loadUser(ctx));

		return ctx;
	},
});

const server = createServer(yoga);

server.listen(4000, () => {
	console.log(`🚀 Server ready at http://localhost:4000${yoga.graphqlEndpoint}`);
});
