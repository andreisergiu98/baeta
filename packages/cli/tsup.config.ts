import { defineConfig } from '@baeta/build-tools/tsup';

export default defineConfig({
  entry: ['./bin/cli.ts', './ink/index.ts', './sdk/index.ts', './index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
});
