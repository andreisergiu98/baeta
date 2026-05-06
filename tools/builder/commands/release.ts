import { execaCommand } from 'execa';
import symbols from 'log-symbols';
import ora from 'ora';
import type { CommandModule } from 'yargs';
import { getConfirmation } from '../lib/confirmation.ts';
import { createReleaseNotes } from '../lib/release-notes.ts';
import { getPreReleaseTag } from '../lib/release-tag.ts';
import {
	getPublicWorkspacePackages,
	isPackagePublished,
	loadWorkspaceProject,
} from '../lib/workspace.ts';

export const command = 'release';
export const description = 'Publishes all packages';

interface ReleaseArgs {
	tag: string;
	ci: boolean;
	'skip-build': boolean;
	'dry-run'?: boolean;
	'check-branch'?: string;
	'extra-args'?: string;
	'create-release'?: boolean;
}

const preReleaseTag = await getPreReleaseTag();

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
			if (args.checkBranch === 'main') {
				if (args.tag !== 'latest') {
					console.error(`${symbols.error} Expected release tag to be "latest" for branch "main"`);
					process.exit(1);
				}
			} else if (args.checkBranch === 'next') {
				if (args.tag !== 'next') {
					console.error(`${symbols.error} Expected release tag to be "next" for branch "next"`);
					process.exit(1);
				}
			} else {
				console.error(`${symbols.error} Invalid branch "${args.checkBranch}"`);
				process.exit(1);
			}
		}

		if (args.skipBuild !== true) {
			console.log(`${symbols.info} Building packages before release...`);
			await execaCommand('yarn run -T build', {
				stdio: 'inherit',
			});
			console.log(`${symbols.success} Build completed successfully`);
		}

		const project = await loadWorkspaceProject();
		const workspacePackages = await Promise.all(
			getPublicWorkspacePackages(project).map(async (pkg) => {
				return {
					...pkg,
					isPublished: await isPackagePublished(pkg.name, pkg.version),
				};
			}),
		);
		const unpublishedPackages = workspacePackages.filter((pkg) => !pkg.isPublished);

		console.log(`${symbols.info} Publishing packages with tag "${args.tag}"...`);

		const runArgs: string[] = [
			'--tolerate-republish',
			`--tag=${args.tag}`,
			!args.dryRun ? '--provenance' : undefined,
			args.dryRun ? '--dry-run' : undefined,
			args.extraArgs,
		].filter((el) => el != null);

		await execaCommand(`yarn workspaces foreach -A --no-private npm publish ${runArgs.join(' ')}`, {
			stdio: 'inherit',
		});

		console.log(`${symbols.success} Packages published successfully`);

		if (args.dryRun !== true && args.tag !== 'alpha') {
			const tagSpinner = ora('Tagging release...').start();
			await execaCommand('yarn run -T changeset tag', {
				stdio: 'inherit',
			});
			tagSpinner.succeed('Release tagged successfully');
		}

		if (args.createRelease && unpublishedPackages.length > 0) {
			await createReleaseNotes({
				packages: unpublishedPackages,
				githubToken: process.env.GITHUB_TOKEN,
				isPrerelease: args.tag !== 'latest',
				dryRun: args.dryRun,
			});
		}
	},
};
