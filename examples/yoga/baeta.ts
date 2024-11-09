import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	compiler: {
		src: './src/app',
		dist: 'dist',
		bundleWorkspaces: true,
		esbuild: {
			format: 'esm',
		},
	},
	plugins: [autoloadPlugin()],
});
