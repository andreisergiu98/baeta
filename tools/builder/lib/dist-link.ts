import fs from 'node:fs/promises';
import path from 'node:path';
import { getPublicWorkspacePackages, loadWorkspaceProject } from './workspace.ts';

const manifestPath = path.join(process.cwd(), '.dist-link.json');

interface Backup {
	file: string;
	original: string;
}

function fileExists(file: string): Promise<boolean> {
	return fs.access(file).then(
		() => true,
		() => false,
	);
}

export async function applyDistLinks(): Promise<void> {
	if (await fileExists(manifestPath)) {
		throw new Error('Dist links already applied. Run restore before linking again.');
	}

	const project = await loadWorkspaceProject();
	const packages = getPublicWorkspacePackages(project);
	const backups: Backup[] = [];

	for (const pkg of packages) {
		const file = path.join(pkg.dir, 'package.json');
		const original = await fs.readFile(file, 'utf-8');
		const manifest = JSON.parse(original);

		if (manifest.publishConfig?.exports == null) {
			continue;
		}

		manifest.exports = manifest.publishConfig.exports;
		if (manifest.publishConfig.bin != null) {
			manifest.bin = manifest.publishConfig.bin;
		}

		backups.push({ file, original });
		await fs.writeFile(file, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
	}

	await fs.writeFile(manifestPath, JSON.stringify(backups), 'utf-8');
}

export async function restoreDistLinks(): Promise<void> {
	const content = await fs.readFile(manifestPath, 'utf-8').catch(() => null);
	if (content == null) {
		return;
	}
	const backups = JSON.parse(content) as Backup[];
	await Promise.all(backups.map(({ file, original }) => fs.writeFile(file, original, 'utf-8')));
	await fs.unlink(manifestPath);
}
