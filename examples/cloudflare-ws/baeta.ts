import { defineConfig } from '@baeta/cli';
import { cloudflarePlugin } from '@baeta/plugin-cloudflare';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [
		cloudflarePlugin({
			ws: {
				databaseId: '7a6f91c0-9455-402f-ab6a-508d140da0e1',
				databaseMigrationsPath: './migrations/subscriptions',
			},
			cache: {
				enable: false,
			},
		}),
	],
});
