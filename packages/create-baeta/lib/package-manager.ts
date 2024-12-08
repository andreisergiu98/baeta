import path from 'node:path';
import { logger } from '@docusaurus/logger';
import fs from 'fs-extra';
import prompts from 'prompts';
import shell from 'shelljs';
import type { CliOptions } from './cli-options.ts';
import {
	type PackageManager,
	defaultPackageManager,
	lockfileNames,
	packageManagers,
} from './constants.ts';

async function findPackageManagerFromLockFile(
	rootDir: string,
): Promise<PackageManager | undefined> {
	for (const packageManager of packageManagers) {
		const lockFilePath = path.join(rootDir, lockfileNames[packageManager]);
		if (await fs.pathExists(lockFilePath)) {
			return packageManager;
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
	const hasYarn = shell.exec('yarn --version', { silent: true }).code === 0;
	const hasPnpm = shell.exec('pnpm --version', { silent: true }).code === 0;
	const hasBun = shell.exec('bun --version', { silent: true }).code === 0;

	if (!hasYarn && !hasPnpm && !hasBun) {
		return 'npm';
	}
	const choices = ['npm', hasYarn && 'yarn', hasPnpm && 'pnpm', hasBun && 'bun']
		.filter((p): p is string => Boolean(p))
		.map((p) => ({ title: p, value: p }));

	const manager = await prompts(
		{
			type: 'select',
			name: 'packageManager',
			message: 'Select a package manager...',
			choices,
		},
		{
			onCancel() {
				logger.info`Falling back to name=${defaultPackageManager}`;
			},
		},
	).then((result) => (result as { packageManager?: PackageManager }).packageManager);

	return manager ?? defaultPackageManager;
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

	return askForPackageManagerChoice();
}

export function getInstallCommand(pkgManager: PackageManager): string {
	if (pkgManager === 'yarn') {
		return 'yarn';
	}
	if (pkgManager === 'bun') {
		return 'bun install';
	}
	return `${pkgManager} install --color always`;
}
