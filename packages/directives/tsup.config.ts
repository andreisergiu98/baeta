import { defineConfig } from '@baeta/builder/tsup';

export default defineConfig({
	entry: ['index.ts', '!dist'],
});
