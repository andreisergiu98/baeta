import { defineConfig } from '@baeta/builder/tsup';

export default defineConfig({
	entry: ['index.ts', 'esbuild/index.ts'],
});
