export type {
  CompilerCommandOptions,
  CompilerCommandsOptions,
  CompilerOptions,
} from './lib/compiler';
export type { BaetaOptions } from './lib/config';
export type { GeneratorCtxV1 } from './lib/generator';
export { GeneratorPluginVersion } from './lib/generator-plugin';
export type {
  GeneratorPluginFn,
  GeneratorPluginParams,
  GeneratorPluginV1,
  GeneratorPluginV1WatchOptions,
  GeneratorPluginV1WithConfig,
} from './lib/generator-plugin';
export type { GraphqlPluginOptions } from './lib/graphql-plugin';
export * from './lib/plugin';

import type { BaetaOptions } from './lib/config';

export function createConfig(config: BaetaOptions) {
  return { config };
}
