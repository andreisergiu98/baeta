type GlobalConsoleLog = {
	console: ConsoleLogger;
};

// biome-ignore lint/suspicious/noExplicitAny: respects console.log spec
export type ConsolePayload = any[];

export type ConsoleLogger = {
	debug: (...args: ConsolePayload) => void;
	info: (...args: ConsolePayload) => void;
	warn: (...args: ConsolePayload) => void;
	error: (...args: ConsolePayload) => void;
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
		debug: (...args: ConsolePayload) => global.console.debug('[baeta:debug]', ...args),
		info: (...args: ConsolePayload) => global.console.info('[baeta:info]', ...args),
		warn: (...args: ConsolePayload) => global.console.warn('[baeta:warn]', ...args),
		error: (...args: ConsolePayload) => global.console.error('[baeta:error]', ...args),
	};
}

export const log = createLogger();
