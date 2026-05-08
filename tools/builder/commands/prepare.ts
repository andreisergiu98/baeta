import fs from 'node:fs/promises';
import { join } from 'node:path';
import ora from 'ora';
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
		const pkg = await loadPackageJson();
		const manifest = await getManifest();

		if (args.restore) {
			if (manifest == null) {
				throw new Error('No manifest found, nothing to clean.');
			}

			const spinner = ora(`Restoring package ${pkg.name} to state before prepare...`).start();
			try {
				await Promise.all([
					...manifest.files.map((file) => fs.unlink(file)),
					fs.unlink(manifestPath),
				]);
				spinner.succeed(`Package ${pkg.name} restored successfully`);
			} catch (error) {
				spinner.fail(`Failed to restore package ${pkg.name}`);
				throw error;
			}
		} else {
			if (manifest != null) {
				throw new Error('Remove manifest before preparing.');
			}

			const spinner = ora(`Preparing package ${pkg.name} for publishing...`).start();
			try {
				const files = (await Promise.all([copyReadmeAndLicense(), createNestedPackages()])).flat();
				await writeManifest(files);
				spinner.succeed(`Package ${pkg.name} prepared successfully`);
			} catch (error) {
				spinner.fail(`Failed to prepare package ${pkg.name}`);
				throw error;
			}
		}
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
