import { defineConfig } from '@baeta/cli';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
	},
	compiler: {
		src: 'src/app',
		dist: 'dist',
		bundleDeps: true,
		bundleWorkspaces: true,
		esbuild: {
			format: 'esm',
			target: 'esnext',
			platform: 'browser',
			conditions: ['worker', 'browser'],
			outExtension: { '.js': '.mjs' },
			minify: true,
			treeShaking: true,
			define: {
				IS_CLOUDFLARE_WORKER: 'true',
			},
		},
	},
});
