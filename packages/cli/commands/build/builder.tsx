import { randomUUID } from 'node:crypto';
import type { CompilerOptions } from '@baeta/compiler';
import type { BuildContext } from '@baeta/compiler/esbuild';
import type { Subprocess } from 'execa';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { makeErrorMessage, makeErrorOutput, useConfig } from '../../sdk/index.ts';
import type { TextOutput } from '../../types/text.ts';
import { dynamicImportCompiler } from '../../utils/compiler.ts';
import { WithGenerator } from '../generate/with-generator.tsx';
import { AppStatus } from './app-status.tsx';
import { killProcesses, startProcess } from './builder-plugin.ts';
import { BuilderStatus } from './builder-status.tsx';

interface Props {
	watch?: boolean;
	generate?: boolean;
	onSuccess?: string;
	onError?: string;
	hideWarnings?: boolean;
}

const emptyArray: TextOutput[] = [];

export function Builder(props: Props) {
	const { config, relativeLocation } = useConfig();
	const [isConfigured, setIsConfigured] = useState(() => config.compiler != null);

	const [output, setOutput] = useState<TextOutput[]>([]);
	const [errors, setErrors] = useState<TextOutput[]>([]);
	const [warnings, setWarnings] = useState<TextOutput[]>([]);

	const [running, setRunning] = useState(false);
	const [buildTime, setBuildTime] = useState(0);

	const processesRef = useRef<Subprocess[]>([]);

	const killHanging = useCallback(() => {
		return killProcesses(processesRef.current);
	}, []);

	const handleCommand = useCallback(
		async (command?: string) => {
			await killHanging();

			if (!command) {
				return;
			}

			return startProcess(
				processesRef.current,
				command,
				(output) => {
					setOutput((current) => [
						...current,
						{
							id: randomUUID(),
							text: output,
						},
					]);
				},
				() => {},
			);
		},
		[killHanging],
	);

	const handleStart = useCallback(async () => {
		await killHanging();

		setRunning(true);
		setOutput(emptyArray);
		setWarnings(emptyArray);
		setErrors(emptyArray);
	}, [killHanging]);

	const handleEnd = useCallback(
		(buildTime: number, warnings: string[], errors: string[]) => {
			setRunning(false);
			setBuildTime(buildTime);

			const tickId = randomUUID();

			const warningOutputs = warnings.map((warning, idx) => ({
				id: tickId + idx,
				text: warning,
			}));

			const errorOutputs = errors.map((error, idx) => ({
				id: tickId + idx,
				text: error,
			}));

			setWarnings(warningOutputs);
			setErrors(errorOutputs);

			if (errors.length > 0) {
				return handleCommand(props.onError);
			}

			return handleCommand(props.onSuccess);
		},
		[props.onSuccess, props.onError, handleCommand],
	);

	const compile = useCallback(
		async (
			{ build, buildAndWatch, createEsbuildCliHooksPlugin }: typeof import('@baeta/compiler'),
			config: CompilerOptions,
		) => {
			const configPlugins = config.esbuild?.plugins ?? [];

			const plugins = [
				createEsbuildCliHooksPlugin({
					onBuildStart: handleStart,
					onBuildEnd: handleEnd,
				}),
				...configPlugins,
			];

			const options = {
				...config,
				esbuild: {
					...config.esbuild,
					plugins,
				},
			};

			if (!props.watch) {
				return build(options).catch((err) => {
					console.log(err);
					process.exit(1);
				});
			}

			return buildAndWatch(options).catch((err) => {
				console.log(err);
				process.exit(1);
			});
		},
		[
			props.watch,
			// props.onSuccess, props.onError,
			handleStart,
			handleEnd,
		],
	);

	useEffect(() => {
		let ctx: BuildContext | undefined;
		let stopped = false;

		const run = async () => {
			setIsConfigured(config.compiler != null);

			if (config.compiler == null) {
				return;
			}

			const compiler = await dynamicImportCompiler().catch(() => null);

			if (compiler == null) {
				console.log(makeErrorMessage("@baeta/compiler is required for 'build' command`", true));
				process.exit(1);
			}

			ctx = (await compile(compiler, config.compiler)) ?? undefined;

			if (stopped) {
				ctx?.dispose();
			}
		};

		run();

		return () => {
			stopped = true;
			ctx?.dispose();
		};
	}, [config, compile]);

	useEffect(() => {
		const listener = async () => {
			await killHanging();
			process.exit();
		};

		process.on('exit', listener);
		process.on('SIGINT', listener);
		process.on('SIGUSR1', listener);
		process.on('SIGUSR2', listener);
		process.on('SIGINT', listener);
		process.on('uncaughtException', listener);

		return () => {
			process.off('exit', listener);
			process.off('SIGINT', listener);
			process.off('SIGUSR1', listener);
			process.off('SIGUSR2', listener);
			process.off('SIGINT', listener);
			process.off('uncaughtException', listener);
		};
	}, [killHanging]);

	return (
		<>
			{isConfigured && (
				<BuilderStatus
					running={running}
					watching={props.watch}
					errors={errors}
					warnings={warnings}
					buildTime={buildTime}
				/>
			)}
			{!isConfigured && (
				<BuilderStatus
					running={running}
					watching={props.watch}
					errors={[
						makeErrorOutput(
							'config-error',
							`compiler is not configured, check ${relativeLocation}`,
						),
					]}
					warnings={emptyArray}
					buildTime={buildTime}
				/>
			)}
			{isConfigured && errors.length === 0 && !!props.onSuccess && <AppStatus output={output} />}
		</>
	);
}

export function BuilderWithGenerator(props: Props) {
	return (
		<WithGenerator watch={props.watch} skipInitial={false}>
			<Builder {...props} />
		</WithGenerator>
	);
}
