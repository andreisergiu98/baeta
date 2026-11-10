import { PluginType } from '@baeta/plugin';
import type { NormalizedGeneratorOptions } from './config.ts';
import type { Ctx } from './ctx.ts';
import type { Watcher, WatcherFile } from './watcher.ts';

export const GeneratorPluginVersion = {
	V1: 'v1',
} as const;

export type GeneratorPluginVersion =
	(typeof GeneratorPluginVersion)[keyof typeof GeneratorPluginVersion];

export type GeneratorPluginV1Fn<Store = unknown> = (
	ctx: Ctx<Store>,
	next: () => Promise<void>,
) => Promise<void>;

export type GeneratorPluginV1ReloadFn = (file: WatcherFile) => void;

export type GeneratorPluginV1WatchOptions = (
	options: NormalizedGeneratorOptions,
	watcher: Watcher,
	reload: GeneratorPluginV1ReloadFn,
) => void;

/**
 * A run calls `setup` on every plugin, then `generate`, then `end`. Each step runs the plugins in
 * order, and `next()` continues to the next plugin. Files added to `ctx.fileManager` are written
 * after each step.
 */
export type GeneratorPluginV1Factory<Store = unknown> = {
	name: string;
	actionName: string;
	/**
	 * Add files that other plugins read from disk here, such as `.gql` schema files, so they exist
	 * before any plugin's `generate` runs.
	 */
	setup?: GeneratorPluginV1Fn<Store>;
	/** Generate the plugin's output. */
	generate?: GeneratorPluginV1Fn<Store>;
	/** Runs after the files from `generate` are written, with every generated file in `ctx.fileManager`. */
	end?: GeneratorPluginV1Fn<Store>;
	watch?: GeneratorPluginV1WatchOptions;
};

export interface GeneratorPluginV1<Store = unknown> {
	name: string;
	actionName: string;
	version: typeof GeneratorPluginVersion.V1;
	type: typeof PluginType.Generator;
	setup: GeneratorPluginV1Fn<Store>;
	generate: GeneratorPluginV1Fn<Store>;
	end: GeneratorPluginV1Fn<Store>;
	watch: GeneratorPluginV1WatchOptions;
}

export interface GeneratorPluginV1WithId<Store = unknown> extends GeneratorPluginV1<Store> {
	id: symbol;
}

const defaultPluginFn: GeneratorPluginV1Fn<unknown> = async (_ctx, next) => {
	return await next();
};

const defaultWatchFn = () => ({ include: [], ignore: [] });

export function createPluginV1<Store = unknown>(
	options: GeneratorPluginV1Factory<Store>,
): GeneratorPluginV1<Store> {
	return {
		name: options.name,
		actionName: options.actionName,
		version: GeneratorPluginVersion.V1,
		type: PluginType.Generator,
		end: options.end ?? defaultPluginFn,
		generate: options.generate ?? defaultPluginFn,
		setup: options.setup ?? defaultPluginFn,
		watch: options.watch ?? defaultWatchFn,
	};
}

export function isGeneratorPlugin(plugin: {
	type: PluginType;
}): plugin is GeneratorPluginV1<unknown> {
	return plugin.type === PluginType.Generator;
}

export function getGeneratorPlugins(plugins?: Array<{ type: PluginType }>) {
	if (!plugins) {
		return [];
	}
	return plugins.filter(isGeneratorPlugin);
}
