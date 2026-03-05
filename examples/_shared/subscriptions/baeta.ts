import { defineConfig } from '@baeta/cli';

export default defineConfig({
	graphql: {
		schemas: ['./modules/**/*.gql'],
		modulesDir: './modules',
	},
});
