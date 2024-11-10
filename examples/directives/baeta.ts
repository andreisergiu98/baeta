import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';
import { directivesPlugin } from '@baeta/plugin-directives';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		contextType: 'src/types/context#Context',
	},
	compiler: {
		src: 'src/app.ts',
		dist: 'dist',
		bundleWorkspaces: true,
		esbuild: {
			format: 'esm',
		},
	},
	plugins: [autoloadPlugin(), directivesPlugin()],
});
