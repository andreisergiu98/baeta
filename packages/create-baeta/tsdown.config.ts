import { defineConfig } from '@baeta/builder/tsdown';

export default defineConfig({
	entry: ['./index.ts', './cli.ts', '!dist'],
});
