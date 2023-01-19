import { Ctx, FileManager, GeneratorOptions, GeneratorPluginV1 } from '@baeta/generator-sdk';

interface CtxOptions {
  generatorOptions: GeneratorOptions;
  plugins: GeneratorPluginV1[];
  changedFile?: string;
  watching?: boolean;
}

export function createCtx(options: CtxOptions): Ctx {
  return {
    generatorOptions: structuredClone(options.generatorOptions),
    fileManager: new FileManager(),
    didSetup: [],
    didGenerate: [],
    didEnd: [],
    pluginNames: options.plugins.map((plugin) => plugin.name),
    watching: options.watching ?? false,
    changedFile: options.changedFile,
  };
}
