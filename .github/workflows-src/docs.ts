import createWorkflow, { type Steps } from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import { eq, interpolate } from 'github-actions-workflow-builder/lib/expression';
import { useGhPages } from './_shared/actions.ts';
import { setupNode } from './_shared/setup.ts';

export default createWorkflow(
	({ setWorkflowName, setPermissions, setConcurrency, addTrigger, addJob }) => {
		setWorkflowName('Build website');
		setPermissions({
			contents: 'write',
			pages: 'write',
			deployments: 'write',
		});
		addTrigger('push', {
			branches: ['next'],
			paths: ['website/**'],
		});
		addTrigger('pull_request', {
			paths: ['website/**'],
		});
		addTrigger('workflow_dispatch');
		setConcurrency({
			group: interpolate`${github.workflow}-${github.ref}`,
			cancelInProgress: true,
		});

		addJob('build', ({ setName, add, run, whenTrigger, when }) => {
			setName('Build website');
			add(setupNode());
			run('yarn docs:build');
			when(eq(github.repository, 'andreisergiu98/baeta'), () => {
				whenTrigger('workflow_dispatch', () => {
					add(deployWebsite());
				});
				whenTrigger('push', () => {
					add(deployWebsite());
				});
			});
		});
	},
);

function deployWebsite(): Steps {
	return ({ add }) => {
		add(
			useGhPages({
				stepName: 'Deploy website',
				githubToken: secrets.GITHUB_TOKEN,
				publishDir: './website/build',
				userName: 'github-actions[bot]',
				userEmail: '41898282+github-actions[bot]@users.noreply.github.com',
			}),
		);
	};
}
