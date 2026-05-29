import { execaCommand, parseCommandString } from 'execa';

export type PtyProcess = {
	didExit: boolean;
	write: (data: string) => void;
	exit: () => Promise<void>;
};

export interface StartProcessOptions {
	command: string;
	onData: (data: string, clear: boolean) => void;
	onExit?: () => void;
	isTTY: boolean;
}

const EXIT_TIMEOUT = 5_000;

export async function startProcess(options: StartProcessOptions): Promise<PtyProcess> {
	if (options.isTTY) {
		return await startProcessWithPty(options);
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
		exit: async () => {
			if (didExit) return;
			return await new Promise((resolve) => {
				subprocess.on('exit', resolve);
				setTimeout(resolve, EXIT_TIMEOUT);
				subprocess.kill('SIGTERM');
			});
		},
	};
}

async function startProcessWithPty({
	command,
	onData,
	onExit,
}: StartProcessOptions): Promise<PtyProcess> {
	const { spawn } = await import('node-pty');

	const [file, ...args] = parseCommandString(command);

	const cols = process.stdout.columns;
	const rows = process.stdout.rows;

	const ptyProc = spawn(file, args, {
		cwd: process.cwd(),
		env: process.env,
		cols: cols,
		rows: rows,
	});

	const onResize = () => {
		ptyProc.resize(process.stdout.columns, process.stdout.rows);
	};
	process.stdout.on('resize', onResize);

	ptyProc.onData((data) => {
		const { cleaned, cleared } = stripClearControls(data);
		onData(cleaned, cleared);
	});

	let didExit = false;

	ptyProc.onExit(() => {
		didExit = true;
		process.stdout.removeListener('resize', onResize);
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
		exit: async () => {
			if (didExit) return;
			ptyProc.kill('SIGTERM');
			return await new Promise((resolve) => {
				ptyProc.onExit(() => resolve());
				setTimeout(resolve, EXIT_TIMEOUT);
			});
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
