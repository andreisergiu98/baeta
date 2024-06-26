import { defineConfig } from '@baeta/builder/tsup';

export default defineConfig({
  entry: ['index.ts', 'sdk/index.ts', '!dist'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
});
