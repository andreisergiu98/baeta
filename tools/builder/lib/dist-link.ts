import fs from 'node:fs/promises';
import path from 'node:path';
import {
	getPublicWorkspacePackages,
	loadWorkspaceProject,
	type PublicWorkspacePackage,
} from './workspace.ts';

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

async function applyDistLink(pkg: PublicWorkspacePackage): Promise<Backup | null> {
	const file = path.join(pkg.dir, 'package.json');
	const original = await fs.readFile(file, 'utf-8');
	const manifest = JSON.parse(original);
	if (manifest.publishConfig?.exports == null) {
		return null;
	}
	manifest.exports = manifest.publishConfig.exports;
	if (manifest.publishConfig.bin != null) {
		manifest.bin = manifest.publishConfig.bin;
	}
	await fs.writeFile(file, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
	return { file, original };
}

export async function applyDistLinks(): Promise<void> {
	if (await fileExists(manifestPath)) {
		throw new Error('Dist links already applied. Run restore before linking again.');
	}
	const project = await loadWorkspaceProject();
	const packages = getPublicWorkspacePackages(project);
	const backups = await Promise.all(packages.map(applyDistLink));
	await fs.writeFile(manifestPath, JSON.stringify(backups.filter((el) => el !== null)), 'utf-8');
}

export async function restoreDistLinks(): Promise<void> {
	const content = await fs.readFile(manifestPath, 'utf-8').catch(() => null);
	if (content == null) {
		throw new Error('No dist link backup found. Cannot restore.');
	}
	const backups = JSON.parse(content) as Backup[];
	await Promise.all(backups.map(({ file, original }) => fs.writeFile(file, original, 'utf-8')));
	await fs.unlink(manifestPath);
}
