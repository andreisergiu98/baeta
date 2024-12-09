import type { PackageManager } from './constants.ts';

export interface CliOptions {
	packageManager?: PackageManager;
	skipInstall?: boolean;
}
