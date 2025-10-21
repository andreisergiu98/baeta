import { SerializeAddon } from '@xterm/addon-serialize';
import xterm from '@xterm/headless';
import throttle from 'lodash.throttle';
import pty from 'node-pty';
export type PtyProcess = ReturnType<typeof startProcessWithPty>;

const SPACES_REGEXP = / +/g;

export function startProcessWithPty(command: string, stdout: (data: string) => void) {
	const [file, ...args] = parseCommand(command);

	const cols = process.stdout.columns;
	const rows = process.stdout.rows;

	const term = new xterm.Terminal({
		cols: cols,
		rows: rows,
		allowProposedApi: true,
	});
	const serialize = new SerializeAddon();
	term.loadAddon(serialize);

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
		term.resize(cols, rows);
	});

	ptyProc.onData((data) => {
		term.write(data);
		refresh();
	});

	const refresh = throttle(
		() => {
			const screen = serialize.serialize();
			stdout(screen);
		},
		16,
		{
			leading: false,
			trailing: true,
		},
	);

	const procData = {
		didExit: false,
		write: (data: string) => {
			ptyProc.write(data);
		},
	};

	ptyProc.onExit(() => {
		procData.didExit = true;
		procData.write = (_data: string) => {
			// do nothing
		};
		term.dispose();
	});

	return procData;
}

function parseCommand(command: string) {
	const trimmed = command.trim();
	if (trimmed === '') {
		throw new Error('Command cannot be empty');
	}
	const tokens: string[] = [];

	for (const token of trimmed.split(SPACES_REGEXP)) {
		const previous = tokens.at(-1);
		if (previous == null || !previous.endsWith('\\')) {
			tokens.push(token);
			continue;
		}
		tokens[tokens.length - 1] = `${previous.slice(0, -1)} ${token}`;
	}

	return tokens;
}
