import { styleText } from 'node:util';
import { useStdin, useStdout } from 'ink';
import { useCallback, useRef } from 'react';
import { type PtyProcess, startProcess } from '../utils/process.ts';

export function useRunCommand(command?: string) {
	const runRef = useRef<PtyProcess | null>(null);
	const handleInputRef = useRef<(data: string) => void>(() => {});

	const { stdin } = useStdin();
	const { stdout, write } = useStdout();

	const runCommand = useCallback(() => {
		if (command == null) {
			return null;
		}

		if (runRef.current && !runRef.current.didExit) {
			return runRef.current;
		}

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

		const handleInput = (data: string) => {
			proc.write(data);
		};

		stdin.removeListener('data', handleInputRef.current);
		handleInputRef.current = handleInput;
		stdin.addListener('data', handleInput);

		writeHeader();
		const proc = startProcess({
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

		runRef.current = proc;

		return proc;
	}, [command, stdin, stdout, write]);

	return runCommand;
}
