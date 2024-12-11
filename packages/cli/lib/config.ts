import type { CompilerOptions } from '@baeta/compiler';
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

	/**
	 * Configuration for the TypeScript compiler.
	 * It uses esbuild under the hood and creates an optimized bundle.
	 */
	compiler?: CompilerOptions;
}

/**
 * Helper function to define a type-safe Baeta configuration.
 */
export function defineConfig(config: BaetaOptions) {
	return { config };
}
