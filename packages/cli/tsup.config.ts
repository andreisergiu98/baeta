import { defineConfig } from '@baeta/build-tools/tsup';

export default defineConfig({
  entry: ['./bin/cli.ts', './index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: true,
  inject: ['./utils/shim.ts'],
  jsxFactory: '__jsx__',
  jsxFragment: '__fragment__',
  tsconfig: './tsconfig.build.json',
});
