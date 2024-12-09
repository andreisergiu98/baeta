import { Writable } from 'node:stream';
import { type Subprocess, execa, parseCommandString } from 'execa';
import pty from 'node-pty';
import kill from 'tree-kill';

export async function killProcesses(processes: Subprocess[]) {
	await Promise.all(processes.map((process) => killProcess(process)));
	processes.splice(0, processes.length);
}

export async function killProcess(process: Subprocess) {
	return new Promise<void>((resolve) => {
		if (process.pid == null) {
			return resolve();
		}
		kill(process.pid, 'SIGKILL', () => resolve());
	});
}

export function addProcess(
	processes: Subprocess[],
	command: string,
	stdout: (data: string) => void,
	onError: (err: unknown) => void,
) {
	const [file, ...args] = parseCommandString(command);

	const child = execa(file, args, {
		stdout: 'pipe',
		stderr: 'pipe',
		stripFinalNewline: true,
	});

	const stream = createStream(stdout);
	child.stdout?.pipe(stream);
	child.stderr?.pipe(stream);

	child.catch((err) => {
		onError?.(err);
	});

	processes.push(child);
}

export function startProcess(
	command: string,
	stdout: (data: string) => void,
	onError: (err: unknown) => void,
) {
	const [file, ...args] = parseCommandString(command);

	const child = execa(file, args, {
		stdout: 'pipe',
		stderr: 'pipe',
		stripFinalNewline: true,
	});

	const stream = createStream(stdout);
	child.stdout?.pipe(stream);
	child.stderr?.pipe(stream);

	child.catch((err) => {
		onError?.(err);
	});

	return child;
}

export type PtyProcess = ReturnType<typeof startProcessWithPty>;

export function startProcessWithPty(
	command: string,
	stdout: (data: string, clear: boolean) => void,
	onError: (err: unknown) => void,
) {
	const [file, ...args] = parseCommandString(command);

	const ptyProc = pty.spawn(file, args, {
		cwd: process.cwd(),
		env: process.env,
		cols: process.stdout.columns,
		rows: process.stdout.rows,
	});

	process.stdout.on('resize', () => {
		ptyProc.resize(process.stdout.columns, process.stdout.rows);
	});

	let buffer = '';
	ptyProc.onData((data) => {
		buffer += data;

		if (containsClearSequence(data)) {
			buffer = removeClearSequence(data);
		}

		stdout(buffer, true);
	});

	const procData = {
		didExit: false,
		write: (data: string) => {
			ptyProc.write(data);
		},
	};

	ptyProc.onExit(() => {
		procData.didExit = true;
	});

	return procData;
}

function createStream(onData: (data: string) => void) {
	const stream = new Writable({
		write(chunk, encoding, next) {
			onData(chunk.toString());
			next();
		},
	});
	return stream;
}

const CLEAR_SEQUENCES = [
	'\x1bc', // Full reset (RIS)
	'\x1b[H\x1b[2J', // Clear screen and move to home
	'\x1b[2J', // Clear entire screen
	'\x1b[3J', // Clear screen and scrollback buffer
	'\x1b[H\x1b[J', // Alternative clear sequence
	'\x1b[0f\x1b[J', // Another variant
	'\x1b[2K', // Clear current line
	'\x1b[H', // Move to home position
	'\r\x1b[K', // Carriage return + clear line
];

function containsClearSequence(data: string) {
	return CLEAR_SEQUENCES.some((seq) => data.includes(seq));
}

function removeClearSequence(data: string) {
	return CLEAR_SEQUENCES.reduce((acc, seq) => acc.replace(seq, ''), data);
}
