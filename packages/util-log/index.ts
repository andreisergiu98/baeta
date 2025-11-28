type GlobalWithConsoleLike = typeof globalThis & {
	console: Partial<Logger>;
};

export type Logger = {
	debug: (...args: any) => void;
	info: (...args: any) => void;
	warn: (...args: any) => void;
	error: (...args: any) => void;
};

type Level = 'debug' | 'info' | 'warn' | 'error';

const levelValue: Record<Level, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

function hasConsoleLog(glb: typeof globalThis): glb is GlobalWithConsoleLike {
	return 'console' in glb && glb.console != null;
}

export function createLogger(level: Level = 'info'): Logger {
	const glb = globalThis;
	const noop = () => {};

	if (!hasConsoleLog(glb)) {
		return {
			debug: noop,
			info: noop,
			warn: noop,
			error: noop,
		};
	}

	const wrap = (withLevel: Level) => {
		if (levelValue[withLevel] < levelValue[level]) {
			return noop;
		}
		return (...args: any) => {
			const namespace = `[baeta:${withLevel}]`;
			if (glb.console[withLevel] == null) {
				glb.console.info?.(namespace, ...args);
				return;
			}
			glb.console[withLevel]?.(namespace, ...args);
		};
	};

	return {
		debug: wrap('debug'),
		info: wrap('info'),
		warn: wrap('warn'),
		error: wrap('error'),
	};
}

export const log = createLogger();
