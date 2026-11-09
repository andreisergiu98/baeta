import select from '@inquirer/select';
import { isCommandAvailable } from '../utils/commands.ts';
import type { JavaScriptRuntime } from './constants.ts';
import { logger } from './logger.ts';

export async function getRuntime(): Promise<JavaScriptRuntime> {
	const [hasBun, hasDeno] = await Promise.all([
		isCommandAvailable('bun'),
		isCommandAvailable('deno'),
	]);

	if (!hasDeno && !hasBun) {
		return 'node';
	}
	const choices = ['node' as const, hasBun && ('bun' as const), hasDeno && ('deno' as const)]
		.filter((p) => p !== false)
		.map((p) => ({ value: p }));

	try {
		return await select<JavaScriptRuntime>({
			message: 'Select a runtime...',
			choices,
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			logger.error('A runtime is required.');
			process.exit(1);
		}
		throw error;
	}
}
