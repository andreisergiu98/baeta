import { defineConfig } from '@baeta/cli';
import { directivesPlugin } from '@baeta/plugin-directives';
import { paginationPlugin } from '@baeta/plugin-pagination';
import { prismaPlugin } from '@baeta/plugin-prisma';

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
		paginationPlugin({
			types: {
				User: true,
				UserPhoto: true,
			},
		}),
		directivesPlugin(),
	],
});
