import type { JavaScriptRuntime } from '../lib/constants.ts';
import type { TemplateFile } from '../lib/template-file.ts';
import apolloPackageJson from '../meta/apollo/package.json';
import { makeSharedTemplate } from './shared.ts';

export async function makeApolloTemplate(
	appName: string,
	runtime: JavaScriptRuntime,
): Promise<TemplateFile[]> {
	return [
		...makeSharedTemplate(appName, runtime, apolloPackageJson),
		{
			relativePath: './src/types/context.ts',
			content: `export type Context = {
	userId?: string;
};
`,
		},
		{
			relativePath: './src/app.ts',
			content: `import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { createApplication } from '@baeta/core';
import { modules } from './modules/autoload.ts';
import type { Context } from './types/context.ts';

const baeta = createApplication({
	modules,
});

const server = new ApolloServer<Context>({
	schema: baeta.schema,
});

const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(\`🚀  Server ready at: \${url}\`);
`,
		},
	];
}
