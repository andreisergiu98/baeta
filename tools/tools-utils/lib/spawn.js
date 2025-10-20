import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { execa } from 'execa';

export function spawnCli(
	root,
	lib,
	path,
	execPath = process.execPath,
	args = process.argv.slice(2),
) {
	const require = createRequire(root);
	const cliEntry = require.resolve(lib);
	const cliPath = resolve(cliEntry, path);
	return execa(execPath, [cliPath, ...args], { stdio: 'inherit', preferLocal: true });
}
