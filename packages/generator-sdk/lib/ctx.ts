import type { NormalizedGeneratorOptions } from './config.ts';
import type { FileManager } from './file-manager.ts';
import type { PluginState } from './plugin-state.ts';
import type { GeneratorPluginV1WithId } from './plugin.ts';
import type { WatcherFile } from './watcher.ts';

export type Ctx<T = unknown> = {
	fileManager: FileManager;
	plugins: GeneratorPluginV1WithId[];
	pluginStates: Map<symbol, PluginState>;
	generatorOptions: NormalizedGeneratorOptions;
	watching: boolean;
	changedFiles?: WatcherFile[];
} & T;
