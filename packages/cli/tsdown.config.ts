import { defineConfig } from '@baeta/builder/tsdown';
import pkg from './package.json' with { type: 'json' };

export default defineConfig(pkg, {
	additionalEntrypoints: ['./bin/cli.ts'],
});
