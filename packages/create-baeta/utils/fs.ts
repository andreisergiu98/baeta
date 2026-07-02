import fs from 'node:fs/promises';

export function pathExists(p: string) {
	return fs
		.access(p)
		.then(() => true)
		.catch(() => false);
}
