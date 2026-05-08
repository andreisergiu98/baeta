import { BUILD_DEFAULTS } from '@baeta/workspace-config';
import { defineConfig as originalDefineConfig, type UserConfig } from 'tsdown';
import type { Pkg } from './package-json-schema.ts';

interface TsdownConfig extends Omit<UserConfig, 'entry'> {
	additionalEntrypoints?: string[];
}

export function defineConfig(pkg: Pick<Pkg, 'exports'>, config: TsdownConfig = {}) {
	const entrypoints = Object.values(pkg.exports ?? {}).map((entry) => entry.default);
	return originalDefineConfig({
		...BUILD_DEFAULTS,
		...config,
		entry: [...entrypoints, ...(config.additionalEntrypoints ?? [])],
	});
}
