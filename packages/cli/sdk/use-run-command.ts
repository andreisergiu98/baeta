import style from 'ansi-styles';
import { useStdin, useStdout } from 'ink';
import { useCallback, useEffect, useRef } from 'react';
import { type PtyProcess, startProcessWithPty } from '../utils/process.ts';

export function useRunCommand(command?: string) {
	const runRef = useRef<PtyProcess | null>(null);

	const { stdin, isRawModeSupported, setRawMode } = useStdin();
	const { write } = useStdout();

	useEffect(() => {
		if (command == null || !stdin.isTTY) {
			return;
		}
		const handleData = (data: string) => {
			runRef.current?.write(data);
		};
		stdin.unref();
		if (isRawModeSupported) {
			setRawMode(true);
		}
		stdin.addListener('data', handleData);
		return () => {
			setRawMode(false);
			stdin.removeListener('data', handleData);
		};
	}, [stdin, command, isRawModeSupported, setRawMode]);

	const runCommand = useCallback(() => {
		if (command == null || (runRef.current && !runRef.current.didExit)) {
			return;
		}

		const clearScreen = () => {
			write('\x1b[2J\x1b[H');
		};
		const writeHeader = () => {
			write(`${style.blue.open}${style.bold.open}App${style.bold.close}${style.blue.close}\n`);
		};

		writeHeader();

		const proc = startProcessWithPty(command, (data, clear) => {
			if (!clear) {
				return write(data);
			}
			clearScreen();
			writeHeader();
			write(data);
		});

		runRef.current = proc;

		return proc;
	}, [command, write]);

	return runCommand;
}
