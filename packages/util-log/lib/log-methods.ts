import type { BaetaLogLevel } from './level.ts';

export function createLogMethods<Message>(
	handler: (level: BaetaLogLevel, message: Message) => void,
) {
	return {
		debug: (message: Message) => handler('debug', message),
		info: (message: Message) => handler('info', message),
		warn: (message: Message) => handler('warn', message),
		error: (message: Message) => handler('error', message),
	};
}
