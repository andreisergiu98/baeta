import { relative } from '@baeta/util-path';
import fg from 'fast-glob';
import { createJiti } from 'jiti';
import { makeErrorMessage } from '../sdk/errors.tsx';
import { type BaetaOptions, isValidConfig } from './config.ts';

export interface LoadedBaetaConfig {
	config: BaetaOptions;
	location: string;
	relativeLocation: string;
}

const configNames = ['baeta', '.baeta'];
const configExtensions = ['js', 'mjs', 'cjs', 'ts'];

export async function discoverBaetaConfig() {
	const entries = configNames.flatMap((name) => {
		return configExtensions.map((ext) => `${name}.${ext}`);
	});

	return fg(entries, { cwd: process.cwd() })
		.then((res) => res[0])
		.catch(() => null);
}

function getRelativeConfigPath(path: string) {
	return `./${relative(process.cwd(), path)}`;
}

export async function loadConfig(path?: string): Promise<LoadedBaetaConfig | undefined> {
	const location = path ?? (await discoverBaetaConfig());

	if (location == null) {
		return;
	}

	const relativeLocation = getRelativeConfigPath(location);

	const jiti = createJiti(import.meta.url, {
		tryNative: false,
		interopDefault: true,
		moduleCache: false,
		fsCache: false,
	});

	const result = await jiti
		.import(relativeLocation, {
			parentURL: process.cwd(),
			default: true,
		})
		.catch((err) => {
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
