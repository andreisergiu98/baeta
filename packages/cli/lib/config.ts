import type { GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator';

/**
 * Represents a Baeta plugin.
 */
export type Plugin = GeneratorPluginV1;

/**
 * Collection of Baeta plugins.
 */
export type Plugins = Array<Plugin | Array<Plugin>>;

export interface BaetaOptions {
	/**
	 * Configuration for the GraphQL code generator.
	 */
	graphql: GeneratorOptions;

	/**
	 * Plugins to extend Baeta's functionality.
	 */
	plugins?: Plugins;
}

export interface DefinedConfig {
	config: BaetaOptions;
	version: 'v2';
}

/**
 * Helper function to define a type-safe Baeta configuration.
 */
export function defineConfig(config: BaetaOptions): DefinedConfig {
	return { config, version: 'v2' };
}

export function isValidConfig(value: unknown): value is DefinedConfig {
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
