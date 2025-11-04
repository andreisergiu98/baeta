import pty from 'node-pty';

export type PtyProcess = {
	didExit: boolean;
	write: (data: string) => void;
	exit: () => void;
};

export function startProcessWithPty(
	command: string,
	onData: (data: string, clear: boolean) => void,
): PtyProcess {
	const [file, ...args] = parseCommand(command);

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

	const procData = {
		didExit: false,
		write: (data: string) => {
			ptyProc.write(data);
		},
		exit: () => {
			ptyProc.kill('SIGTERM');
		},
	};

	ptyProc.onExit(() => {
		procData.didExit = true;
		procData.write = (_data: string) => {
			// do nothing
		};
	});

	return procData;
}

const SPACES_REGEXP = / +/g;

function parseCommand(command: string) {
	const trimmed = command.trim();
	if (trimmed === '') {
		throw new Error('Command cannot be empty');
	}
	const tokens: string[] = [];

	for (const token of trimmed.split(SPACES_REGEXP)) {
		const previous = tokens.at(-1);
		if (previous?.endsWith('\\')) {
			tokens[tokens.length - 1] = `${previous.slice(0, -1)} ${token}`;
		} else {
			tokens.push(token);
		}
	}

	return tokens;
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
