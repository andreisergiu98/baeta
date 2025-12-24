import style from 'ansi-styles';
import { useStdin, useStdout } from 'ink';
import { useCallback, useRef } from 'react';
import { type PtyProcess, startProcess } from '../utils/process.ts';

export function useRunCommand(command?: string) {
	const runRef = useRef<PtyProcess | null>(null);

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
		const headerPrefix = isTTY ? `${style.blue.open}${style.bold.open}` : '';
		const headerSuffix = isTTY ? `${style.bold.close}${style.blue.close}\n` : '\n';
		const toStdout = isTTY ? write : stdout.write.bind(stdout);

		const writeHeader = () => {
			toStdout(`${headerPrefix}App${headerSuffix}`);
		};

		const clearScreen = () => {
			if (!isTTY) return;
			toStdout('\x1b[2J\x1b[H');
		};

		const handleInput = (data: string) => {
			proc.write(data);
		};

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
