import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function getReleaseTag(): Promise<string> {
	const rootDir = join(import.meta.dirname, '../../../.changeset');
	const preReleaseFile = join(rootDir, 'pre.json');
	const preRelease = await readFile(preReleaseFile, 'utf8').catch(() => null);
	if (preRelease == null) {
		return 'latest';
	}
	const parsed = JSON.parse(preRelease);
	if (typeof parsed.tag !== 'string') {
		throw new TypeError('Invalid pre-release tag');
	}
	return parsed.tag;
}
