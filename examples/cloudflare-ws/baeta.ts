import { defineConfig } from '@baeta/cli';
import { autoloadPlugin } from '@baeta/plugin-autoload';
import { cloudflarePlugin } from '@baeta/plugin-cloudflare';

export default defineConfig({
	graphql: {
		schemas: ['src/**/*.gql'],
		contextType: 'src/types/context#Context',
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
	plugins: [
		autoloadPlugin(),
		cloudflarePlugin({
			ws: {
				databaseId: '7a6f91c0-9455-402f-ab6a-508d140da0e1',
				databaseMigrationsPath: './migrations/subscriptions',
			},
			cache: {
				enable: false,
			},
		}),
	],
});
