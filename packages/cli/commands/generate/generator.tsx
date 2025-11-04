import { randomUUID } from 'node:crypto';
import {
	type GeneratorHooks,
	generate,
	generateAndWatch,
	getGeneratorPlugins,
} from '@baeta/generator';
import { graphqlPlugin } from '@baeta/plugin-graphql';
import { useEffect, useMemo, useState } from 'react';
import { makeErrorMessage, useConfig, useRunCommand } from '../../sdk/index.ts';
import { flattenArrays } from '../../utils/array.ts';
import { runAsync } from '../../utils/promise.ts';
import { type GeneratorPluginName, GeneratorStatus } from './generator-status.tsx';

export interface GeneratorProps {
	watch?: boolean;
	run?: string;
}

export function Generator(props: Readonly<GeneratorProps>) {
	const { config } = useConfig();

	const runCommand = useRunCommand(props.run);

	const { running, error, startedPlugins, finishedPlugins, generatorHooks } =
		useGeneratorHooks(runCommand);

	const plugins = useMemo(() => {
		const generatorPlugins = getGeneratorPlugins(flattenArrays(config.plugins ?? []));
		return [...generatorPlugins, graphqlPlugin()];
	}, [config.plugins]);

	useEffect(() => {
		if (!config) {
			return;
		}

		let closeWatcher: () => void = () => {};

		const cancel = runAsync(
			async (isCancelled) => {
				if (props.watch !== true) {
					return await generate(config.graphql, plugins, generatorHooks);
				}
				const watcher = await generateAndWatch(config.graphql, plugins, generatorHooks);
				if (isCancelled()) watcher.close();
				closeWatcher = () => watcher.close();
			},
			(error) => {
				console.log(makeErrorMessage((error as Error).message));
				process.exit(1);
			},
		);

		return () => {
			cancel();
			closeWatcher();
		};
	}, [props.watch, config, plugins, generatorHooks]);

	return (
		<GeneratorStatus
			error={error}
			running={running}
			watching={props.watch}
			startedPlugins={startedPlugins}
			finishedPlugins={finishedPlugins}
		/>
	);
}

const emptyPlugins: GeneratorPluginName[] = [];

function useGeneratorHooks(onEnd?: () => void) {
	const [running, setRunning] = useState(false);
	const [error, setError] = useState<unknown>(undefined);

	const [startedPlugins, setStartedPlugins] = useState<GeneratorPluginName[]>(emptyPlugins);
	const [finishedPlugins, setFinishedPlugins] = useState<GeneratorPluginName[]>(emptyPlugins);

	const generatorHooks = useMemo(
		(): GeneratorHooks => ({
			onStart: () => {
				setRunning(true);
				setStartedPlugins(emptyPlugins);
				setFinishedPlugins(emptyPlugins);
				setError(undefined);
			},
			onEnd: () => {
				setRunning(false);
				setStartedPlugins(emptyPlugins);
				setFinishedPlugins(emptyPlugins);
				onEnd?.();
			},
			onError: (error) => {
				setRunning(false);
				setStartedPlugins(emptyPlugins);
				setFinishedPlugins(emptyPlugins);
				setError(error);
			},
			onPluginStepStart: (plugin, step) => {
				if (step !== 'generate') {
					return;
				}
				setStartedPlugins((current) => [
					...current,
					{
						id: randomUUID(),
						name: plugin.name,
						actionName: plugin.actionName,
					},
				]);
			},
			onPluginStepEnd: (plugin, step) => {
				if (step !== 'generate') {
					return;
				}
				setFinishedPlugins((current) => [
					...current,
					{
						id: randomUUID(),
						name: plugin.name,
						actionName: plugin.actionName,
					},
				]);
			},
		}),
		[onEnd],
	);

	return {
		running,
		error,
		startedPlugins,
		finishedPlugins,
		generatorHooks,
	};
}
