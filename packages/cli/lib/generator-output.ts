import { stripVTControlCharacters, styleText } from 'node:util';
import {
	DEFAULT_SPINNER,
	type GeneratorEvents,
	type GeneratorStep,
	makeErrorMessage,
	makeWarningMessage,
} from '@baeta/cli-sdk';
import createSpinner from 'yocto-spinner';

const TAG = styleText(['bold', 'magenta'], '[baeta]');
const STEP_ICONS = { setup: '◔', generate: '◑', end: '◕' } as const;
const SLOW_AVERAGE_MS = 200;
const AVERAGE_WINDOW = 5;

export interface GeneratorOutputOptions {
	watch: boolean;
	live: boolean;
	tagged?: boolean;
	onEnd?: () => void;
}

export function createGeneratorOutput(options: GeneratorOutputOptions): {
	print: (message: string) => void;
	events: GeneratorEvents;
} {
	let startedAt = 0;
	const plugins = new Map<symbol, PluginState>();
	const durations: number[] = [];

	const generating = options.live
		? createSpinner({
				color: 'gray',
				spinner: DEFAULT_SPINNER,
			})
		: undefined;
	const watching =
		options.live && options.watch
			? createSpinner({
					text: 'Watching for changes',
					color: 'gray',
					spinner: { frames: ['◇'], interval: 1000 },
				})
			: undefined;

	const print = (message: string) => {
		generating?.stop();
		console.error(stamp(message, options.tagged ?? false));
		watching?.start();
	};

	const formatProgress = () => {
		const width = Math.max(...[...plugins.values()].map((p) => p.name.length));
		const lines = [...plugins.values()].map((plugin) => formatPluginState(plugin, width));
		return ['Generating', ...lines].join('\n');
	};

	const showProgress = () => {
		if (generating?.isSpinning) {
			generating.text = formatProgress();
		}
	};

	return {
		print,
		events: {
			onStart: () => {
				startedAt = performance.now();
				plugins.clear();
				if (generating != null && isSlow(durations)) {
					watching?.stop();
					generating.start(formatProgress());
				}
			},
			onPluginStepStart: (plugin, step) => {
				plugins.set(plugin.id, { name: plugin.actionName, stepDone: false, step });
				showProgress();
			},
			onPluginStepEnd: (plugin, step) => {
				plugins.set(plugin.id, { name: plugin.actionName, stepDone: true, step });
				showProgress();
			},
			onEnd: () => {
				const duration = performance.now() - startedAt;
				durations.push(duration);
				if (durations.length > AVERAGE_WINDOW) {
					durations.shift();
				}
				print(`${styleText('green', '✔')} Generated in ${formatDuration(duration)}`);
				options.onEnd?.();
			},
			onError: (error) => {
				print(makeErrorMessage(formatError(error), true));
				if (!options.watch) {
					process.exitCode = 1;
				}
			},
			onConfigChange: () => {
				print(`${styleText('cyan', 'ℹ')} Config changed, reloading`);
			},
			onConfigError: (error) => {
				const message = makeWarningMessage(`${error.message} Keeping the previous config.`);
				print(error.cause instanceof Error ? `${message}\n${error.cause.message}` : message);
			},
		},
	};
}

export function isInteractive(stream: NodeJS.WriteStream) {
	return stream.isTTY && process.env.TERM !== 'dumb' && !('CI' in process.env);
}

function isSlow(durations: number[]) {
	if (durations.length === 0) {
		return true;
	}
	return (
		durations.reduce((sum, duration) => sum + duration, 0) / durations.length > SLOW_AVERAGE_MS
	);
}

function stamp(message: string, tagged: boolean) {
	const time = styleText('dim', new Date().toTimeString().slice(0, 8));
	const head = tagged ? `${time} ${TAG}` : time;
	const indent = ' '.repeat(stripVTControlCharacters(head).length + 1);
	return `${head} ${message.replaceAll(/\n(?=.)/g, `\n${indent}`)}`;
}

function formatDuration(ms: number) {
	return ms > 1000 ? `${(ms / 1000).toFixed(2)}s` : `${Math.round(ms)}ms`;
}

function formatError(error: unknown): string {
	if (error instanceof AggregateError) {
		const causes = error.errors.map((cause) => formatError(cause).replaceAll(/^/gm, '  '));
		return [error.message, ...causes].join('\n');
	}
	if (isGraphQLError(error)) {
		const path = error.source?.name;
		if (path == null) {
			return error.message;
		}
		const location = [path, error.locations?.[0]?.line, error.locations?.[0]?.column]
			.filter((part) => part != null)
			.join(':');
		return `${error.message}\n${location}`;
	}
	if (error instanceof Error) {
		return error.message;
	}
	return JSON.stringify(error, null, 2);
}

interface PluginState {
	name: string;
	step: GeneratorStep;
	stepDone: boolean;
}

function formatPluginState(plugin: PluginState, width: number) {
	const isDone = plugin.stepDone && plugin.step === 'end';
	let icon = '✔';
	let action = 'done';
	if (!isDone) {
		icon = STEP_ICONS[plugin.step];
		switch (plugin.step) {
			case 'setup':
				action = 'prepare';
				break;
			case 'generate':
				action = 'generate';
				break;
			case 'end':
				action = 'wrap up';
				break;
			default:
				plugin.step satisfies never;
				break;
		}
	}
	return `  ${styleText(isDone ? 'green' : 'gray', icon)} ${plugin.name.padEnd(width)}    ${styleText('dim', action)}`;
}

interface GraphQLErrorLike extends Error {
	source?: { name: string };
	locations?: ReadonlyArray<{ line: number; column: number }>;
}

function isGraphQLError(error: unknown): error is GraphQLErrorLike {
	return error instanceof Error && error.name === 'GraphQLError';
}
