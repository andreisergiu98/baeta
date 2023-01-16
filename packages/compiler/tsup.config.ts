import { defineConfig } from '@baeta/build-tools/tsup';

export default defineConfig({
  entry: ['index.ts', 'esbuild.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
});
