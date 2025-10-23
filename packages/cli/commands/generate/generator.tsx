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
	const hasGeneratedRef = useRef(false);

	const [startedPlugins, setStartedPlugins] = useState<GeneratorPluginName[]>([]);
	const [finishedPlugins, setFinishedPlugins] = useState<GeneratorPluginName[]>([]);

	const plugins = useMemo(() => {
		const generatorPlugins = getGeneratorPlugins(flattenArrays(config.plugins ?? []));
		return [...generatorPlugins, graphqlPlugin()];
	}, [config.plugins]);

	const runRef = useRef<PtyProcess | null>(null);
	const [runOutput, setRunOutput] = useState<string>('');

	useEffect(() => {
		if (!process.stdin.isTTY) return;

		process.stdin.setRawMode(true);
		process.stdin.resume();
		process.stdin.setEncoding('utf8');

		const handleData = (data: Buffer<ArrayBuffer> | string) => {
			const value = data.toString();
			if (value === '\u0003') {
				process.exit();
			}
			runRef.current?.write(value);
		};

		process.stdin.on('data', handleData);

		return () => {
			process.stdin.off('data', handleData);
			if (process.stdin.isTTY) process.stdin.setRawMode(false);

			process.stdin.pause();
		};
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
				hasGeneratedRef.current = true;
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

	useEffect(() => {
		if (hasGeneratedRef.current && !running && !watch && !props.run) process.exit(0);
	}, [running, watch, props.run]);

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
