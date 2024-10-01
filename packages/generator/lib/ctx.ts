import {
	Ctx,
	FileManager,
	GeneratorPluginV1,
	NormalizedGeneratorOptions,
	WatcherFile,
} from '@baeta/generator-sdk';

interface CtxOptions {
	generatorOptions: NormalizedGeneratorOptions;
	plugins: GeneratorPluginV1[];
	changedFile?: WatcherFile;
	watching?: boolean;
}

function cloneGeneratorOptions(options: NormalizedGeneratorOptions) {
	const fileOptions = { ...options.fileOptions };
	options.fileOptions = undefined;

	const clonedOptions = structuredClone(options);
	clonedOptions.fileOptions = fileOptions;

	return clonedOptions;
}

export function createCtx(options: CtxOptions): Ctx {
	const generatorOptions = cloneGeneratorOptions(options.generatorOptions);

	return {
		generatorOptions,
		fileManager: new FileManager(generatorOptions.fileOptions),
		didSetup: [],
		didGenerate: [],
		didEnd: [],
		pluginNames: options.plugins.map((plugin) => plugin.name),
		watching: options.watching ?? false,
		changedFile: options.changedFile,
	};
}
