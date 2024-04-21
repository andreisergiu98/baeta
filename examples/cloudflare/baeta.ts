import { defineConfig } from '@baeta/cli';
import { cloudflarePlugin } from '@baeta/plugin-cloudflare';

export default defineConfig({
  graphql: {
    schemas: ['src/**/*.gql'],
    modulesDir: 'src/modules',
    baseTypesPath: 'src/__generated__/types.ts',
    contextType: 'src/types/context#Context',
  },
  compiler: {
    src: './src/app',
    dist: './dist',
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
    cloudflarePlugin({
      databaseId: '7a6f91c0-9455-402f-ab6a-508d140da0e1',
      databaseMigrationsPath: './migrations/subscriptions',
    }),
  ],
});
