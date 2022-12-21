import { defineConfig } from '@baeta/build-tools/tsup';

export default defineConfig({
  entry: ['index.ts', '!dist'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
});
