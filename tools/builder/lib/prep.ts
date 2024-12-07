import fs from 'node:fs/promises';
import { join } from 'node:path';

interface Pkg {
	name?: string;
	type?: string;
	sideEffects?: boolean;
	exports?: Exports;
	publishConfig?: PkgPublishConfig;
}

interface PkgPublishConfig {
	exports?: Exports;
}

type Exports = Record<string, PkgExport>;

interface PkgExport {
	types?: string;
	import?: string;
	require?: string;
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

async function getManifest() {
	const manifestContent = await fs.readFile(manifestPath, 'utf-8').catch(() => null);
	if (!manifestContent) {
		return;
	}
	return JSON.parse(manifestContent) as Manifest;
}

async function writeManifest(files: string[]) {
	if (files.length === 0) {
		return;
	}

	const manifest: Manifest = {
		files,
	};

	await fs.writeFile(manifestPath, JSON.stringify(manifest), 'utf-8');
}

async function removeNestedPackages() {
	const manifest = await getManifest();

	if (manifest == null) {
		return;
	}

	const promises = [fs.unlink(manifestPath)];

	for (const file of manifest.files) {
		promises.push(fs.unlink(file));
	}

	await Promise.all(promises);
}

async function loadPackageJson(): Promise<Pkg> {
	const content = await fs.readFile(`${process.cwd()}/package.json`, 'utf-8');
	return JSON.parse(content);
}

function forgePackage(pkgName: string, entry: string, exports: PkgExport) {
	const name = join(pkgName, entry);

	if (name === pkgName) {
		return;
	}

	const forged: ForgedPkg = {
		name,
	};

	if (exports.types) {
		forged.types = join('../', exports.types);
	}

	return forged;
}

async function createNestedPackages() {
	const pkg = await loadPackageJson();

	if (pkg.name == null) {
		console.log('Missing name, skipping...');
		return;
	}

	const pkgExports = pkg.publishConfig?.exports || pkg.exports;

	if (pkgExports == null) {
		console.log('Missing publishConfig.exports and exports, skipping...');
		return;
	}

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

	promises.push(writeManifest(created));
	await Promise.all(promises);
	return created;
}

function copyReadme() {
	const readmePath = join(process.cwd(), '../../README.md');
	const readmeDist = join(process.cwd(), 'README.md');
	return fs.copyFile(readmePath, readmeDist);
}

function removeReadme() {
	const readmeDist = join(process.cwd(), 'README.md');
	return fs.unlink(readmeDist);
}

async function run() {
	const arg = process.argv[2];

	if (arg === '--help') {
		return console.log('Usage: prep.js prepares packages for publish [--clean cleans afterwards]');
	}

	if (arg === '--clean') {
		return Promise.all([removeNestedPackages(), removeReadme()]);
	}

	const manifest = await getManifest();

	if (manifest != null) {
		console.error('[ERROR] Remove manifest before preparing');
		process.exit(1);
	}

	return Promise.all([copyReadme(), createNestedPackages()]);
}

run().catch(console.error);
