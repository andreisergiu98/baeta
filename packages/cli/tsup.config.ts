import { defineConfig } from '@baeta/prep/tsup';

export default defineConfig({
  entry: ['./bin/cli.ts'],
  format: ['esm'],
  clean: true,
});
