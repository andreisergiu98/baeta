import { logger } from '@docusaurus/logger';
import prompts from 'prompts';
import shell from 'shelljs';
import { defaultJavaScriptRuntime, type JavaScriptRuntime } from './constants.ts';

export async function getRuntime(): Promise<JavaScriptRuntime> {
	const hasBun = shell.exec('bun --version', { silent: true }).code === 0;
	const hasDeno = shell.exec('deno --version', { silent: true }).code === 0;

	if (!hasDeno && !hasBun) {
		return 'node';
	}
	const choices = ['node', hasBun && 'bun', hasDeno && 'deno']
		.filter((p): p is string => Boolean(p))
		.map((p) => ({ title: p, value: p }));

	const runtime = await prompts(
		{
			type: 'select',
			name: 'runtime',
			message: 'Select a runtime...',
			choices,
		},
		{
			onCancel() {
				logger.info`Falling back to name=${defaultJavaScriptRuntime}`;
			},
		},
	).then((result) => (result as { runtime?: JavaScriptRuntime }).runtime);

	return runtime ?? defaultJavaScriptRuntime;
}
