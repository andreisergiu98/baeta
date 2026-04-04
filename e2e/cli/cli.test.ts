import { stat, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import test from '@baeta/testing';
import { execa, type ResultPromise as Proc } from 'execa';
import pty from 'node-pty';

const cwd = resolve(import.meta.dirname, '.');

const procEnv = {
	...process.env,
	CI: 'false',
};

async function fileExists(path: string): Promise<boolean> {
	const stats = await stat(path).catch(() => null);
	return stats?.isFile() ?? false;
}

function waitForOutput(proc: Proc, match: string, timeoutMs = 30_000): Promise<void> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			proc.kill('SIGKILL');
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

	const proc = pty.spawn('yarn', ['baeta', ...args], {
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
				proc.kill('SIGKILL');
				reject(new Error(`Timed out waiting for PTY output matching: ${match}`));
			}, timeoutMs);

			const dispose = proc.onData(() => {
				if (output.includes(match)) {
					clearTimeout(timer);
					dispose.dispose();
					resolve();
				}
			});
		});

	const waitForExit = (timeoutMs = 10_000) =>
		new Promise<{ exitCode: number; signal?: number }>((resolve, reject) => {
			const timer = setTimeout(() => {
				proc.kill('SIGKILL');
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
	const proc = execa('yarn', ['baeta', 'generate', '--run', 'echo __e2e_run_marker__'], {
		cwd,
		env: procEnv,
	});

	await waitForOutput(proc, '__e2e_run_marker__');

	proc.kill('SIGTERM');

	const result = await proc.catch((error) => error);

	t.true(result.stdout.includes('__e2e_run_marker__'));
});

// ─── Watch mode (non-interactive / piped) ───

test.serial('baeta generate --watch exits on SIGTERM (non-interactive)', async (t) => {
	const proc = execa('yarn', ['baeta', 'generate', '--watch'], { cwd, env: procEnv });

	await waitForOutput(proc, 'Watching');

	proc.kill('SIGTERM');

	const result = await proc.catch((error) => error);

	t.is(result.exitCode, 143);
});

test.serial('baeta generate --watch --run exits on SIGTERM (non-interactive)', async (t) => {
	const proc = execa('yarn', ['baeta', 'generate', '--watch', '--run', 'echo __e2e_watch_run__'], {
		cwd,
		env: procEnv,
	});

	await waitForOutput(proc, '__e2e_watch_run__');

	proc.kill('SIGTERM');

	const result = await proc.catch((error) => error);

	t.is(result.exitCode, 143);
});

// ─── Watch mode (interactive / PTY) ───

test.serial('baeta generate --watch exits on Ctrl+C (interactive)', async (t) => {
	const { proc, waitFor, waitForExit } = spawnPty(['generate', '--watch']);

	await waitFor('Watching');

	proc.write('\x03');

	const { exitCode } = await waitForExit();

	t.is(exitCode, 130);
});

test.serial('baeta generate --watch --run exits on Ctrl+C (interactive)', async (t) => {
	const { proc, waitFor, waitForExit } = spawnPty([
		'generate',
		'--watch',
		'--run',
		'echo __e2e_pty_run__',
	]);

	await waitFor('__e2e_pty_run__');

	proc.write('\x03');

	const { exitCode } = await waitForExit();

	t.is(exitCode, 130);
});
