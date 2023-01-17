import { defineConfig } from '@baeta/cli';

export default defineConfig({
  graphql: {
    schemas: ['./src/**/*.gql'],
    modulesDir: './src/modules',
    baseTypesPath: './src/__generated__/types.ts',
    contextType: '../types/context#Context',
  },
  compiler: {
    src: './src/app',
    dist: './dist',
    bundleWorkspaces: true,
    esbuild: {},
  },
});
