import { glob } from 'node:fs/promises';
import { join } from 'node:path';
import symbols from 'log-symbols';
import type { CommandModule } from 'yargs';
import { spawnCli } from '../lib/spawn-cli.ts';

interface TestArgs {
	'skip-coverage': boolean;
	config: string;
}

// biome-ignore lint/complexity/noBannedTypes: Allow empty dictionary
export const testCommand: CommandModule<{}, TestArgs> = {
	command: 'test',
	describe: 'Run tests with coverage for package',
	builder: (yargs) => {
		return yargs
			.option('skip-coverage', {
				describe: 'Skip coverage check',
				type: 'boolean',
				default: false,
			})
			.option('config', {
				describe: 'The configuration file to use',
				type: 'string',
				default: join(new URL(import.meta.url).pathname, '../../../../.nycrc.json'),
			});
	},
	handler: async (args) => {
		const files: string[] = [];
		for await (const file of glob('**/*.test.ts')) {
			files.push(file);
		}
		if (files.length === 0) {
			console.log(`${symbols.info} No tests found. Skipping!`);
			return;
		}
		await spawnCli({
			root: import.meta.url,
			lib: 'c8',
			path: '../bin/c8.js',
			args: [
				'-c',
				args.config,
				args.skipCoverage ? undefined : '--check-coverage',
				'yarn',
				'ava',
				'--timeout=60s',
			].filter((el) => el != null),
		}).catch((error) => {
			process.exit(error.exitCode || 1);
		});
	},
};
