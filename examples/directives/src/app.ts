import { createServer } from 'node:http';
import { createApplication } from '@baeta/core';
import { inputValidationAppPlugin } from '@baeta/directives';
import { createYoga } from 'graphql-yoga';
import { upperDirective } from './modules/custom-native-directive/upper-directive.ts';
import sources from './modules/index.ts';
import type { Context, ServerContext } from './types/context.ts';

const baeta = createApplication({
	sources,
	plugins: [inputValidationAppPlugin],
});

export const yoga = createYoga<ServerContext, Context>({
	schema: upperDirective(baeta.schema),
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
