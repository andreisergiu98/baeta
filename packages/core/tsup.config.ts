import { defineConfig } from '@baeta/prep';

export default defineConfig({
  entry: ['index.ts', 'sdk/index.ts'],
  format: ['esm', 'cjs'],
  external: ['@baeta/compiler'],
  dts: true,
  clean: true,
});
