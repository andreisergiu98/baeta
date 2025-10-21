import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function getPreReleaseTag(): Promise<string> {
	const rootDir = join(import.meta.dirname, '../../../.changeset');
	const preRealaseFile = join(rootDir, 'pre.json');
	const preRealase = await readFile(preRealaseFile, 'utf8').catch(() => null);
	if (preRealase == null) {
		return 'latest';
	}
	const parsed = JSON.parse(preRealase);
	if (typeof parsed.tag !== 'string') {
		throw new Error('Invalid pre-release tag');
	}
	return parsed.tag;
}
