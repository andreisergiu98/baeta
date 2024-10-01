import { defineConfig } from '@baeta/builder/tsup';

export default defineConfig({
	entry: ['./bin/cli.ts', './ink/index.ts', './sdk/index.ts', './index.ts'],
});
