import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		baseTypesPath: 'src/__generated__/gen/base-types.ts',
		scalars: {
			DateTime: 'Date',
			UUID: 'src/types/scalars.ts#UUID',
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
