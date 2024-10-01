import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { relative } from '@baeta/util-path';
import { makeErrorMessage } from '../sdk/errors';
import { dynamicImportCompiler } from '../utils/compiler';
import { dynamicImport } from '../utils/import';
import { BaetaOptions } from './config';

export interface LoadedBaetaConfig {
	config: BaetaOptions;
	location: string;
	relativeLocation: string;
}

const configNames = ['baeta', '.baeta'];
const configExtensions = ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts'];

let cachedPkg: Record<string, unknown> | null = null;
export async function getPackageJSON(): Promise<Record<string, unknown> | null> {
	if (cachedPkg) {
		return cachedPkg;
	}

	try {
		const content = await fs.readFile(`${process.cwd()}/package.json`, 'utf-8');
		const parsed = JSON.parse(content);

		if (typeof parsed !== 'object') {
			return null;
		}

		cachedPkg = parsed;
		return parsed;
	} catch (e) {
		return null;
	}
}

export async function getLoaderType(configPath: string): Promise<'esm' | 'cjs'> {
	if (/\.mts$/.test(configPath)) {
		return 'esm';
	}

	if (/\.cts$/.test(configPath)) {
		return 'cjs';
	}

	const pkg = await getPackageJSON();

	if (pkg == null) {
		return 'esm';
	}

	return pkg.type === 'module' ? 'esm' : 'cjs';
}

export async function discoverBaetaConfig() {
	const entries = configNames.flatMap((name) => {
		return configExtensions.map((ext) => `${name}.${ext}`);
	});

	try {
		for await (const entry of fs.glob(entries, { cwd: process.cwd() })) {
			return entry;
		}
	} catch (e) {
		return null;
	}
}

function getRelativeConfigPath(path: string) {
	return relative(process.cwd(), path);
}

export async function loadConfigFromBundledFile(
	fileName: string,
	bundledCode: string,
	isEsm: boolean,
): Promise<any> {
	const ext = isEsm ? 'mjs' : 'cjs';
	const fileBase = `${fileName}.timestamp-${Date.now()}`;
	const fileNameTmp = `${fileBase}.${ext}`;
	const fileUrl = `${pathToFileURL(fileBase)}.${ext}`;
	await fs.writeFile(fileNameTmp, bundledCode);

	try {
		return await dynamicImport(fileUrl);
	} finally {
		await fs.unlink(fileNameTmp).catch(() => {
			// already removed if this function is called twice simultaneously
		});
	}
}

function bustRequire(configPath: string) {
	try {
		const mod = require.resolve(configPath);
		require.cache[mod] = undefined;
	} catch (e) {
		//
	}
}

let cacheIndex = 1;
async function importJavaScriptConfig(configPath: string): Promise<BaetaOptions | undefined> {
	bustRequire(configPath);
	const module = await dynamicImport(`${configPath}?v${cacheIndex++}`);
	return module?.default?.default?.config || module?.default?.config || module?.config;
}

async function importTypeScriptConfig(configPath: string): Promise<BaetaOptions | undefined> {
	const compiler = await dynamicImportCompiler().catch((err) => null);

	if (compiler == null) {
		console.log(
			makeErrorMessage(
				`@baeta/compiler is required to load ${getRelativeConfigPath(configPath)}`,
				true,
			),
		);
		process.exit(1);
	}

	const isEsm = (await getLoaderType(configPath)) === 'esm';
	const bundle = await compiler.bundleFile(configPath, isEsm);
	const module = await loadConfigFromBundledFile(configPath, bundle.code, isEsm);
	return module?.default?.default?.config || module?.default?.config || module?.config;
}

async function importConfig(configPath: string) {
	const isTS = configPath.endsWith('ts');
	if (isTS) {
		return importTypeScriptConfig(configPath);
	}
	return importJavaScriptConfig(configPath);
}

export async function loadConfig(path?: string): Promise<LoadedBaetaConfig | undefined> {
	const configPath = path ?? (await discoverBaetaConfig());

	if (configPath == null) {
		return;
	}

	const config = await importConfig(configPath);

	if (!config) {
		return;
	}

	return {
		config,
		location: configPath,
		relativeLocation: getRelativeConfigPath(configPath),
	};
}
