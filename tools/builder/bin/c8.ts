#! /usr/bin/env node

import { spawnCli } from '../lib/spawn-cli.ts';

await spawnCli({ root: import.meta.url, lib: 'c8', path: '../bin/c8.js' }).catch((error) => {
	process.exit(error.exitCode || 1);
});
