#! /usr/bin/env node

import { spawnCli } from '../lib/spawn.ts';

await spawnCli(import.meta.url, 'ava', '../cli.mjs').catch((error) => {
	process.exit(error.exitCode || 1);
});
