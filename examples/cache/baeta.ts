import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';
import { directivesPlugin } from '@baeta/plugin-directives';
import { prismaPlugin } from '@baeta/plugin-prisma';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		contextType: 'src/types/context#Context',
		extensions: 'src/extensions/index.ts',
		scalars: {
			DateTime: 'Date',
		},
	},
	compiler: {
		src: 'src/app',
		dist: 'dist',
		bundleWorkspaces: true,
		cjsGlobals: true, // Required for Prisma to work with ESM
		esbuild: {
			format: 'esm',
		},
	},
	plugins: [
		autoloadPlugin(),
		prismaPlugin({
			prismaSchema: 'schema.prisma',
			generateCommand: 'yarn prisma generate',
			generatedSchemaPath: 'src/__generated__/prisma/schema.prisma',
		}),
		directivesPlugin(),
	],
});
