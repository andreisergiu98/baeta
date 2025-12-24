import { execaCommand, parseCommandString } from 'execa';
import pty from 'node-pty';

export type PtyProcess = {
	didExit: boolean;
	write: (data: string) => void;
	exit: () => void;
};

export interface StartProcessOptions {
	command: string;
	onData: (data: string, clear: boolean) => void;
	onExit?: () => void;
	isTTY: boolean;
}

export function startProcess(options: StartProcessOptions): PtyProcess {
	if (options.isTTY) {
		return startProcessWithPty(options);
	}
	return startProcessWithExeca(options);
}

function startProcessWithExeca({ command, onData, onExit }: StartProcessOptions): PtyProcess {
	const outputStream = new WritableStream<string | Buffer>({
		write(chunk) {
			const str = typeof chunk === 'string' ? chunk : chunk.toString('utf-8');
			const { cleaned, cleared } = stripClearControls(str);
			onData(cleaned, cleared);
		},
	});

	let inputController: ReadableStreamDefaultController<string> | null = null;

	const inputStream = new ReadableStream<string>({
		start(controller) {
			inputController = controller;
		},
		cancel() {
			inputController = null;
		},
	});

	const subprocess = execaCommand(command, {
		stdin: inputStream,
		stdout: outputStream,
		stderr: outputStream,
		cwd: process.cwd(),
		env: process.env,
	});

	let didExit = false;

	subprocess.on('exit', () => {
		didExit = true;
		onExit?.();
	});

	return {
		get didExit() {
			return didExit;
		},
		write: (data: string) => {
			if (didExit) return;
			inputController?.enqueue(data);
		},
		exit: () => {
			if (didExit) return;
			subprocess.kill('SIGTERM');
		},
	};
}

function startProcessWithPty({ command, onData, onExit }: StartProcessOptions): PtyProcess {
	const [file, ...args] = parseCommandString(command);

	const cols = process.stdout.columns;
	const rows = process.stdout.rows;

	const ptyProc = pty.spawn(file, args, {
		cwd: process.cwd(),
		env: process.env,
		cols: cols,
		rows: rows,
	});

	process.stdout.on('resize', () => {
		const cols = process.stdout.columns;
		const rows = process.stdout.rows;
		ptyProc.resize(cols, rows);
	});

	ptyProc.onData((data) => {
		const { cleaned, cleared } = stripClearControls(data);
		onData(cleaned, cleared);
	});

	let didExit = false;

	ptyProc.onExit(() => {
		didExit = true;
		onExit?.();
	});

	return {
		get didExit() {
			return didExit;
		},
		write: (data: string) => {
			if (didExit) return;
			ptyProc.write(data);
		},
		exit: () => {
			if (didExit) return;
			ptyProc.kill('SIGTERM');
		},
	};
}

const CLEAR_CODES = [
	'\x1bc', // RIS
	'\x1b[0J',
	'\x1b[1J',
	'\x1b[2J',
	'\x1b[3J', // erase in display
	'\x1b[0K',
	'\x1b[1K',
	'\x1b[2K', // erase in line
	'\x1b[H',
	'\x1b[?1049h',
	'\x1b[?1049l',
	'\x1b[?47h',
	'\x1b[?47l',
	'\x1b[?1047h',
	'\x1b[?1047l',
	'\x0c', // form feed (^L)
];

function stripClearControls(data: string): {
	cleared: boolean;
	cleaned: string;
} {
	let cleared = false;
	let result = '';
	let i = 0;

	while (i < data.length) {
		if (data[i] === '\x1b' || data[i] === '\x0c') {
			const found = CLEAR_CODES.find((seq) => data.startsWith(seq, i));
			if (found) {
				cleared = true;
				i += found.length;
				continue;
			}
		}
		result += data[i++];
	}

	return { cleared, cleaned: result };
}
