import { NormalizedGeneratorOptions } from './config';
import { FileManager } from './file-manager';
import { WatcherFile } from './watcher';

export type Ctx<T = unknown> = {
  fileManager: FileManager;
  didSetup: string[];
  didGenerate: string[];
  didEnd: string[];
  pluginNames: string[];
  generatorOptions: NormalizedGeneratorOptions;
  watching: boolean;
  changedFile?: WatcherFile;
} & T;
