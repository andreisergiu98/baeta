import type { CliGenerator, GeneratorEvents } from '@baeta/cli-sdk';
import { generate, generateAndWatch, getGeneratorPlugins, type Watcher } from '@baeta/generator';
import { graphqlPlugin } from '@baeta/plugin-graphql';
import { flattenArrays } from '../utils/array.ts';
import {
	type ConfigResult,
	type LoadedBaetaConfig,
	getLoadedConfig,
	loadConfig,
} from './config-loader.ts';
import { watchConfig } from './config-watcher.ts';

export function createGenerator(config: ConfigResult): CliGenerator {
	return {
		generate: async (events) => {
			const loaded = getLoadedConfig(config);
			await generate(loaded.config.graphql, getPlugins(loaded), events);
		},
		watch: async (events) => await watch(getLoadedConfig(config), events),
	};
}

async function watch(config: LoadedBaetaConfig, events?: GeneratorEvents) {
	let generatorWatcher: Watcher | undefined = await generateAndWatch(
		config.config.graphql,
		getPlugins(config),
		events,
	);
	let isClosing = false;
	let shouldReload = false;
	let pendingReload: Promise<void> | undefined;
	let configCacheIndex = 0;
	const run = async () => {
		try {
			configCacheIndex++;
			const result = await loadConfig(undefined, configCacheIndex);
			if (isClosing) return;
			if (!result.ok) {
				events?.onConfigError?.(result.error);
				return;
			}

			events?.onConfigChange?.();

			const previous = generatorWatcher;
			generatorWatcher = undefined;
			await previous?.close();
			if (isClosing) return;

			generatorWatcher = await generateAndWatch(result.config.graphql, getPlugins(result), events);
			if (isClosing) return;
		} catch (err) {
			events?.onError?.(err);
		} finally {
			pendingReload = undefined;
			if (shouldReload && !isClosing) {
				shouldReload = false;
				pendingReload = run();
			}
		}
	};

	const reload = () => {
		if (isClosing) return;
		if (pendingReload) {
			shouldReload = true;
		} else {
			pendingReload = run();
		}
	};

	const configWatcher = watchConfig(reload);

	return async () => {
		isClosing = true;
		await configWatcher.close();
		await pendingReload;
		await generatorWatcher?.close();
	};
}

function getPlugins(config: LoadedBaetaConfig) {
	return [...getGeneratorPlugins(flattenArrays(config.config.plugins ?? [])), graphqlPlugin()].map(
		(plugin) => ({
			...plugin,
			id: Symbol(plugin.name),
		}),
	);
}
