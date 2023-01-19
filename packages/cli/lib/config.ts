import type { CompilerOptions } from '@baeta/compiler';
import type { GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator';

export type Plugin = GeneratorPluginV1<any>;
export type Plugins = Array<Plugin | Array<Plugin>>;

export interface BaetaOptions {
  graphql: GeneratorOptions;
  plugins?: Plugins;
  compiler?: CompilerOptions;
}

export function defineConfig(config: BaetaOptions) {
  return { config };
}
