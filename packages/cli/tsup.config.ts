import { defineConfig } from '@baeta/prep';

export default defineConfig({
  entry: ['./bin/cli.ts', './index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
});
