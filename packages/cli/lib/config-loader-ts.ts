import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { makeErrorMessage } from '../sdk/errors.tsx';
import { dynamicImportCompiler } from '../utils/compiler.ts';
import { dynamicImport } from '../utils/import.ts';
import { type ConfigModule, selectConfigFromModule } from './config-loader-utils.ts';
import type { BaetaOptions } from './config.ts';

async function loadConfigFromBundledFile(
	fileName: string,
	bundledCode: string,
): Promise<ConfigModule> {
	const ext = 'mjs';
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

export async function importTypeScriptConfig(
	configPath: string,
): Promise<BaetaOptions | undefined> {
	const compiler = await dynamicImportCompiler().catch((err) => null);

	if (compiler == null) {
		console.log(makeErrorMessage(`@baeta/compiler is required to load ${configPath}`, true));
		process.exit(1);
	}

	const bundle = await compiler.bundleFile(configPath);
	const module = await loadConfigFromBundledFile(configPath, bundle.code);

	return selectConfigFromModule(module);
}
