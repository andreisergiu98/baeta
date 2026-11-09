import { execFileSync } from 'node:child_process';
import { readFile, stat, unlink, writeFile } from 'node:fs/promises';
import test from '@baeta/testing';
import { execa, type ResultPromise as Proc } from 'execa';
import pty from 'node-pty';
import { resolve } from 'pathe';

const cwd = resolve(import.meta.dirname, '.');

const procEnv = Object.fromEntries(Object.entries(process.env).filter(([key]) => key !== 'CI'));

const isWindows = process.platform === 'win32';
const SIGTERM_EXIT = isWindows ? 1 : 143;
const SIGINT_EXIT = isWindows ? 1 : 130;
const ECHO_MARKER = '__e2e_run_arg__';
const ECHO_CMD = isWindows ? `cmd /c echo ${ECHO_MARKER}` : `echo ${ECHO_MARKER}`;
const LONG_CMD = `node -e "console.log('${ECHO_MARKER}');setInterval(()=>{},1000)"`;
const EXIT_3_CMD = 'node -e "process.exit(3)"';
const CRASH_MESSAGE = 'App exited with code 3';

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

function printProcessTree(rootPid: number) {
	if (isWindows) {
		return;
	}
	const rows = execFileSync('ps', ['-A', '-o', 'pid=,ppid=,pgid=,tpgid=,stat=,args='])
		.toString()
		.split('\n')
		.map((line) => line.trim().split(/\s+/))
		.filter((row) => row.length >= 6);
	const tree = new Set([rootPid]);
	let size: number;
	do {
		size = tree.size;
		for (const [pid, ppid] of rows) {
			if (tree.has(Number(ppid))) {
				tree.add(Number(pid));
			}
		}
	} while (tree.size !== size);
	const lines = rows.filter(([pid]) => tree.has(Number(pid))).map((row) => row.join(' '));
	console.error(['PID PPID PGID TPGID STAT ARGS', ...lines].join('\n'));
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
				printProcessTree(proc.pid);
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

test.serial('baeta generate fails without a config', async (t) => {
	const result = await execa('yarn', ['baeta', 'generate'], {
		cwd: resolve(cwd, 'src'),
		env: procEnv,
		reject: false,
	});

	t.is(result.exitCode, 1);
	t.true(result.stderr.includes('No config file found.'));
});

test.serial('baeta --help works without a config', async (t) => {
	const result = await execa('yarn', ['baeta', '--help'], {
		cwd: resolve(cwd, 'src'),
		env: procEnv,
	});

	t.is(result.exitCode, 0);
	t.true(result.stdout.includes('generate types and module definitions'));
});

// ─── CLI plugins ───

test.serial('baeta --help lists commands from CLI plugins', async (t) => {
	const result = await execa('yarn', ['baeta', '--help'], { cwd, env: procEnv });

	t.is(result.exitCode, 0);
	t.true(result.stdout.includes('print a greeting from a CLI plugin'));
});

test.serial('baeta runs commands from CLI plugins', async (t) => {
	const result = await execa('yarn', ['baeta', 'greet', 'e2e'], { cwd, env: procEnv });

	t.is(result.exitCode, 0);
	t.true(result.stdout.includes('hello e2e'));
});

// ─── --run flag ───

test.serial('baeta generate --run executes command after generation', async (t) => {
	const result = await execa('yarn', ['baeta', 'generate', '--run', ECHO_CMD], {
		cwd,
		env: procEnv,
	});

	t.is(result.exitCode, 0);
	t.true(result.stdout.includes(ECHO_MARKER));
});

test.serial('baeta generate --run exits with the command exit code', async (t) => {
	const result = await execa('yarn', ['baeta', 'generate', '--run', EXIT_3_CMD], {
		cwd,
		env: procEnv,
		reject: false,
	});

	t.is(result.exitCode, 3);
});

test.serial('baeta generate --watch --run exits when the command exits cleanly', async (t) => {
	const result = await execa('yarn', ['baeta', 'generate', '--watch', '--run', ECHO_CMD], {
		cwd,
		env: procEnv,
	});

	t.is(result.exitCode, 0);
	t.true(result.stdout.includes(ECHO_MARKER));
});

test.serial(
	'baeta generate --watch --run restarts a crashed command after the next generation',
	async (t) => {
		const schemaPath = resolve(cwd, 'src/modules/movie/movie.gql');
		const schema = await readFile(schemaPath, 'utf8');
		const proc = execa('yarn', ['baeta', 'generate', '--watch', '--run', EXIT_3_CMD], {
			cwd,
			env: procEnv,
		});

		try {
			await waitForOutput(proc, CRASH_MESSAGE);
			const restarted = waitForOutput(proc, CRASH_MESSAGE);
			await writeFile(schemaPath, `${schema}\n# e2e restart\n`);
			await restarted;
		} finally {
			await writeFile(schemaPath, schema);
		}

		killProc(proc);
		const result = await proc.catch((error) => error);

		t.is(result.exitCode, SIGTERM_EXIT);
	},
);

test.serial('baeta generate --run passes piped stdin to the command', async (t) => {
	const result = await execa(
		'yarn',
		['baeta', 'generate', '--run', 'node -e "process.stdin.pipe(process.stdout)"'],
		{ cwd, env: procEnv, input: ECHO_MARKER },
	);

	t.true(result.stdout.includes(ECHO_MARKER));
});

test.serial('baeta generate --run exits with the command exit code (interactive)', async (t) => {
	if (isWindows) {
		t.pass('Skipping PTY test on Windows because node-pty keeps the worker alive');
		return;
	}
	const { waitForExit } = spawnPty(['generate', '--run', EXIT_3_CMD]);

	const { exitCode } = await waitForExit(30_000);

	t.is(exitCode, 3);
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
	const proc = execa('yarn', ['baeta', 'generate', '--watch', '--run', LONG_CMD], {
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

	const { proc, waitFor, waitForExit } = spawnPty(['generate', '--watch', '--run', LONG_CMD]);

	await waitFor(ECHO_MARKER);

	proc.write('\x03');

	const { exitCode } = await waitForExit();

	t.is(exitCode, SIGINT_EXIT);
});

test.serial(
	'baeta generate --watch --run with a shell command exits on Ctrl+C (interactive)',
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
