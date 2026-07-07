export type BaetaLogLevel = 'debug' | 'info' | 'warn' | 'error';

export const logLevelRank: Record<BaetaLogLevel, number> = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

export const logLevelText: Record<BaetaLogLevel, string> = {
	debug: 'DEBUG',
	info: 'INFO',
	warn: 'WARN',
	error: 'ERROR',
};

export function shouldLog(messageLevel: BaetaLogLevel, minLevel: BaetaLogLevel): boolean {
	return logLevelRank[messageLevel] >= logLevelRank[minLevel];
}

export function parseLogLevel(level: string | undefined): BaetaLogLevel | undefined {
	if (!level) return;
	switch (level.toLowerCase()) {
		case 'debug':
			return 'debug';
		case 'info':
			return 'info';
		case 'warn':
			return 'warn';
		case 'error':
			return 'error';
		default:
			return undefined;
	}
}
