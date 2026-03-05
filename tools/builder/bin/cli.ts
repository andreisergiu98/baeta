#! /usr/bin/env node

import { glob, writeFile } from 'node:fs/promises';
import { execaCommand } from 'execa';
import madge from 'madge';
import { build } from 'tsdown';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { checkExportFilesExist } from '../lib/check-dist.ts';
import { getConfirmation } from '../lib/confirmation.ts';
import { loadPackageJson } from '../lib/package-json.ts';
import { prepClean, prepGenerate } from '../lib/prep.ts';
import { getPreReleaseTag } from '../lib/release-tag.ts';
import {
	getWorkspaceVersions,
	isCatalogSpecifier,
	isWorkspaceSpecifier,
	resolveCatalogSpecifier,
	resolveWorkspaceSpecifier,
} from '../lib/workspace-versions.ts';

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
			await build();
			await checkExportFilesExist();
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
				.option('check-branch', {
					describe: 'Check if the current branch is matching the expected release',
					type: 'string',
				})
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
			const runArgs: string[] = ['--tolerate-republish', `--tag=${args.tag}`, '--provenance'];

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

			if (args.checkBranch !== undefined) {
				if (args.checkBranch === 'main') {
					if (args.tag !== 'latest') {
						console.error(`Expected release tag to be "latest" for branch "main"`);
						process.exit(1);
					}
				} else if (args.checkBranch === 'next') {
					if (args.tag !== 'next') {
						console.error(`Expected release tag to be "next" for branch "next"`);
						process.exit(1);
					}
				} else {
					console.error(`Invalid branch "${args.checkBranch}"`);
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
	.command(
		'print-resolved-versions <target>',
		'Prints the versions of the workspace dependencies',
		(yargs) => {
			return yargs
				.positional('target', {
					describe: 'The target package.json to resolve the versions for',
					type: 'string',
					default: `${process.cwd()}/package.json`,
				})
				.option('out', {
					describe:
						'Output file to write the resolved versions to. If not provided, prints to stdout.',
					type: 'string',
					alias: 'o',
				});
		},
		async (args) => {
			const pkg = await loadPackageJson(args.target);
			const { workspaceVersions, defaultCatalog, namedCatalogs } = await getWorkspaceVersions();
			const fields = ['dependencies', 'devDependencies', 'peerDependencies'] as const;
			const results: Record<(typeof fields)[number], Record<string, string | undefined>> = {
				dependencies: {},
				devDependencies: {},
				peerDependencies: {},
			};

			for (const field of fields) {
				for (const [name, version] of Object.entries(pkg[field] ?? {})) {
					if (version == null) continue;
					if (isWorkspaceSpecifier(version)) {
						results[field][name] = resolveWorkspaceSpecifier(name, version, workspaceVersions);
					} else if (isCatalogSpecifier(version)) {
						results[field][name] = resolveCatalogSpecifier(
							name,
							version,
							defaultCatalog,
							namedCatalogs,
						);
					}
				}
			}

			const output = JSON.stringify(results, null, 2);

			if (args.out) {
				await writeFile(args.out, output, 'utf-8');
			} else {
				process.stdout.write(output);
			}
		},
	)
	.demandCommand()
	.help()
	.version(false)
	.parse();
