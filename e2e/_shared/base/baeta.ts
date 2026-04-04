import { defineConfig } from '@baeta/cli';

export default defineConfig({
	graphql: {
		schemas: ['./**/*.gql'],
		typesDir: './__generated__',
		modulesDir: './modules',
	},
});
