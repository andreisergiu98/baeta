import { defineConfig } from '@baeta/cli';
import { federationPlugin } from '@baeta/plugin-federation';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [
		federationPlugin({
			version: '2.9',
		}),
	],
});
