import { defineConfig } from '@baeta/builder/tsup';

export default defineConfig({
	entry: ['./cli.ts', '!dist'],
});
