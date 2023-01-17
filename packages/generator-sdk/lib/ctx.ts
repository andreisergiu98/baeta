import { GeneratorOptions } from './config';
import { FileManager } from './file-manager';

export type Ctx<T = Record<string, unknown>> = {
  fileManager: FileManager;
  didSetup: string[];
  didGenerate: string[];
  didEnd: string[];
  pluginNames: string[];
  graphqlConfig: GeneratorOptions;
} & T;
