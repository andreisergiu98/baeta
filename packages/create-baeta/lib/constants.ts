export const defaultPackageManager = 'npm';

export const lockfileNames = {
	npm: 'package-lock.json',
	yarn: 'yarn.lock',
	pnpm: 'pnpm-lock.yaml',
	bun: 'bun.lockb',
};

export const packageManagers = Object.keys(lockfileNames) as PackageManager[];

export type PackageManager = keyof typeof lockfileNames;

export const runtimes = ['node', 'deno', 'bun'] as const;

export type JavaScriptRuntime = (typeof runtimes)[number];

export const defaultJavaScriptRuntime = 'node';

export const templates = ['yoga', 'apollo'] as const;
export type Template = (typeof templates)[number];
