import createWorkflow, { type Steps } from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import { and, eq, interpolate, not, or } from 'github-actions-workflow-builder/lib/expression';
import { useGhPages } from './_shared/actions.ts';
import { setupNode } from './_shared/setup.ts';

export default createWorkflow(({ setWorkflowName, setConcurrency, addTrigger, addJob, when }) => {
	setWorkflowName('Build website');
	addTrigger('push', {
		branches: ['main'],
		paths: ['website/**', 'yarn.lock'],
	});
	addTrigger('pull_request', {
		paths: ['website/**', 'yarn.lock'],
	});
	addTrigger('workflow_dispatch');

	setConcurrency({
		group: interpolate`${github.workflow}-\${{ github.head_ref || github.run_id }}`,
		cancelInProgress: true,
	});

	const isReleaseEvent = and(
		eq(github.repository, 'andreisergiu98/baeta'),
		or(eq(github.event_name, 'push'), eq(github.event_name, 'workflow_dispatch')),
	);

	when(not(isReleaseEvent), () => {
		addJob('build', ({ add }) => {
			add(buildWebsite(false));
		});
	});

	when(isReleaseEvent, () => {
		addJob('release', ({ add }) => {
			add(buildWebsite(true));
		});
	});
});

function buildWebsite(withRelease: boolean): Steps {
	return ({ setName, add, run, setConcurrency, setPermissions }) => {
		if (withRelease) {
			setName('Release website');
			setConcurrency({
				group: 'publish-website',
				cancelInProgress: false,
			});
			setPermissions({
				contents: 'write',
				pages: 'write',
				deployments: 'write',
			});
			add(setupNode({ enableYarnHardenedMode: true }));
		} else {
			setName('Build website');
			setPermissions({
				contents: 'read',
			});
			add(setupNode());
		}

		run('yarn docs:build');

		if (withRelease) {
			add(
				useGhPages({
					stepName: 'Deploy website',
					githubToken: secrets.GITHUB_TOKEN,
					publishDir: './website/build',
					userName: 'github-actions[bot]',
					userEmail: '41898282+github-actions[bot]@users.noreply.github.com',
				}),
			);
		}
	};
}
