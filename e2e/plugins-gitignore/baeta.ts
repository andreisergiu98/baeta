import { defineConfig } from '@baeta/cli';
import { gitignorePlugin } from '@baeta/plugin-gitignore';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [gitignorePlugin()],
});
