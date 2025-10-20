import { defineConfig } from '@baeta/cli';
import { directivesPlugin } from '@baeta/plugin-directives';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	plugins: [directivesPlugin()],
});
