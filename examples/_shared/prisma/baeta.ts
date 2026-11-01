import { defineConfig } from '@baeta/cli';
import { directivesPlugin } from '@baeta/plugin-directives';
import { prismaPlugin } from '@baeta/plugin-prisma';

export default defineConfig({
	graphql: {
		schemas: ['./modules/**/*.gql'],
		modulesDir: './modules',
	},
	plugins: [
		prismaPlugin({
			prismaSchema: 'schema.prisma',
			generateCommand: 'yarn prisma generate',
			generatedSchemaPath: '__generated__/prisma/schema.prisma',
		}),
		directivesPlugin(),
	],
});
