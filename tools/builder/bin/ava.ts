#! /usr/bin/env node

import { spawnCli } from '../lib/spawn-cli.ts';

await spawnCli({ root: import.meta.url, lib: 'ava', path: '../cli.mjs' }).catch((error) => {
	process.exit(error.exitCode || 1);
});
