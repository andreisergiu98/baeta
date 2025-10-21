import { defineConfig } from '@baeta/cli';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
});
