import { defineConfig } from '@baeta/builder/tsdown';

export default defineConfig({
	entry: ['./bin/cli.ts', './ink/index.ts', './sdk/index.ts', './index.ts'],
});
