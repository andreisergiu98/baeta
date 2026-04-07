import createWorkflow from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import { interpolate } from 'github-actions-workflow-builder/lib/expression';
import { DEFAULT_NODE, setupNode } from './_shared/setup.ts';

export default createWorkflow(
	({ setWorkflowName, setPermissions, setConcurrency, addTrigger, addJob }) => {
		setWorkflowName('Deploy website');
		setPermissions({
			contents: 'write',
			pages: 'write',
			deployments: 'write',
		});
		addTrigger('push', {
			branches: ['next'],
			paths: ['website/**'],
		});
		addTrigger('workflow_dispatch');
		setConcurrency({
			group: interpolate`${github.workflow}-${github.ref}`,
			cancelInProgress: true,
		});

		addJob('deploy', ({ setName, add, run, use }) => {
			setName('Deploy website');
			add(setupNode(DEFAULT_NODE));
			run('yarn docs:build');
			use('peaceiris/actions-gh-pages@4f9cc6602d3f66b9c108549d475ec49e8ef4d45e', {
				with: {
					github_token: secrets['GITHUB_TOKEN'],
					publish_dir: './website/build',
					user_name: 'github-actions[bot]',
					user_email: '41898282+github-actions[bot]@users.noreply.github.com',
				},
			});
		});
	},
);
