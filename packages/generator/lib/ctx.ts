import { BaetaOptions, GeneratorCtxV1, GeneratorPluginV1WithConfig } from '@baeta/config';
import { FileManager } from './file-manager';

export function createGeneratorCtxV1(
  config: BaetaOptions,
  plugins: GeneratorPluginV1WithConfig<unknown, unknown>[]
): GeneratorCtxV1 {
  return {
    config,
    fileManager: new FileManager(),
    didSetup: [],
    didGenerate: [],
    didEnd: [],
    pluginNames: plugins.map((plugin) => plugin.name),
  };
}
