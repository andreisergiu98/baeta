import { defineConfig } from '@baeta/builder/tsdown';

export default defineConfig({
	entry: ['./index.ts', './sdk/index.ts', '!dist'],
});
