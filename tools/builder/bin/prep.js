#! /usr/bin/env node

import { spawnTS } from '@baeta/tools-utils';

await spawnTS(import.meta.url, '../lib/prep.ts').catch((error) => {
	process.exit(error.exitCode || 1);
});
