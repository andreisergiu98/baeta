import { logger } from '@docusaurus/logger';
import select from '@inquirer/select';
import shell from 'shelljs';
import { defaultJavaScriptRuntime, type JavaScriptRuntime } from './constants.ts';

export async function getRuntime(): Promise<JavaScriptRuntime> {
	const hasBun = shell.exec('bun --version', { silent: true }).code === 0;
	const hasDeno = shell.exec('deno --version', { silent: true }).code === 0;

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
			logger.info`Falling back to name=${defaultJavaScriptRuntime}`;
			return defaultJavaScriptRuntime;
		}
		throw error;
	}
}
