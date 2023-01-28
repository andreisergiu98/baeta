import { NormalizedGeneratorOptions } from './config';
import { FileManager } from './file-manager';

export type Ctx<T = unknown> = {
  fileManager: FileManager;
  didSetup: string[];
  didGenerate: string[];
  didEnd: string[];
  pluginNames: string[];
  generatorOptions: NormalizedGeneratorOptions;
  watching: boolean;
  changedFile?: string;
} & T;
