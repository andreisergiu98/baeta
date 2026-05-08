import {
	type Ctx,
	type GeneratorOptions,
	type GeneratorPluginV1,
	loadOptions,
	Watcher,
	type WatcherFile,
} from '@baeta/generator-sdk';
import { createCtx } from './ctx.ts';
import { cleanPreviousFiles } from './file-utils.ts';
import { getStateFilename, saveState } from './persistence.ts';
import { startRunner } from './runner.ts';

export interface GeneratorHooks {
	onStart?: () => void | Promise<void>;
	onEnd?: () => void | Promise<void>;
	onError?: (error: unknown) => void | Promise<void>;
	onPluginStepStart?: (
		plugin: GeneratorPluginV1,
		step: 'setup' | 'generate' | 'end',
	) => void | Promise<void>;
	onPluginStepEnd?: (
		plugin: GeneratorPluginV1,
		step: 'setup' | 'generate' | 'end',
	) => void | Promise<void>;
}

export async function generate(
	options: GeneratorOptions,
	plugins: GeneratorPluginV1[],
	hooks?: GeneratorHooks,
) {
	const generatorOptions = loadOptions(options);
	const stateFilename = getStateFilename(generatorOptions.cwd);
	const ctx = createCtx({ generatorOptions, plugins });
	return await executeGenerator(ctx, plugins, stateFilename, hooks);
}

export async function generateAndWatch(
	options: GeneratorOptions,
	plugins: GeneratorPluginV1[],
	hooks?: GeneratorHooks,
) {
	const generatorOptions = loadOptions(options);
	const stateFilename = getStateFilename(generatorOptions.cwd);
	const watcher = new Watcher(generatorOptions.cwd);

	let previousCtx: Ctx | undefined = await executeGenerator(
		createCtx({ generatorOptions, plugins }),
		plugins,
		stateFilename,
		hooks,
	);

	const reload = (file: WatcherFile) => {
		const ctx = createCtx({
			generatorOptions,
			plugins,
			watching: true,
			changedFile: file,
		});
		// TODO: add proper scheduler to avoid multiple executions when multiple files change in a short period of time
		executeGenerator(ctx, plugins, stateFilename, hooks, previousCtx)
			.then((newCtx) => {
				previousCtx = newCtx;
			})
			.catch(() => {
				// Errors are handled in executeGenerator, so we can ignore them here
			});
	};

	for (const plugin of plugins) {
		plugin.watch(generatorOptions, watcher, reload);
	}

	return watcher;
}

async function executeGenerator(
	ctx: Ctx,
	plugins: GeneratorPluginV1[],
	stateFilename: string,
	hooks?: GeneratorHooks,
	prev?: Ctx,
) {
	const first = plugins[0];

	if (first == null) {
		return;
	}

	const onSetupStart = async (plugin: GeneratorPluginV1) => {
		await hooks?.onPluginStepStart?.(plugin, 'setup');
	};

	const onGenerateStart = async (plugin: GeneratorPluginV1) => {
		await hooks?.onPluginStepStart?.(plugin, 'generate');
	};

	const onEndStart = async (plugin: GeneratorPluginV1) => {
		await hooks?.onPluginStepStart?.(plugin, 'end');
	};

	const onSetupEnd = async (plugin: GeneratorPluginV1) => {
		ctx.didSetup.push(plugin.name);
		await hooks?.onPluginStepEnd?.(plugin, 'setup');
	};

	const onGenerateEnd = async (plugin: GeneratorPluginV1) => {
		ctx.didGenerate.push(plugin.name);
		await hooks?.onPluginStepEnd?.(plugin, 'generate');
	};

	const onEndEnd = async (plugin: GeneratorPluginV1) => {
		ctx.didEnd.push(plugin.name);
		await hooks?.onPluginStepEnd?.(plugin, 'end');
	};

	try {
		await hooks?.onStart?.()?.catch(() => null);

		await startRunner(ctx, plugins, (plugin) => plugin.setup, onSetupStart, onSetupEnd);
		await startRunner(ctx, plugins, (plugin) => plugin.generate, onGenerateStart, onGenerateEnd);
		await startRunner(ctx, plugins, (plugin) => plugin.end, onEndStart, onEndEnd);

		await ctx.fileManager.writeAll();

		await cleanPreviousFiles(ctx.fileManager, stateFilename, prev?.fileManager);

		await hooks?.onEnd?.()?.catch(() => null);
	} catch (e) {
		await hooks?.onError?.(e)?.catch(() => null);
	}

	await saveState(stateFilename, ctx).catch(() => null);

	return ctx;
}
