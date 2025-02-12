#! /usr/bin/env node

import { spawnCli } from '@baeta/tools-utils';

spawnCli(import.meta.url, 'c8', '../bin/c8.js').catch((error) => {
	process.exit(error.exitCode || 1);
});
