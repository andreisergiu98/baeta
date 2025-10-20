import { randomUUID } from 'node:crypto';
import {
	type GeneratorHooks,
	generate,
	generateAndWatch,
	getGeneratorPlugins,
} from '@baeta/generator';
import { graphqlPlugin } from '@baeta/plugin-graphql';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { makeErrorMessage, useConfig } from '../../sdk/index.ts';
import { flattenArrays } from '../../utils/array.ts';
import { type PtyProcess, startProcessWithPty } from '../../utils/process.ts';
import { AppStatus } from './app-status.tsx';
import { type GeneratorPluginName, GeneratorStatus } from './generator-status.tsx';

export interface GeneratorProps {
	watch?: boolean;
	skipInitial?: boolean;
	run?: string;
}

export function Generator(props: GeneratorProps) {
	const { watch, skipInitial } = props;
	const { config } = useConfig();
	const [running, setRunning] = useState(false);
	const [error, setError] = useState<unknown>(undefined);

	const [startedPlugins, setStartedPlugins] = useState<GeneratorPluginName[]>([]);
	const [finishedPlugins, setFinishedPlugins] = useState<GeneratorPluginName[]>([]);

	const plugins = useMemo(() => {
		const generatorPlugins = getGeneratorPlugins(flattenArrays(config.plugins ?? []));
		return [...generatorPlugins, graphqlPlugin()];
	}, [config.plugins]);

	const runRef = useRef<PtyProcess | null>(null);
	const [runOutput, setRunOutput] = useState<string>('');

	useEffect(() => {
		process.stdin.setRawMode(true);
		process.stdin.resume();
		process.stdin.setEncoding('utf8');
		process.stdin.on('data', (data) => {
			const value = data.toString();
			if (value === '\u0003') {
				process.exit();
			}
			runRef.current?.write(value);
		});
	}, []);

	const runCommand = useCallback(() => {
		if (props.run == null) {
			return;
		}

		if (runRef.current && !runRef.current.didExit) {
			return;
		}

		const proc = startProcessWithPty(props.run, (data) => {
			setRunOutput(data);
		});

		runRef.current = proc;
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
				runCommand();
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
	}, [runCommand]);

	useEffect(() => {
		if (!config || (watch === true && skipInitial === true)) {
			return;
		}

		generate(config.graphql, plugins, getHooks()).catch((error) => {
			console.log(makeErrorMessage(error.message));
			process.exit(1);
		});
	}, [config, watch, skipInitial, plugins, getHooks]);

	useEffect(() => {
		if (!config || watch !== true) {
			return;
		}

		const instance = generateAndWatch(config.graphql, plugins, getHooks());

		return () => {
			instance.close();
		};
	}, [config, watch, plugins, getHooks]);

	return (
		<>
			{props.run && <AppStatus>{runOutput}</AppStatus>}
			<GeneratorStatus
				error={error}
				running={running}
				watching={props.watch}
				startedPlugins={startedPlugins}
				finishedPlugins={finishedPlugins}
			/>
		</>
	);
}
