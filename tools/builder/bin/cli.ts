#! /usr/bin/env node

import { execaCommand } from 'execa';
import { glob } from 'fs/promises';
import madge from 'madge';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { getConfirmation } from '../lib/confirmation.ts';
import { prepClean, prepGenerate } from '../lib/prep.ts';
import { getPreReleaseTag } from '../lib/release-tag.ts';

yargs(hideBin(process.argv))
	.command(
		'prepare',
		'Prepares current workspace package for publishing',
		(yargs) =>
			yargs.option('clean', {
				describe: 'Clean the package before preparing',
				type: 'boolean',
				default: false,
			}),
		async (argv) => {
			if (argv.clean) {
				return await prepClean();
			}
			return await prepGenerate();
		},
	)
	.command(
		'build',
		'Builds current workspace package for publishing',
		(yargs) => {
			yargs.help(false);
		},
		async () => {
			process.argv = process.argv.slice(0, 2).concat(process.argv.slice(3));
			await import('tsdown/run');
		},
	)
	.command(
		'test',
		'Runs the tests for the workspace package',
		(yargs) =>
			yargs
				.option('skip-coverage', {
					describe: 'Skip coverage check',
					type: 'boolean',
					default: false,
				})
				.option('config', {
					describe: 'The configuration file to use',
					type: 'string',
					default: '../../.nycrc.json',
				}),
		async (argv) => {
			const files: string[] = [];
			for await (const file of glob('**/*.test.ts')) {
				files.push(file);
			}
			if (files.length === 0) {
				console.log('No tests found');
				return;
			}
			const checkCoverage = argv.skipCoverage ? '' : '--check-coverage';
			await execaCommand(`yarn c8 -c ${argv.config} ${checkCoverage} ava`, {
				stdio: 'inherit',
			}).catch((error) => {
				process.exit(error.exitCode || 1);
			});
		},
	)
	.command(
		'check-circular',
		'Tests for circular dependencies in the workspace package',
		() => {},
		async () => {
			const tester = await madge(process.cwd(), {
				fileExtensions: ['ts', 'tsx'],
				detectiveOptions: {
					skipTypeImports: true,
				},
			});

			const results = await tester.circular();

			for (const items of results) {
				console.log(`Circular imports found in: ${items.join(' -> ')}`);
			}

			if (results.length > 0) {
				process.exit(1);
			}
		},
	)
	.command(
		'print-tag',
		'Prints the release tag',
		() => {},
		async () => {
			const tag = await getPreReleaseTag();
			process.stdout.write(tag);
		},
	)
	.command(
		'release',
		'Publishes all packages',
		async (args) => {
			return args
				.option('tag', {
					describe: 'The tag to use for the release. By default respects the changeset tag',
					type: 'string',
					default: await getPreReleaseTag(),
				})
				.option('ci', {
					describe: 'Whether to run in CI mode',
					type: 'boolean',
					default: false,
				})
				.option('dry-run', {
					describe: 'Perform a dry run first',
					type: 'boolean',
				})
				.option('extra-args', {
					describe: 'Extra arguments to pass to the publish command',
					type: 'string',
				})
				.option('skip-build', {
					describe: 'Skip building the packages',
					type: 'boolean',
					default: false,
				});
		},
		async (args) => {
			const runArgs: string[] = ['--tolerate-republish', `--tag=${args.tag}`];

			if (args.extraArgs != null) {
				runArgs.push(args.extraArgs);
			}

			if (args.dryRun) {
				runArgs.push('--dry-run');
			}

			if (args.ci === false) {
				const confirmedReleaseTag = await getConfirmation(
					`This will publish all packages using the release tag "${args.tag}". Continue?`,
				);

				if (!confirmedReleaseTag) {
					process.exit(1);
				}
			}

			console.log('Building packages...');

			if (args.skipBuild !== true) {
				await execaCommand('yarn run -T build', {
					stdio: 'inherit',
				});
			}

			console.log('Publishing packages...');

			await execaCommand(
				`yarn workspaces foreach -A --no-private npm publish ${runArgs.join(' ')}`,
				{
					stdio: 'inherit',
				},
			);

			if (args.dryRun !== true && args.tag !== 'alpha') {
				console.log('Tagging release...');

				await execaCommand('yarn run -T changeset tag', {
					stdio: 'inherit',
				});
			}
		},
	)
	.demandCommand()
	.help()
	.version(false)
	.parse();
