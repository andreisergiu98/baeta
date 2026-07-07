export interface BaetaLogMessage extends BaetaLogMessageBase {
	package: string;
}

export interface BaetaLogMessageBase {
	type: string;
	message: string;
	error?: unknown;
	extra?: Record<string, unknown>;
}
