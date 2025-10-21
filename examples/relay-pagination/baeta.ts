import { defineConfig } from '@baeta/cli';
import { directivesPlugin } from '@baeta/plugin-directives';
import { paginationPlugin } from '@baeta/plugin-pagination';
import { prismaPlugin } from '@baeta/plugin-prisma';
// This step is optional, but it can be used to improve type safety
import type { BaseObjectTypes } from './src/__generated__/utility.ts';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [
		prismaPlugin({
			prismaSchema: 'schema.prisma',
			generateCommand: 'yarn prisma generate',
			generatedSchemaPath: 'src/__generated__/prisma/schema.prisma',
		}),
		paginationPlugin<BaseObjectTypes>({
			types: {
				User: true,
				UserPhoto: true,
			},
		}),
		directivesPlugin(),
	],
});
