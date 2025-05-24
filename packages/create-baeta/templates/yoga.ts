import type { JavaScriptRuntime } from '../lib/constants.ts';
import type { TemplateFile } from '../lib/template-file.ts';
import yogaPackageJson from '../meta/yoga/package.json';
import { makeSharedTemplate } from './shared.ts';

export async function makeYogaTemplate(
	appName: string,
	runtime: JavaScriptRuntime,
): Promise<TemplateFile[]> {
	return [
		...makeSharedTemplate(appName, runtime, yogaPackageJson),
		...makeRuntimeFiles(runtime),
		{
			relativePath: './src/types/context.ts',
			content: `export type Context = {
	appVersion: string;
};

// biome-ignore lint/complexity/noBannedTypes: Empty context
export type ServerContext = {};
`,
		},
	];
}

function makeRuntimeFiles(runtime: JavaScriptRuntime): TemplateFile[] {
	switch (runtime) {
		case 'bun':
			return makeBunFiles();
		case 'deno':
			return makeDenoFiles();
		case 'node':
			return makeNodeFiles();
		default:
			return [] satisfies never[];
	}
}

function makeBunFiles(): TemplateFile[] {
	return [
		{
			relativePath: './src/app.ts',
			content: `import { createApplication } from '@baeta/core';
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

Bun.serve({
	fetch: yoga.fetch,
	port: 4000,
});

console.log(\`🚀 Server ready at http://localhost:4000\${yoga.graphqlEndpoint}\`);
`,
		},
	];
}

function makeDenoFiles(): TemplateFile[] {
	return [
		{
			relativePath: './src/app.ts',
			content: `import { createApplication } from '@baeta/core';
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
			console.log(\`🚀 Server ready at http://localhost:4000\${yoga.graphqlEndpoint}\`);
		},
	},
	yoga.fetch,
);
`,
		},
	];
}

function makeNodeFiles(): TemplateFile[] {
	return [
		{
			relativePath: './src/app.ts',
			content: `import { createServer } from 'node:http';
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

const server = createServer(yoga);

server.listen(4000, () => {
	console.log(\`🚀 Server ready at http://localhost:4000\${yoga.graphqlEndpoint}\`);
});
`,
		},
	];
}
