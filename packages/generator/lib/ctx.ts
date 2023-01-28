import {
  Ctx,
  FileManager,
  GeneratorPluginV1,
  NormalizedGeneratorOptions,
} from '@baeta/generator-sdk';

interface CtxOptions {
  generatorOptions: NormalizedGeneratorOptions;
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
