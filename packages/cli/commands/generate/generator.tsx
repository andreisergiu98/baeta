import { randomUUID } from 'node:crypto';
import {
	type GeneratorHooks,
	generate,
	generateAndWatch,
	getGeneratorPlugins,
} from '@baeta/generator';
import { graphqlPlugin } from '@baeta/plugin-graphql';
import type { Subprocess } from 'execa';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useConfig } from '../../sdk/index.ts';
import type { TextOutput } from '../../types/text.ts';
import { flattenArrays } from '../../utils/array.ts';
import { startProcess } from '../../utils/process.ts';
import { AppStatus } from '../build/app-status.tsx';
import { type GeneratorPluginName, GeneratorStatus } from './generator-status.tsx';

export interface GeneratorProps {
	watch?: boolean;
	skipInitial?: boolean;
	run?: string;
	onSuccess?: () => void;
}

export function Generator(props: GeneratorProps) {
	const { watch, skipInitial, onSuccess } = props;
	const { config } = useConfig();
	const [running, setRunning] = useState(false);
	const [error, setError] = useState<unknown>(undefined);

	const [startedPlugins, setStartedPlugins] = useState<GeneratorPluginName[]>([]);
	const [finishedPlugins, setFinishedPlugins] = useState<GeneratorPluginName[]>([]);

	const plugins = useMemo(() => {
		const generatorPlugins = getGeneratorPlugins(flattenArrays(config.plugins ?? []));
		return [...generatorPlugins, graphqlPlugin()];
	}, [config.plugins]);

	const runRef = useRef<Subprocess | null>(null);
	const [runOutput, setRunOutput] = useState<TextOutput[]>([]);

	const runCommand = useCallback(() => {
		if (props.run == null) {
			return;
		}

		if (runRef.current && runRef.current.exitCode == null) {
			return;
		}

		runRef.current = startProcess(
			props.run,
			(data) => {
				setRunOutput((current) => [
					...current,
					{
						id: randomUUID(),
						text: data,
					},
				]);
			},
			() => {},
		);
	}, [props.run]);

	const getHooks = useCallback((): GeneratorHooks => {
		return {
			onStart: () => {
				setRunning(true);
				setStartedPlugins([]);
				setFinishedPlugins([]);
				setError(undefined);
			},
			onEnd: () => {
				setRunning(false);
				setStartedPlugins([]);
				setFinishedPlugins([]);
				onSuccess?.();
			},
			onError: (error) => {
				setRunning(false);
				setStartedPlugins([]);
				setFinishedPlugins([]);
				setError(error);
			},
			onPluginStepStart: (plugin, step) => {
				if (step === 'generate') {
					setStartedPlugins((current) => [
						...current,
						{
							id: randomUUID(),
							name: plugin.name,
							actionName: plugin.actionName,
						},
					]);
				}
			},
			onPluginStepEnd: (plugin, step) => {
				if (step === 'generate') {
					setFinishedPlugins((current) => [
						...current,
						{
							id: randomUUID(),
							name: plugin.name,
							actionName: plugin.actionName,
						},
					]);
				}
			},
		};
	}, [onSuccess]);

	useEffect(() => {
		if (!config) {
			return;
		}

		if (watch === true && skipInitial === true) {
			return;
		}

		generate(config.graphql, plugins, getHooks());
	}, [config, watch, skipInitial, plugins, getHooks]);

	useEffect(() => {
		if (watch !== true) {
			return;
		}

		if (!config) {
			return;
		}

		const instance = generateAndWatch(config.graphql, plugins, getHooks());

		return () => {
			instance.close();
		};
	}, [config, watch, plugins, getHooks]);

	return (
		<>
			<GeneratorStatus
				error={error}
				running={running}
				watching={props.watch}
				startedPlugins={startedPlugins}
				finishedPlugins={finishedPlugins}
			/>
			{props.run && <AppStatus output={runOutput} />}
		</>
	);
}
