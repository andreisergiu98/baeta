import { defineConfig } from '@baeta/cli';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

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
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
      define: {
        IS_CLOUDFLARE_WORKER: 'true',
      },
    },
  },
});
