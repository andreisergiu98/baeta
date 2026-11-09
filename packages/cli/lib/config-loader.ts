import { glob } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { relative, resolve } from '@baeta/util-path';
import type { BaetaOptions, DefinedConfig } from './config.ts';

export interface LoadedBaetaConfig {
	config: BaetaOptions;
	location: string;
	relativeLocation: string;
}

export type ConfigResult = ({ ok: true } & LoadedBaetaConfig) | { ok: false; error: Error };

const configNames = ['baeta', '.baeta'];
const configExtensions = ['ts', 'mts', 'js', 'mjs'];
const configNameOrder = configExtensions.flatMap((ext) =>
	configNames.map((name) => `${name}.${ext}`),
);

export async function discoverBaetaConfig() {
	const globFiles = glob(`{${configNames.join(',')}}.{${configExtensions.join(',')}}`, {
		cwd: process.cwd(),
	});
	const files: string[] = [];
	for await (const file of globFiles) {
		files.push(file);
	}
	return (
		files.toSorted((a, b) => configNameOrder.indexOf(a) - configNameOrder.indexOf(b)).at(0) ?? null
	);
}

export function isMatchingConfigFilename(filename: string) {
	return configNameOrder.includes(filename);
}

function getRelativeConfigPath(path: string) {
	return `./${relative(process.cwd(), path)}`;
}

async function importConfig(configPath: string, cacheIndex: number): Promise<unknown> {
	const modulePath = resolve(process.cwd(), configPath);
	const url = pathToFileURL(modulePath);
	url.searchParams.set('update', String(cacheIndex));
	const result = await import(url.href);

	if (typeof result !== 'object' || result === null) {
		throw new Error('Invalid config, expected `baeta.ts` with default export.');
	}

	if ('default' in result) {
		return result.default;
	}

	return result;
}

export async function loadConfig(path?: string, cacheIndex = 0): Promise<ConfigResult> {
	const location = path ?? (await discoverBaetaConfig());

	if (location == null) {
		return { ok: false, error: new Error('No config file found.') };
	}

	const relativeLocation = getRelativeConfigPath(location);

	let result: unknown;
	try {
		result = await importConfig(relativeLocation, cacheIndex);
	} catch (err) {
		return {
			ok: false,
			error: new Error(`Failed to load config from \`${relativeLocation}\`.`, { cause: err }),
		};
	}

	if (!isValidConfig(result)) {
		return { ok: false, error: new Error(explainInvalidConfig(result)) };
	}

	return {
		ok: true,
		config: result.config,
		location,
		relativeLocation,
	};
}

export function getLoadedConfig(config: ConfigResult) {
	if (!config.ok) {
		throw config.error;
	}
	return config;
}

function isValidConfig(value: unknown): value is DefinedConfig {
	if (typeof value !== 'object') {
		return false;
	}
	if (value == null) {
		return false;
	}
	if (!('config' in value)) {
		return false;
	}
	if (!('version' in value)) {
		return false;
	}
	return value.version === 'v2';
}

function explainInvalidConfig(value: unknown): string {
	if (typeof value === 'object' && value != null && 'version' in value && value.version !== 'v2') {
		return `Unsupported config version \`${String(value.version)}\`. Expected \`v2\`, create the config with \`defineConfig\` from @baeta/cli.`;
	}
	return 'Invalid config, expected `baeta.ts` with default export created with `defineConfig`.';
}
