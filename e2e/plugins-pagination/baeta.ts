import { defineConfig } from '@baeta/cli';
import { paginationPlugin } from '@baeta/plugin-pagination';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [
		paginationPlugin({
			types: {
				Movie: true,
			},
		}),
	],
});
