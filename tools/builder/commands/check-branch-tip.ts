import { appendFile } from 'node:fs/promises';
import * as github from '@actions/github';
import symbols from 'log-symbols';
import type { CommandModule } from 'yargs';

export const checkBranchTipCommand: CommandModule<{}, {}> = {
	command: 'check-branch-tip',
	describe:
		'Check whether the triggering commit is still the tip of its branch and expose the result as the `is_tip` GitHub Actions output',
	builder: (yargs) => {
		return yargs;
	},
	handler: async () => {
		const githubToken = process.env.GITHUB_TOKEN;
		if (!githubToken) {
			throw new Error('GITHUB_TOKEN environment variable is required to check the branch tip');
		}

		const octokit = github.getOctokit(githubToken);
		const result = await octokit.rest.repos.getBranch({
			...github.context.repo,
			branch: github.context.ref.replace(/^refs\/heads\//, ''),
		});

		const isTip = result.data.commit.sha === github.context.sha;

		if (isTip) {
			console.log(
				`${symbols.success} Commit ${github.context.sha} is the tip of ${github.context.ref}.`,
			);
		} else {
			console.warn(
				`${symbols.warning} Commit ${github.context.sha} is no longer the tip of ${github.context.ref} (tip is ${result.data.commit.sha}).`,
			);
		}

		const outputFile = process.env.GITHUB_OUTPUT;
		if (outputFile) {
			await appendFile(outputFile, `isTip=${JSON.stringify(isTip)}\n`);
		}
	},
};
