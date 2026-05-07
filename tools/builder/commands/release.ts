import { writeFile } from 'node:fs/promises';
import { execa, execaCommand } from 'execa';
import symbols from 'log-symbols';
import ora from 'ora';
import type { CommandModule } from 'yargs';
import { getConfirmation } from '../lib/confirmation.ts';
import {
	createPackagesVersionTags,
	createReleaseNotes,
	createReleaseNotesMetadata,
} from '../lib/github.ts';
import { getPreReleaseTag } from '../lib/release-tag.ts';
import {
	getPublicWorkspacePackages,
	isPackagePublished,
	loadWorkspaceProject,
	type PublicWorkspacePackage,
} from '../lib/workspace.ts';

interface ReleaseArgs {
	tag: string;
	ci: boolean;
	'skip-build': boolean;
	'dry-run'?: boolean;
	'check-branch'?: string;
	'extra-args'?: string;
	'create-release'?: boolean;
	'create-tags'?: boolean;
}

const preReleaseTag = await getPreReleaseTag();
const branchTagMap = new Map<string, string>([
	['main', 'latest'],
	['next', 'next'],
]);

// biome-ignore lint/complexity/noBannedTypes: Empty dictionary
export const releaseCommand: CommandModule<{}, ReleaseArgs> = {
	command: 'release',
	describe: 'Publish all packages',
	builder: (yargs) => {
		return yargs
			.option('tag', {
				describe: 'The tag to use for the release. By default respects the changeset tag',
				type: 'string',
				default: preReleaseTag,
			})
			.option('ci', {
				describe: 'Whether to run in CI mode',
				type: 'boolean',
				default: false,
			})
			.option('check-branch', {
				describe: 'Check if the current branch is matching the expected release tag',
				type: 'string',
			})
			.option('skip-build', {
				describe: 'Skip building the packages',
				type: 'boolean',
				default: false,
			})
			.option('dry-run', {
				describe: 'Perform a dry run instead of publishing',
				type: 'boolean',
			})
			.option('extra-args', {
				describe: 'Extra arguments to pass to the npm publish command',
				type: 'string',
			})
			.option('create-release', {
				describe: 'Whether to create a GitHub release for this release',
				type: 'boolean',
				default: false,
			})
			.option('create-tags', {
				describe: 'Whether to create version tags for each released package',
				type: 'boolean',
				default: false,
			});
	},
	handler: async (args) => {
		if (args.ci === false) {
			const confirmedReleaseTag = await getConfirmation(
				`This will publish all packages using the release tag "${args.tag}". Continue?`,
			);

			if (!confirmedReleaseTag) {
				process.exit(1);
			}
		}

		if (args.checkBranch !== undefined) {
			const expectedTag = branchTagMap.get(args.checkBranch);
			if (!expectedTag) {
				throw new Error(`Invalid branch "${args.checkBranch}"`);
			}
			if (args.tag !== expectedTag) {
				throw new Error(
					`Expected release tag to be "${expectedTag}" for branch "${args.checkBranch}"`,
				);
			}
		}

		if (args.createRelease) {
			assertReleasableTag(args.tag, 'Creating GitHub release');
		}

		if (args.createTags) {
			assertReleasableTag(args.tag, 'Creating version tags');
		}

		if (args.skipBuild !== true) {
			await runBuild();
		}

		const packages = await getPackagesForPublish();

		await runPublish({
			packages,
			tag: args.tag,
			dryRun: args.dryRun,
			extraArgs: args.extraArgs,
		});

		if (args.createRelease) {
			await runCreateGithubRelease({
				packages,
				tag: args.tag,
				dryRun: args.dryRun,
			});
		}

		if (args.createTags) {
			await runCreateVersionTags({
				packages,
				dryRun: args.dryRun,
			});
		}
	},
};

async function getPackagesForPublish() {
	const project = await loadWorkspaceProject();
	const workspacePackages = await Promise.all(
		getPublicWorkspacePackages(project).map(async (pkg) => {
			return {
				...pkg,
				isPublished: await isPackagePublished(pkg.name, pkg.version),
			};
		}),
	);
	return workspacePackages.filter((pkg) => !pkg.isPublished);
}

async function runBuild() {
	console.log(`${symbols.info} Building packages before release...`);
	await execaCommand('yarn run -T build', {
		stdio: 'inherit',
	});
	console.log(`${symbols.success} Build completed successfully`);
}

interface PublishOptions {
	packages: PublicWorkspacePackage[];
	tag: string;
	dryRun?: boolean;
	extraArgs?: string;
}

async function runPublish({ packages, tag, dryRun, extraArgs }: PublishOptions) {
	if (packages.length === 0) {
		console.warn(`${symbols.warning} No unpublished packages found, skipping publish step`);
		return;
	}

	console.log(`${symbols.info} Publishing packages with tag "${tag}"...`);

	const runArgs: string[] = [`--tag=${tag}`, !dryRun ? '--provenance' : '--dry-run'];
	if (extraArgs) {
		runArgs.push(extraArgs);
	}

	for (const pkg of packages) {
		console.log(`${symbols.info} Will publish ${pkg.name}@${pkg.version}`);
		await execa('yarn', ['workspace', pkg.name, 'npm', 'publish', ...runArgs], {
			stdio: 'inherit',
		});
	}

	console.log(`${symbols.success} Packages published successfully`);
}

interface CreateGithubReleaseOptions {
	packages: PublicWorkspacePackage[];
	tag: string;
	dryRun?: boolean;
}

async function runCreateGithubRelease({ packages, tag, dryRun }: CreateGithubReleaseOptions) {
	if (packages.length === 0) {
		console.warn(
			`${symbols.warning} No unpublished packages found, skipping GitHub release creation`,
		);
		return;
	}

	const isPrerelease = tag !== 'latest';

	if (dryRun) {
		const metadata = await createReleaseNotesMetadata({
			packages: packages,
			isPrerelease,
		});
		console.log(
			`${symbols.info} Would create GitHub release with name: ${metadata.name} and tag: ${metadata.tag_name}`,
		);
		await writeFile('release-notes.md', metadata.body, 'utf-8');
		return;
	}

	const githubToken = process.env.GITHUB_TOKEN;
	if (!githubToken) {
		throw new Error('GITHUB_TOKEN environment variable is required to create a GitHub release');
	}

	const spinner = ora('Creating GitHub release...').start();

	const metadata = await createReleaseNotesMetadata({
		packages,
		isPrerelease,
	});

	await createReleaseNotes({
		metadata,
		githubToken,
	});

	spinner.succeed(
		`GitHub release created successfully with name: ${metadata.name} and tag: ${metadata.tag_name}`,
	);
}

interface CreateVersionTagsOptions {
	packages: PublicWorkspacePackage[];
	dryRun?: boolean;
}

async function runCreateVersionTags({ packages, dryRun }: CreateVersionTagsOptions) {
	if (packages.length === 0) {
		console.warn(`${symbols.warning} No unpublished packages found, skipping version tag creation`);
		return;
	}

	if (dryRun) {
		const tags = packages.map((pkg) => `  - ${pkg.name}@${pkg.version}`).join('\n');
		console.log(`${symbols.info} Would create version tags for the following packages:\n${tags}`);
		return;
	}

	const githubToken = process.env.GITHUB_TOKEN;
	if (!githubToken) {
		throw new Error('GITHUB_TOKEN environment variable is required to create version tags');
	}

	const spinner = ora('Tagging packages...').start();

	await createPackagesVersionTags({
		packages,
		githubToken,
	});

	spinner.succeed('Packages tagged successfully');
}

function assertReleasableTag(tag: string, feature: string) {
	if (tag !== 'latest' && tag !== 'next') {
		throw new Error(`${feature} is only supported for "latest" and "next" tags`);
	}
}
