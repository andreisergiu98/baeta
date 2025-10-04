import { defineConfig } from '@baeta/cli';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	compiler: {
		src: 'src/app',
		dist: 'dist',
		bundleWorkspaces: true,
		esbuild: {
			format: 'esm',
		},
	},
});
