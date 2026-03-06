import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { execa } from 'execa';

interface SpawnCliOptions {
	root: string;
	lib: string;
	path: string;
	execPath?: string;
	args?: string[];
}

export function spawnCli({
	root,
	lib,
	path,
	execPath = process.execPath,
	args = process.argv.slice(2),
}: SpawnCliOptions) {
	const require = createRequire(root);
	const cliEntry = require.resolve(lib);
	const cliPath = resolve(cliEntry, path);
	return execa(execPath, [cliPath, ...args], { stdio: 'inherit', preferLocal: true });
}
