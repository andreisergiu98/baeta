import {
	type Ctx,
	FileManager,
	type GeneratorPluginV1WithId,
	type NormalizedGeneratorOptions,
	type WatcherFile,
} from '@baeta/generator-sdk';

interface CtxOptions {
	generatorOptions: NormalizedGeneratorOptions;
	plugins: GeneratorPluginV1WithId[];
	changedFiles?: WatcherFile[];
	watching?: boolean;
}

function cloneGeneratorOptions(options: NormalizedGeneratorOptions) {
	const clonedOptions: NormalizedGeneratorOptions = {
		...options,
		schemas: [...options.schemas],
		loaders: options.loaders ? [...options.loaders] : undefined,
		fileOptions: options.fileOptions
			? {
					...options.fileOptions,
					enableLintHeaders:
						options.fileOptions.enableLintHeaders === true
							? true
							: options.fileOptions.enableLintHeaders
								? { ...options.fileOptions.enableLintHeaders }
								: undefined,
				}
			: undefined,
	};
	return clonedOptions;
}

export function createCtx(options: CtxOptions): Ctx {
	const generatorOptions = cloneGeneratorOptions(options.generatorOptions);
	return {
		generatorOptions,
		fileManager: new FileManager(generatorOptions.fileOptions),
		plugins: options.plugins,
		pluginStates: new Map(
			options.plugins.map((plugin) => [
				plugin.id,
				{
					setup: { status: 'pending' },
					generate: { status: 'pending' },
					end: { status: 'pending' },
				},
			]),
		),
		watching: options.watching ?? false,
		changedFiles: options.changedFiles,
	};
}
