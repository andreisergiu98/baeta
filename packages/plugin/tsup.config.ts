import { defineConfig } from '@baeta/prep';

export default defineConfig({
  entry: ['./index.ts', '!dist'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
});
