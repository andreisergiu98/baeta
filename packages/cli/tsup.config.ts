import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./bin/cli.ts', './index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
});
