import fs from 'node:fs/promises';
import { join } from 'node:path';
import type { CommandModule } from 'yargs';
import { loadPackageJson, type PkgExport } from '../lib/package-json.ts';

interface PrepareArgs {
	restore?: boolean;
}

interface ForgedPkg {
	name: string;
	type?: string;
	main?: string;
	module?: string;
	types?: string;
	sideEffects?: boolean;
}

interface Manifest {
	files: string[];
}

const manifestPath = '.publish.prep';

// biome-ignore lint/complexity/noBannedTypes: Allow empty dictionary
export const prepareCommand: CommandModule<{}, PrepareArgs> = {
	command: 'prepare',
	describe: 'Prepare package for publishing',
	builder: (yargs) => {
		return yargs.option('restore', {
			describe: 'Restore the package to its state before prepare',
			type: 'boolean',
			default: false,
		});
	},
	handler: async (args) => {
		const manifest = await getManifest();
		if (args.restore) {
			if (manifest == null) {
				console.error('[ERROR] No manifest found, nothing to clean.');
				process.exit(1);
			}
			await Promise.all([
				...manifest.files.map((file) => fs.unlink(file)),
				fs.unlink(manifestPath),
			]);
			return;
		}
		if (manifest != null) {
			console.error('[ERROR] Remove manifest before preparing.');
			process.exit(1);
		}
		const files = (await Promise.all([copyReadmeAndLicense(), createNestedPackages()])).flat();
		await writeManifest(files);
	},
};

async function getManifest() {
	const manifestContent = await fs.readFile(manifestPath, 'utf-8').catch(() => null);
	if (!manifestContent) {
		return;
	}
	return JSON.parse(manifestContent) as Manifest;
}

async function writeManifest(files: string[]) {
	const manifest: Manifest = {
		files,
	};
	await fs.writeFile(manifestPath, JSON.stringify(manifest), 'utf-8');
}

function forgePackage(pkgName: string, entry: string, pkgExport: PkgExport) {
	const name = join(pkgName, entry);
	if (name === pkgName) {
		return;
	}
	const forged: ForgedPkg = {
		name,
		types: join('../', pkgExport.types),
	};
	return forged;
}

async function createNestedPackages(): Promise<string[]> {
	const pkg = await loadPackageJson();
	const pkgExports = pkg.publishConfig?.exports ?? {};

	const entries = Object.entries(pkgExports);
	const created: string[] = [];
	const promises: Promise<void>[] = [];

	for (const [path, exports] of entries) {
		const forged = forgePackage(pkg.name, path, exports);

		if (!forged) {
			continue;
		}

		if (pkg.type) {
			forged.type = pkg.type;
		}

		if (pkg.sideEffects) {
			forged.sideEffects = pkg.sideEffects;
		}

		const dist = join(path, 'package.json');
		const content = JSON.stringify(forged, null, 2);

		created.push(dist);
		promises.push(fs.writeFile(dist, content, 'utf-8'));
	}

	await Promise.all(promises);
	return created;
}

async function copyReadmeAndLicense() {
	const readmeFile = 'README.md';
	const licenseFile = 'LICENSE';
	const readmePath = join(process.cwd(), `../../${readmeFile}`);
	const readmeDist = join(process.cwd(), readmeFile);
	const licensePath = join(process.cwd(), `../../${licenseFile}`);
	const licenseDist = join(process.cwd(), licenseFile);
	await Promise.all([fs.copyFile(readmePath, readmeDist), fs.copyFile(licensePath, licenseDist)]);
	return [readmeFile, licenseFile];
}
