import { defineConfig } from '@baeta/build-tools/tsup';

export default defineConfig({
  entry: ['./bin/cli.ts', './index.ts'],
  format: ['esm', 'cjs'],
  clean: true,
  bundle: true,
  external: [],
  noExternal: ['@baeta/config', '@baeta/generator', "@baeta/plugin-graphql", "@baeta/plugin"],
});
