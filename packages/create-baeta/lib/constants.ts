export const defaultPackageManager = 'npm';

export const lockfileNames = {
	npm: 'package-lock.json',
	yarn: 'yarn.lock',
	pnpm: 'pnpm-lock.yaml',
	bun: 'bun.lockb',
};

export const packageManagers = Object.keys(lockfileNames) as PackageManager[];

export type PackageManager = keyof typeof lockfileNames;

export const gitignoreUrl =
	'https://raw.githubusercontent.com/github/gitignore/refs/heads/main/Node.gitignore';
