import { defineConfig } from '@baeta/build-tools/tsup';

export default defineConfig({
  entry: ['./bin/cli.ts', './index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  bundle: true,
});
