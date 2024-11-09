import { defineConfig } from '@baeta/builder/tsup';

export default defineConfig({
	entry: ['./index.ts', './sdk/index.ts', '!dist'],
});
