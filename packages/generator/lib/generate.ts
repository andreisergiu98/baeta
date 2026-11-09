import {
	type Ctx,
	type GeneratorOptions,
	type GeneratorPluginV1Fn,
	type GeneratorPluginV1WithId,
	type GeneratorStep,
	loadOptions,
	type PluginStepState,
	Watcher,
	type WatcherFile,
} from '@baeta/generator-sdk';
import { createCtx } from './ctx.ts';
import {
	flush,
	getGeneratedFiles,
	getStaleFiles,
	mergeGeneratedFiles,
	unlinkStaleFiles,
} from './file-utils.ts';
import { startRunner } from './runner.ts';
import { type GeneratedFiles, getStateFilename, readState, writeState } from './state.ts';

export interface GeneratorHooks {
	onStart?: () => void | Promise<void>;
	onEnd?: () => void | Promise<void>;
	onError?: (error: unknown) => void | Promise<void>;
	onPluginStepStart?: (
		plugin: GeneratorPluginV1WithId,
		step: GeneratorStep,
		state: Extract<PluginStepState, { status: 'started' }>,
	) => void | Promise<void>;
	onPluginStepEnd?: (
		plugin: GeneratorPluginV1WithId,
		step: GeneratorStep,
		state: Extract<PluginStepState, { status: 'finished' }>,
	) => void | Promise<void>;
}

export async function generate(
	options: GeneratorOptions,
	plugins: GeneratorPluginV1WithId[],
	hooks?: GeneratorHooks,
) {
	const generatorOptions = loadOptions(options);
	const stateFilename = getStateFilename(generatorOptions.cacheDir);
	const ctx = createCtx({ generatorOptions, plugins });
	await executeGenerator(ctx, plugins, stateFilename, hooks);
}

export async function generateAndWatch(
	options: GeneratorOptions,
	plugins: GeneratorPluginV1WithId[],
	hooks?: GeneratorHooks,
) {
	let isClosed = false;
	let previous: GeneratedFiles | undefined;
	let pendingRun: Promise<GeneratedFiles> | undefined;
	let shouldReload = false;
	let changedFiles: WatcherFile[] = [];

	const generatorOptions = loadOptions(options);
	const stateFilename = getStateFilename(generatorOptions.cacheDir);
	const watcher = new Watcher(generatorOptions.cwd, {
		onClose: async () => {
			isClosed = true;
			await pendingRun;
		},
	});

	const reload = (file?: WatcherFile) => {
		if (file) {
			changedFiles.push(file);
		}

		if (pendingRun) {
			shouldReload = true;
			return;
		}

		const ctx = createCtx({
			generatorOptions,
			plugins,
			watching: true,
			changedFiles: changedFiles,
		});
		shouldReload = false;
		changedFiles = [];

		const finishRun = (generated: GeneratedFiles) => {
			previous = generated;
			pendingRun = undefined;
			if (shouldReload && !isClosed) reload();
		};

		pendingRun = executeGenerator(ctx, plugins, stateFilename, hooks, previous);
		pendingRun.then(finishRun).catch(() => {});
	};

	for (const plugin of plugins) {
		plugin.watch(generatorOptions, watcher, reload);
	}

	reload();

	return watcher;
}

async function executeGenerator(
	ctx: Ctx,
	plugins: GeneratorPluginV1WithId[],
	stateFilename: string,
	hooks?: GeneratorHooks,
	previous?: GeneratedFiles,
) {
	const previousFiles = previous ?? (await readState(stateFilename));

	const notifyError = async (err: unknown) => {
		if (hooks?.onError == null) {
			return console.error('Generation failed.', err);
		}
		try {
			await hooks.onError(err);
		} catch (err) {
			console.error('Error in onError hook:', err);
		}
	};

	try {
		if (plugins.length === 0) {
			throw new Error('No generator plugins provided');
		}

		const stepFns = [
			createPluginStepFns(ctx, hooks, 'setup'),
			createPluginStepFns(ctx, hooks, 'generate'),
			createPluginStepFns(ctx, hooks, 'end'),
		];

		await hooks?.onStart?.();
		for (const { run, onStart, onEnd } of stepFns) {
			await startRunner(ctx, plugins, run, onStart, onEnd);
			await flush(ctx.fileManager);
		}

		const currentFiles = getGeneratedFiles(ctx.generatorOptions.cwd, ctx.fileManager);
		const staleFiles = getStaleFiles(previousFiles, currentFiles);
		await unlinkStaleFiles(ctx.generatorOptions.cwd, staleFiles);
		await writeState(stateFilename, currentFiles);

		await hooks?.onEnd?.();
		return currentFiles;
	} catch (err) {
		const currentFiles = getGeneratedFiles(ctx.generatorOptions.cwd, ctx.fileManager, {
			failedRun: true,
		});
		const mergedFiles = mergeGeneratedFiles(previousFiles, currentFiles);
		await writeState(stateFilename, mergedFiles);

		await notifyError(err);
		return mergedFiles;
	}
}

function createPluginStepFns(
	ctx: Ctx,
	hooks: GeneratorHooks | undefined,
	step: GeneratorStep,
): {
	run: (plugin: GeneratorPluginV1WithId) => GeneratorPluginV1Fn;
	onStart: (plugin: GeneratorPluginV1WithId) => Promise<void>;
	onEnd: (plugin: GeneratorPluginV1WithId) => Promise<void>;
} {
	return {
		run: (plugin: GeneratorPluginV1WithId) => {
			return plugin[step];
		},
		onStart: async (plugin: GeneratorPluginV1WithId) => {
			const pluginState = ctx.pluginStates.get(plugin.id);
			if (!pluginState) {
				throw new PluginStepError(plugin, step, `Plugin state not found for plugin ${plugin.name}`);
			}
			if (pluginState[step].status !== 'pending') {
				throw new PluginStepError(
					plugin,
					step,
					`Plugin step ${step} for plugin ${plugin.name} is not pending`,
				);
			}
			const nextState = { status: 'started' as const, startedAt: performance.now() };
			pluginState[step] = nextState;
			await hooks?.onPluginStepStart?.(plugin, step, nextState);
		},
		onEnd: async (plugin: GeneratorPluginV1WithId) => {
			const pluginState = ctx.pluginStates.get(plugin.id);
			if (!pluginState) {
				throw new PluginStepError(plugin, step, `Plugin state not found for plugin ${plugin.name}`);
			}
			if (pluginState[step].status !== 'started') {
				throw new PluginStepError(
					plugin,
					step,
					`Plugin step ${step} for plugin ${plugin.name} is not started`,
				);
			}
			const nextPlugin = ctx.plugins[ctx.plugins.indexOf(plugin) + 1];
			if (nextPlugin && ctx.pluginStates.get(nextPlugin.id)?.[step].status === 'pending') {
				throw new PluginStepError(
					plugin,
					step,
					`next() was not called, so ${nextPlugin.name} and the plugins after it did not run`,
				);
			}
			const nextState = {
				status: 'finished' as const,
				startedAt: pluginState[step].startedAt,
				finishedAt: performance.now(),
			};
			pluginState[step] = nextState;
			await hooks?.onPluginStepEnd?.(plugin, step, nextState);
		},
	};
}

class PluginStepError extends Error {
	id: symbol;
	constructor(plugin: GeneratorPluginV1WithId, step: GeneratorStep, message: string) {
		super(`Plugin step error for plugin ${plugin.name} at step ${step}: ${message}`);
		this.id = plugin.id;
	}
}
