import createWorkflow from 'github-actions-workflow-builder';
import { github } from 'github-actions-workflow-builder/context';
import { interpolate, joinStrings } from 'github-actions-workflow-builder/lib/expression';
import { setupNode } from './_shared/setup.ts';

export default createWorkflow(
	({ setWorkflowName, setPermissions, setConcurrency, addTrigger, addJob }) => {
		setWorkflowName('Security');
		setPermissions({
			contents: 'read',
		});
		addTrigger('push', {
			branches: ['main', 'next'],
		});
		addTrigger('pull_request');
		addTrigger('workflow_dispatch');
		addTrigger('schedule', [
			{
				cron: '0 3 * * *',
			},
		]);
		setConcurrency({
			group: interpolate`${github.workflow}-${github.ref}`,
			cancelInProgress: true,
		});

		addJob('supply-chain-check', ({ setName, run, add, setTimeout }) => {
			setName('Supply chain check');
			setTimeout(10);
			add(setupNode({ skipInstall: true }));
			run('npm install -g sfw@2.0.4');
			run('sfw yarn install --immutable');
			run(
				'Run yarn lockfile-lint --path yarn.lock',
				joinStrings(
					[
						'yarn lockfile-lint',
						'--path yarn.lock',
						'--type yarn',
						'--validate-integrity',
						'--allowed-hosts npm yarn',
						'--validate-package-names',
						'--allowed-schemes "npm:" "workspace:" "patch:"',
					],
					' ',
				),
			);
		});
	},
);
