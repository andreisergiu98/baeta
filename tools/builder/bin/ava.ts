#! /usr/bin/env node

import { spawnCli } from '../lib/spawn-cli.ts';

// import "ava";

await spawnCli({ root: import.meta.url, lib: 'ava', path: '../cli.js' }).catch((error) => {
	process.exit(error.exitCode || 1);
});
