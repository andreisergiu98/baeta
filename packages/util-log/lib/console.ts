import { logLevelText, type BaetaLogLevel } from './level.ts';
import type { BaetaLogMessage } from './message.ts';
import type { BaetaLogTransport } from './transport.ts';

type GlobalWithConsoleLike = typeof globalThis & {
	console: Partial<ConsoleLogger>;
};

type ConsoleLogger = {
	debug?: (...args: any) => void;
	info?: (...args: any) => void;
	warn?: (...args: any) => void;
	error?: (...args: any) => void;
};

export function createConsoleLogger(): BaetaLogTransport {
	const global = globalThis;
	const noop = () => {};
	if (!hasConsoleLog(global)) {
		return noop;
	}
	const consoleLogger = {
		debug: global.console.debug?.bind(global.console) ?? noop,
		info: global.console.info?.bind(global.console) ?? noop,
		warn: global.console.warn?.bind(global.console) ?? noop,
		error: global.console.error?.bind(global.console) ?? noop,
	};
	return (level, message) => {
		consoleLogger[level](...toConsoleLogArgs(level, message));
	};
}

function toConsoleLogArgs(level: BaetaLogLevel, message: BaetaLogMessage): any[] {
	const text = `[${logLevelText[level]}][${message.package}] ${message.type}: ${message.message}`;
	if (message.error) {
		return [text, message.error, message.extra];
	}
	return [text, message.extra];
}

function hasConsoleLog(glb: typeof globalThis): glb is GlobalWithConsoleLike {
	return 'console' in glb && glb.console != null;
}
