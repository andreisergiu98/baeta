import type { CompilerOptions } from '@baeta/compiler';
import type { GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator';

export interface BaetaOptions {
  graphql: GeneratorOptions;
  plugins?: Array<GeneratorPluginV1<any, any>>;
  compiler?: CompilerOptions;
}

export function defineConfig(config: BaetaOptions) {
  return { config };
}
