import createWorkflow from 'github-actions-workflow-builder';
import { github } from 'github-actions-workflow-builder/context';
import {
	and,
	type ContextValue,
	eq,
	joinStrings,
	neq,
	or,
	startsWith,
} from 'github-actions-workflow-builder/lib/expression';
import { useGithubScript } from './_shared/actions.ts';

const BOT_LOGIN = 'baeta-bot[bot]';

export default createWorkflow(({ setWorkflowName, addJob, addTrigger, when, setPermissions }) => {
	setWorkflowName('Renovate Dispatch');
	addTrigger('schedule', [
		{
			cron: '0 */4 * * *',
		},
	]);
	addTrigger('push', {
		branches: ['main'],
		paths: ['.github/renovate.json', '.github/workflows/renovate.yml'],
	});
	addTrigger('issues', {
		types: ['edited', 'closed'],
	});
	addTrigger('pull_request_target', {
		types: ['edited', 'closed'],
	});
	setPermissions({
		contents: 'read',
		actions: 'write',
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
			addJob('renovate-dispatch', ({ add, setTimeout }) => {
				setTimeout(10);
				add(
					useGithubScript({
						stepName: 'Dispatch Renovate',
						script: joinStrings(
							[
								'const hour = new Date().getUTCHours();',
								'const isResetSlot = context.eventName === "schedule" && hour >= 2 && hour < 6;',
								'const cache = isResetSlot ? "reset" : "enabled";',
								'await github.rest.actions.createWorkflowDispatch({',
								'  owner: context.repo.owner,',
								'  repo: context.repo.repo,',
								'  workflow_id: "renovate.yml",',
								'  ref: context.payload.repository.default_branch,',
								'  inputs: { cache },',
								'});',
							],
							'\n',
						),
					}),
				);
			});
		},
	);
});

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
