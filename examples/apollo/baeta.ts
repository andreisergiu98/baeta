import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';
import { directivesPlugin } from '@baeta/plugin-directives';
import { paginationPlugin } from '@baeta/plugin-pagination';
import { prismaPlugin } from '@baeta/plugin-prisma';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		modulesDir: 'src/modules',
		baseTypesPath: 'src/__generated__/types.ts',
		contextType: 'src/types/context#Context',
		scalars: {
			DateTime: 'Date',
		},
		extensions: 'src/extensions/index.ts',
	},
	compiler: {
		src: './src/app',
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
		paginationPlugin({
			types: {
				User: true,
				UserPhoto: true,
			},
		}),
		directivesPlugin(),
	],
});
