#! /usr/bin/env node

import { spawnCli } from '@baeta/tools-utils';

spawnCli(import.meta.url, 'ava', '../cli.mjs').catch((error) => {
	process.exit(error.exitCode || 1);
});
