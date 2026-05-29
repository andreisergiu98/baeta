import { styleText } from 'node:util';
import { useStdin, useStdout } from 'ink';
import { useCallback, useRef } from 'react';
import { type PtyProcess, startProcess } from '../utils/process.ts';
import { makeErrorMessage } from './errors.tsx';

type CurrentCommandRef = {
	promise: Promise<PtyProcess | null>;
	command: string;
};

export function useRunCommand(command?: string) {
	const currentRef = useRef<CurrentCommandRef>(null);

	const { stdin } = useStdin();
	const { stdout, write } = useStdout();

	const startCommand = useCallback(
		async (command: string, previousRun: CurrentCommandRef | null) => {
			const isTTY = stdin.isTTY && stdout.isTTY;
			const header = isTTY ? styleText(['blue', 'bold'], 'App') : 'App';
			const toStdout = isTTY ? write : stdout.write.bind(stdout);

			const writeHeader = () => {
				toStdout(`${header}\n`);
			};

			const clearScreen = () => {
				if (!isTTY) return;
				toStdout('\x1b[2J\x1b[H');
			};

			try {
				if (previousRun) {
					const proc = await previousRun.promise;
					if (proc && !proc.didExit) {
						if (previousRun.command === command) {
							return proc;
						}
						await proc.exit();
					}
				}

				const handleInput = (data: string) => {
					proc.write(data);
				};

				writeHeader();
				const proc = await startProcess({
					command,
					isTTY,
					onData: (data, clear) => {
						if (clear) {
							clearScreen();
							writeHeader();
						}
						toStdout(data);
					},
					onExit: () => {
						stdin.removeListener('data', handleInput);
					},
				});

				stdin.addListener('data', handleInput);

				return proc;
			} catch (err) {
				toStdout(`${makeErrorMessage((err as Error).message)}\n`);
				return null;
			}
		},
		[stdin, stdout, write],
	);

	const runCommand = useCallback(() => {
		if (command == null) {
			return null;
		}
		const previousState = currentRef.current;
		currentRef.current = {
			promise: startCommand(command, previousState),
			command,
		};
	}, [command, startCommand]);

	return runCommand;
}
