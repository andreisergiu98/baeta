import { defineConfig } from '@baeta/cli';
import { directivesPlugin } from '@baeta/plugin-directives';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	compiler: {
		src: 'src/app.ts',
		dist: 'dist',
		bundleWorkspaces: true,
		esbuild: {
			format: 'esm',
		},
	},
	plugins: [directivesPlugin()],
});
