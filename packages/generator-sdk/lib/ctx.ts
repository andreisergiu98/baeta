import type { NormalizedGeneratorOptions } from './config.ts';
import type { FileManager } from './file-manager.ts';
import type { WatcherFile } from './watcher.ts';

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
