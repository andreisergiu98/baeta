import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		contextType: 'src/types/context#Context',
		extensions: 'src/extensions.ts',
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
