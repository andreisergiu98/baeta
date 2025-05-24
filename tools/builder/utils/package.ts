import { readFile } from 'node:fs/promises';

export async function getPackageJSON() {
	try {
		const content = await readFile('package.json', 'utf-8');
		return JSON.parse(content);
	} catch {
		return null;
	}
}
