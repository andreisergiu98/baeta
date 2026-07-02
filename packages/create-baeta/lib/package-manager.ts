import path from 'node:path';
import select from '@inquirer/select';
import { isCommandAvailable } from '../utils/commands.ts';
import { pathExists } from '../utils/fs.ts';
import type { CliOptions } from './cli-options.ts';
import {
	defaultPackageManager,
	lockfileNames,
	type PackageManager,
	packageManagers,
} from './constants.ts';
import { logger } from './logger.ts';

async function findPackageManagerFromLockFile(
	rootDir: string,
): Promise<PackageManager | undefined> {
	for (const packageManager of packageManagers) {
		for (const lockFileName of lockfileNames[packageManager]) {
			const lockFilePath = path.join(rootDir, lockFileName);
			if (await pathExists(lockFilePath)) {
				return packageManager;
			}
		}
	}
	return undefined;
}

function findPackageManagerFromUserAgent(): PackageManager | undefined {
	return packageManagers.find((packageManager) =>
		process.env.npm_config_user_agent?.startsWith(packageManager),
	);
}

async function askForPackageManagerChoice(): Promise<PackageManager> {
	const [hasYarn, hasPnpm, hasBun] = await Promise.all([
		isCommandAvailable('yarn'),
		isCommandAvailable('pnpm'),
		isCommandAvailable('bun'),
	]);

	if (!hasYarn && !hasPnpm && !hasBun) {
		return 'npm';
	}
	const choices = [
		'npm' as const,
		hasYarn && ('yarn' as const),
		hasPnpm && ('pnpm' as const),
		hasBun && ('bun' as const),
	]
		.filter((p) => p !== false)
		.map((p) => ({ value: p }));

	try {
		return await select<PackageManager>({
			message: 'Select a package manager...',
			choices,
			default: defaultPackageManager,
		});
	} catch (error) {
		if (error instanceof Error && error.name === 'ExitPromptError') {
			logger.info`Falling back to name=${defaultPackageManager}`;
			return defaultPackageManager;
		}
		throw error;
	}
}

export async function getPackageManager(
	dest: string,
	{ packageManager, skipInstall }: CliOptions,
): Promise<PackageManager> {
	if (packageManager && !packageManagers.includes(packageManager)) {
		throw new Error(
			`Invalid package manager choice ${packageManager}. Must be one of ${packageManagers.join(
				', ',
			)}`,
		);
	}

	const fromLockfile = await findPackageManagerFromLockFile(dest);

	if (fromLockfile) {
		return fromLockfile;
	}

	if (packageManager) {
		return packageManager;
	}

	const fromLockfileInCwd = await findPackageManagerFromLockFile('.');

	if (fromLockfileInCwd) {
		return fromLockfileInCwd;
	}

	const fromUserAgent = findPackageManagerFromUserAgent();

	if (fromUserAgent) {
		return fromUserAgent;
	}

	if (skipInstall) {
		return defaultPackageManager;
	}

	return await askForPackageManagerChoice();
}

export function getInstallArgs(pkgManager: PackageManager): string[] {
	if (pkgManager === 'yarn') {
		return [];
	}
	return ['install'];
}
