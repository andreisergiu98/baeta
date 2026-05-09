import path from 'node:path';
import { logger } from '@docusaurus/logger';
import input from '@inquirer/input';
import fs from 'fs-extra';

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
			throw new TypeError(res);
		}
		return reqName;
	}

	try {
		return await input({
			message: 'What should we name this app?',
			default: 'baeta-app',
			validate: validateAppName,
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			logger.error('An app name is required.');
			process.exit(1);
		}
		throw error;
	}
}
