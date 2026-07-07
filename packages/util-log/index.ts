import { getEnv } from '@baeta/util-env';
import { createConsoleLogger } from './lib/console.ts';
import { parseLogLevel, shouldLog, type BaetaLogLevel } from './lib/level.ts';
import { createLogMethods } from './lib/log-methods.ts';
import type { BaetaLogMessage, BaetaLogMessageBase } from './lib/message.ts';
import type { BaetaLogTransport } from './lib/transport.ts';

export type { BaetaLogLevel, BaetaLogMessage, BaetaLogTransport };

export interface LogSettings {
	level: BaetaLogLevel;
	transport: BaetaLogTransport;
}

type GlobalThisWithLogSettings = typeof globalThis & {
	[settingsSymbol]?: LogSettings;
};

const settingsSymbol = Symbol.for('@baeta/util-log/settings');

export const defaultLogTransport = createConsoleLogger();

const defaultSettings = {
	level: parseLogLevel(getEnv('BAETA_LOG_LEVEL')) ?? 'info',
	transport: defaultLogTransport,
};

export function setBaetaLogLevel(level: BaetaLogLevel): void {
	const settings = getLogSettings();
	setLogSettings({ ...settings, level });
}

export function setBaetaLogTransport(transport: BaetaLogTransport): void {
	const settings = getLogSettings();
	setLogSettings({ ...settings, transport });
}

export function createLogger(packageName: string) {
	return createLogMethods<BaetaLogMessageBase>((level, message) => {
		send(level, { package: packageName, ...message });
	});
}

export const log = createLogMethods<BaetaLogMessage>(send);

function send(level: BaetaLogLevel, message: BaetaLogMessage): void {
	const settings = getLogSettings();
	if (shouldLog(level, settings.level)) {
		settings.transport(level, message);
	}
}

function getLogSettings(): LogSettings {
	return (globalThis as GlobalThisWithLogSettings)[settingsSymbol] ?? defaultSettings;
}

function setLogSettings(settings: LogSettings): void {
	(globalThis as GlobalThisWithLogSettings)[settingsSymbol] = settings;
}
