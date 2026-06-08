import { access, constants } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function exists(path: string): Promise<boolean> {
	try {
		await access(path, constants.F_OK);
		return true;
	} catch {
		return false;
	}
}

export function createRelativeExists(root: string) {
	return async (relativePath: string): Promise<boolean> => {
		const fullPath = resolve(root, relativePath);
		return await exists(fullPath);
	};
}
