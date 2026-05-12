import createWorkflow from 'github-actions-workflow-builder';
import { github } from 'github-actions-workflow-builder/context';
import {
	and,
	type ContextValue,
	eq,
	neq,
	or,
	startsWith,
} from 'github-actions-workflow-builder/lib/expression';
import { actions } from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';

const BOT_LOGIN = 'baeta-bot[bot]';

export default createWorkflow(
	({ setWorkflowName, addJob, setConcurrency, addTrigger, when, setPermissions }) => {
		setWorkflowName('Renovate');
		setConcurrency({
			group: `renovate`,
		});
		addTrigger('schedule', [
			{
				cron: '0 */4 * * *',
			},
		]);
		addTrigger('workflow_dispatch');
		addTrigger('push', {
			branches: ['main', 'next'],
			paths: ['.github/renovate.json', '.github/workflows/renovate.yml'],
		});
		addTrigger('issues', {
			types: ['edited', 'closed'],
		});
		addTrigger('pull_request_target', {
			types: ['edited'],
		});
		setPermissions({
			contents: 'read',
		});

		when(
			or(
				and(neq(github.event_name, 'issues'), neq(github.event_name, 'pull_request_target')),
				and(eq(github.event_name, 'issues'), issueEditedByBot()),
				and(
					eq(github.event_name, 'pull_request_target'),
					startsWith(github.head_ref, 'renovate/'),
					prEditedByBot(),
				),
			),
			() => {
				addJob('Renovate', ({ use, add }) => {
					const getToken = add(useBaetaBotToken());
					use('Checkout', actions.checkout);
					use('Run Renovate', actions.renovate, {
						with: {
							token: getToken.outputs.token,
							configurationFile: '.github/renovate.json',
						},
						env: {
							RENOVATE_PLATFORM_COMMIT: 'enabled',
							RENOVATE_REPOSITORIES: github.repository,
							LOG_LEVEL: 'debug',
							NODE_OPTIONS: '--max-old-space-size=4096',
						},
					});
				});
			},
		);
	},
);

function issueEditedByBot() {
	const issueEvent = github.event as ContextValue<{
		issue: {
			user: {
				login: string;
			};
		};
		sender: {
			login: string;
		};
	}>;
	return and(eq(issueEvent.issue.user.login, BOT_LOGIN), neq(issueEvent.sender.login, BOT_LOGIN));
}

function prEditedByBot() {
	const prEvent = github.event as ContextValue<{
		pull_request: {
			user: {
				login: string;
			};
		};
		sender: {
			login: string;
		};
	}>;
	return and(eq(prEvent.pull_request.user.login, BOT_LOGIN), neq(prEvent.sender.login, BOT_LOGIN));
}
