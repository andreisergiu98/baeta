import { execaCommand } from 'execa';
import type { CommandModule } from 'yargs';
import { getConfirmation } from '../lib/confirmation.ts';
import { getPreReleaseTag } from '../lib/release-tag.ts';

export const command = 'release';
export const description = 'Publishes all packages';

interface ReleaseArgs {
	tag: string;
	ci: boolean;
	'skip-build': boolean;
	'dry-run'?: boolean;
	'check-branch'?: string;
	'extra-args'?: string;
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

		if (args.skipBuild !== true) {
			console.log('Building packages...');
			await execaCommand('yarn run -T build', {
				stdio: 'inherit',
			});
		}

		console.log('Publishing packages...');

		const runArgs: string[] = [
			'--tolerate-republish',
			`--tag=${args.tag}`,
			'--provenance',
			args.extraArgs,
			args.dryRun ? '--dry-run' : undefined,
		].filter((el) => el != null);

		await execaCommand(`yarn workspaces foreach -A --no-private npm publish ${runArgs.join(' ')}`, {
			stdio: 'inherit',
		});

		if (args.dryRun !== true && args.tag !== 'alpha') {
			console.log('Tagging release...');
			await execaCommand('yarn run -T changeset tag', {
				stdio: 'inherit',
			});
		}
	},
};
