type GlobalConsoleLog = {
	console: ConsoleLogger;
};

// biome-ignore lint/suspicious/noExplicitAny: respects console.log spec
type Payload = any[];

type ConsoleLogger = {
	debug: (...args: Payload) => void;
	info: (...args: Payload) => void;
	warn: (...args: Payload) => void;
	error: (...args: Payload) => void;
};

function hasConsoleLog(global: Record<string, unknown>): global is GlobalConsoleLog {
	return global.console != null;
}

function createLogger(): ConsoleLogger {
	const global = globalThis;

	if (!hasConsoleLog(global)) {
		return {
			debug: () => {},
			info: () => {},
			warn: () => {},
			error: () => {},
		};
	}

	return {
		debug: (...args: Payload) => global.console.debug('[baeta:debug]', ...args),
		info: (...args: Payload) => global.console.info('[baeta:info]', ...args),
		warn: (...args: Payload) => global.console.warn('[baeta:warn]', ...args),
		error: (...args: Payload) => global.console.error('[baeta:error]', ...args),
	};
}

export const log = createLogger();
