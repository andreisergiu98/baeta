import { defineConfig } from '@baeta/prep/tsup';

export default defineConfig({
  entry: ['./index.ts', './sdk/index.ts', '!dist'],
  format: ['esm', 'cjs'],
  external: ['@baeta/compiler'],
  clean: true,
});
