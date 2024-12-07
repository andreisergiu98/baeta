import { relative } from '@baeta/util-path';
import fg from 'fast-glob';
import { importJavaScriptConfig } from './config-loader-esm.ts';
import { importTypeScriptConfig } from './config-loader-ts.ts';
import type { BaetaOptions } from './config.ts';

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
	return relative(process.cwd(), path);
}

async function importConfig(configPath: string) {
	if (configPath.endsWith('ts')) {
		return importTypeScriptConfig(configPath);
	}
	return importJavaScriptConfig(configPath);
}

export async function loadConfig(path?: string): Promise<LoadedBaetaConfig | undefined> {
	const location = path ?? (await discoverBaetaConfig());

	if (location == null) {
		return;
	}

	const relativeLocation = getRelativeConfigPath(location);
	const config = await importConfig(relativeLocation);

	if (!config) {
		return;
	}

	return {
		config,
		location,
		relativeLocation,
	};
}
