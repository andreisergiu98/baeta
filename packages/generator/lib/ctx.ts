import { Ctx, FileManager, GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator-sdk';

export function createCtx(
  config: GeneratorOptions,
  plugins: GeneratorPluginV1<unknown, unknown>[]
): Ctx {
  return {
    graphqlConfig: config,
    fileManager: new FileManager(),
    didSetup: [],
    didGenerate: [],
    didEnd: [],
    pluginNames: plugins.map((plugin) => plugin.name),
  };
}
