import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		scalars: {
			DateTime: 'Date',
		},
	},
	compiler: {
		src: 'src/app.ts',
		dist: 'dist',
		bundleWorkspaces: true,
		esbuild: {
			format: 'esm',
		},
	},
	plugins: [autoloadPlugin()],
});
