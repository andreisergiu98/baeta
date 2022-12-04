import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./bin/cli.ts', './index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
});
