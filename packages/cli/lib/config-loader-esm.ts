import path from 'node:path';
import { makeErrorMessage } from '../sdk/errors.tsx';
import { dynamicImport } from '../utils/import.ts';
import type { BaetaOptions } from './config.ts';
import { type ConfigModule, getLoaderType, selectConfigFromModule } from './config-loader-utils.ts';

export interface LoadedBaetaConfig {
	config: BaetaOptions;
	location: string;
	relativeLocation: string;
}

let cacheIndex = 1;
export async function importJavaScriptConfig(
	configPath: string,
): Promise<BaetaOptions | undefined> {
	const loaderType = await getLoaderType(configPath);

	if (loaderType === 'cjs') {
		const errorMessage = `CommonJS for the config file is unsupported. Rename it to baeta.mjs or add "type": "module" to package.json`;
		console.log(makeErrorMessage(errorMessage, true));
		process.exit(1);
	}

	const modulePath = path.resolve(process.cwd(), configPath);
	const module = await dynamicImport<ConfigModule>(`${modulePath}?v${cacheIndex++}`);
	return selectConfigFromModule(module);
}
