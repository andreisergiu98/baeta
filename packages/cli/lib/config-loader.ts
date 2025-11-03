import { glob } from 'node:fs/promises';
import { relative, resolve } from '@baeta/util-path';
import { makeErrorMessage } from '../sdk/errors.tsx';
import { type BaetaOptions, isValidConfig } from './config.ts';

export interface LoadedBaetaConfig {
	config: BaetaOptions;
	location: string;
	relativeLocation: string;
}

const configNames = ['baeta', '.baeta'];
const configExtensions = ['ts', 'mts', 'js', 'mjs'];

export async function discoverBaetaConfig() {
	for await (const file of await glob(
		`{${configNames.join(',')}}.{${configExtensions.join(',')}}`,
		{
			cwd: process.cwd(),
		},
	)) {
		return file;
	}
	return null;
}

function getRelativeConfigPath(path: string) {
	return `./${relative(process.cwd(), path)}`;
}

let cacheIndex = 0;
async function importConfig(configPath: string): Promise<unknown> {
	const modulePath = resolve(process.cwd(), configPath);
	const result = await import(`${modulePath}?update=${cacheIndex++}`);

	if (typeof result !== 'object' || result === null) {
		throw new Error('Invalid config, expected `baeta.ts` with default export.');
	}

	if ('default' in result) {
		return result.default;
	}

	return result;
}

export async function loadConfig(path?: string): Promise<LoadedBaetaConfig | undefined> {
	const location = path ?? (await discoverBaetaConfig());

	if (location == null) {
		return;
	}

	const relativeLocation = getRelativeConfigPath(location);

	const result = await importConfig(relativeLocation).catch((err) => {
		console.error(err);
		process.exit(1);
	});

	if (!isValidConfig(result)) {
		console.error(makeErrorMessage('Invalid config, expected `baeta.ts` with default export.'));
		return;
	}

	return {
		config: result.config,
		location,
		relativeLocation,
	};
}
