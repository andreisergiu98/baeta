import path from 'node:path';
import input from '@inquirer/input';
import { pathExists } from '../utils/fs.ts';
import { logger } from './logger.ts';

const APP_NAME_RE = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/;

export async function getAppName(reqName: string | undefined, rootDir: string): Promise<string> {
	const resolvedRoot = path.resolve(rootDir);

	async function validateAppName(appName: string) {
		if (!appName) {
			return 'An app name is required.';
		}
		if (!APP_NAME_RE.test(appName)) {
			return 'App name must contain only lowercase letters, digits, dashes, underscores, or dots, and may optionally include an npm scope.';
		}
		const dest = path.resolve(resolvedRoot, appName);
		if (await pathExists(dest)) {
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
