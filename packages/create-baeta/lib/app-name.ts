import path from 'node:path';
import { logger } from '@docusaurus/logger';
import fs from 'fs-extra';
import prompts from 'prompts';

export async function getAppName(reqName: string | undefined, rootDir: string): Promise<string> {
	async function validateAppName(appName: string) {
		if (!appName) {
			return 'An app name is required.';
		}
		const dest = path.resolve(rootDir, appName);
		if (await fs.pathExists(dest)) {
			return logger.interpolate`Directory already exists at path=${dest}!`;
		}
		return true;
	}

	if (reqName) {
		const res = await validateAppName(reqName);
		if (typeof res === 'string') {
			throw new Error(res);
		}
		return reqName;
	}

	return prompts(
		{
			type: 'text',
			name: 'appName',
			message: 'What should we name this app?',
			initial: 'baeta-app',
			validate: validateAppName,
		},
		{
			onCancel() {
				logger.error('An app name is required.');
				process.exit(1);
			},
		},
	).then((result) => (result as { appName: string }).appName);
}
