import type { CompilerOptions } from '@baeta/compiler';
import type { GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator';

export type Plugin = GeneratorPluginV1<any>;
export type Plugins = Array<Plugin | Array<Plugin>>;

export interface BaetaOptions {
  /**
   * Options for the graphql generator.
   */
  graphql: GeneratorOptions;

  /**
   * Plugins to run.
   */
  plugins?: Plugins;

  /**
   * Options for the compiler.
   */
  compiler?: CompilerOptions;
}

export function defineConfig(config: BaetaOptions) {
  return { config };
}
