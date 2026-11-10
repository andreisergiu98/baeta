export type CliConfigStatus = { ok: true } | { ok: false; error: Error };

export interface GeneratorPluginInfo {
	id: symbol;
	name: string;
	actionName: string;
}

export type GeneratorStep = 'setup' | 'generate' | 'end';

export interface GeneratorEvents {
	onStart?: () => void;
	onEnd?: () => void;
	onError?: (error: unknown) => void;
	onPluginStepStart?: (plugin: GeneratorPluginInfo, step: GeneratorStep) => void;
	onPluginStepEnd?: (plugin: GeneratorPluginInfo, step: GeneratorStep) => void;
	onConfigChange?: () => void;
	onConfigError?: (error: Error) => void;
}

export interface CliGenerator {
	generate(events?: GeneratorEvents): Promise<void>;
	/**
	 * Generates, then regenerates on schema and config changes until the returned function is called.
	 */
	watch(events?: GeneratorEvents): Promise<() => Promise<void>>;
}

export interface CliContext {
	config: CliConfigStatus;
	generator: CliGenerator;
}
