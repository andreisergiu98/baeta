import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./index.ts', '!dist'],
  format: ['esm', 'cjs'],
  clean: true,
});
