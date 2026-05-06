import { stat, unlink } from 'node:fs/promises';
import test from '@baeta/testing';
import { execa, type ResultPromise as Proc } from 'execa';
import pty from 'node-pty';
import { resolve } from 'pathe';

const cwd = resolve(import.meta.dirname, '.');

const procEnv = {
	...process.env,
	CI: 'false',
};

const isWindows = process.platform === 'win32';
const SIGTERM_EXIT = isWindows ? 1 : 143;
const SIGINT_EXIT = isWindows ? 1 : 130;
const ECHO_MARKER = '__e2e_run_arg__';
const ECHO_CMD = isWindows ? `cmd /c echo ${ECHO_MARKER}` : `echo ${ECHO_MARKER}`;

async function fileExists(path: string): Promise<boolean> {
	const stats = await stat(path).catch(() => null);
	return stats?.isFile() ?? false;
}

async function waitForFile(path: string, timeoutMs = 30_000): Promise<void> {
	const start = Date.now();
	while (Date.now() - start < timeoutMs) {
		if (await fileExists(path)) return;
		await new Promise((resolve) => setTimeout(resolve, 50));
	}
	throw new Error(`Timed out waiting for file: ${path}`);
}

function killProc(proc: { pid?: number; kill: (signal?: 'SIGTERM') => void }) {
	if (process.platform === 'win32' && proc.pid) {
		execa('taskkill', ['/pid', proc.pid.toString(), '/T', '/F']).catch((err) => {
			console.warn(`Failed to kill process tree for PID ${proc.pid}:`, err);
			proc.kill();
		});
	} else {
		proc.kill('SIGTERM');
	}
}

function waitForOutput(proc: Proc, match: string, timeoutMs = 30_000): Promise<void> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			killProc(proc);
			reject(new Error(`Timed out waiting for output matching: ${match}`));
		}, timeoutMs);

		const handler = (chunk: unknown) => {
			let decodedChunk: string | null = null;
			if (typeof chunk === 'string') {
				decodedChunk = chunk;
			} else if (Buffer.isBuffer(chunk)) {
				decodedChunk = chunk.toString();
			}
			if (!decodedChunk?.includes(match)) return;
			clearTimeout(timer);
			resolve();
		};

		proc.stdout?.on('data', handler);
		proc.stderr?.on('data', handler);
	});
}

function spawnPty(args: string[]) {
	let output = '';

	const yarnCmd = isWindows ? 'yarn.cmd' : 'yarn';
	const proc = pty.spawn(yarnCmd, ['baeta', ...args], {
		cwd,
		env: procEnv,
		cols: 80,
		rows: 24,
	});

	proc.onData((data) => {
		output += data;
	});

	const waitFor = (match: string, timeoutMs = 30_000) =>
		new Promise<void>((resolve, reject) => {
			if (output.includes(match)) {
				return resolve();
			}

			const timer = setTimeout(() => {
				killProc(proc);
				reject(new Error(`Timed out waiting for PTY output matching: ${match}`));
			}, timeoutMs);

			const dispose = proc.onData(() => {
				if (!output.includes(match)) {
					return;
				}
				clearTimeout(timer);
				dispose.dispose();
				resolve();
			});
		});

	const waitForExit = (timeoutMs = 10_000) =>
		new Promise<{ exitCode: number; signal?: number }>((resolve, reject) => {
			const timer = setTimeout(() => {
				killProc(proc);
				reject(new Error('Timed out waiting for PTY exit'));
			}, timeoutMs);

			proc.onExit((e) => {
				clearTimeout(timer);
				resolve(e);
			});
		});

	return {
		proc,
		get output() {
			return output;
		},
		waitFor,
		waitForExit,
	};
}

// ─── One-shot generate ───

test.serial('baeta generate produces output files', async (t) => {
	const generatedTypesPath = resolve(cwd, 'src/__generated__/types.ts');
	const generatedMovieTypedefPath = resolve(cwd, 'src/modules/movie/typedef.ts');
	await unlink(generatedTypesPath).catch(() => null);
	await unlink(generatedMovieTypedefPath).catch(() => null);

	const result = await execa('yarn', ['baeta', 'generate'], { cwd, env: procEnv });
	t.is(result.exitCode, 0);

	t.true(await fileExists(generatedTypesPath));
	t.true(await fileExists(generatedMovieTypedefPath));
});

// ─── --run flag ───

test.serial('baeta generate --run executes command after generation', async (t) => {
	const proc = execa('yarn', ['baeta', 'generate', '--run', ECHO_CMD], {
		cwd,
		env: procEnv,
	});

	await waitForOutput(proc, ECHO_MARKER);

	killProc(proc);

	const result = await proc.catch((error) => error);

	t.true(result.stdout.includes(ECHO_MARKER));
});

// ─── Watch mode (non-interactive / piped) ───

test.serial('baeta generate --watch exits on SIGTERM (non-interactive)', async (t) => {
	const generatedTypesPath = resolve(cwd, 'src/__generated__/types.ts');
	await unlink(generatedTypesPath).catch(() => null);

	const proc = execa('yarn', ['baeta', 'generate', '--watch'], { cwd, env: procEnv });

	await waitForFile(generatedTypesPath);

	killProc(proc);

	const result = await proc.catch((error) => error);

	t.is(result.exitCode, SIGTERM_EXIT);
});

test.serial('baeta generate --watch --run exits on SIGTERM (non-interactive)', async (t) => {
	const proc = execa('yarn', ['baeta', 'generate', '--watch', '--run', ECHO_CMD], {
		cwd,
		env: procEnv,
	});

	await waitForOutput(proc, ECHO_MARKER);

	killProc(proc);

	const result = await proc.catch((error) => error);

	t.is(result.exitCode, SIGTERM_EXIT);
});

// ─── Watch mode (interactive / PTY) ───

test.serial('baeta generate --watch exits on Ctrl+C (interactive)', async (t) => {
	if (isWindows) {
		t.pass('Skipping Ctrl+C test on Windows due to PTY signal handling differences');
		return;
	}
	const { proc, waitFor, waitForExit } = spawnPty(['generate', '--watch']);

	await waitFor('Watching');

	proc.write('\x03');

	const { exitCode } = await waitForExit();

	t.is(exitCode, SIGINT_EXIT);
});

test.serial('baeta generate --watch --run exits on Ctrl+C (interactive)', async (t) => {
	if (isWindows) {
		t.pass('Skipping Ctrl+C test on Windows due to PTY signal handling differences');
		return;
	}

	const { proc, waitFor, waitForExit } = spawnPty(['generate', '--watch', '--run', ECHO_CMD]);

	await waitFor(ECHO_MARKER);

	proc.write('\x03');

	const { exitCode } = await waitForExit();

	t.is(exitCode, SIGINT_EXIT);
});

test.serial(
	'baeta generate --watch with long running --run exits on Ctrl+C (interactive)',
	async (t) => {
		if (isWindows) {
			t.pass('Skipping Ctrl+C test on Windows due to PTY signal handling differences');
			return;
		}

		const { proc, waitFor, waitForExit } = spawnPty([
			'generate',
			'--watch',
			'--run',
			`${ECHO_CMD} && sleep 60`,
		]);

		await waitFor(ECHO_MARKER);

		proc.write('\x03');

		const { exitCode } = await waitForExit();

		t.is(exitCode, SIGINT_EXIT);
	},
);
