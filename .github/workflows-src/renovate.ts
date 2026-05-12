import createWorkflow from 'github-actions-workflow-builder';
import { github, runner } from 'github-actions-workflow-builder/context';
import { interpolate, neq } from 'github-actions-workflow-builder/lib/expression';
import { actions } from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';
import { setupNode } from './_shared/setup.ts';

const allowedCommands = ['^yarn install$', '^yarn actions:build$'];

export default createWorkflow(
	({ setWorkflowName, addJob, setConcurrency, addTrigger, setPermissions }) => {
		setWorkflowName('Renovate');
		setConcurrency({ group: 'renovate' });

		const dispatch = addTrigger('workflow_dispatch', {
			inputs: {
				cache: {
					required: false,
					default: 'enabled',
					description: 'Enable Renovate cache',
					// @ts-expect-error - Missing type definition
					type: 'choice',
					options: ['enabled', 'disabled'],
				},
				logLevel: {
					required: false,
					default: 'info',
					description: 'Log level for Renovate',
					// @ts-expect-error - Missing type definition
					type: 'choice',
					options: ['debug', 'info'],
				},
			},
		});

		setPermissions({
			contents: 'read',
		});

		addJob('Renovate', ({ use, add, when, run }) => {
			const getToken = add(useBaetaBotToken());

			add(setupNode());

			when(neq(dispatch.inputs.cache, 'disabled'), () => {
				use('Use Renovate Cache', actions.cache, {
					with: {
						path: '/tmp/renovate/cache/renovate/repository',
						key: interpolate`renovate-cache-${github.run_id}`,
						'restore-keys': 'renovate-cache-',
					},
				});
			});

			use('Cache Renovate Install', actions.cache, {
				with: {
					path: '~/.npm',
					key: interpolate`renovate-npm-cache-${runner.os}`,
					'restore-keys': 'renovate-npm-cache-',
				},
			});

			run('Run Renovate', 'npx --yes renovate', {
				env: {
					RENOVATE_TOKEN: getToken.outputs.token,
					RENOVATE_CONFIG_FILE: '.github/renovate.json',
					RENOVATE_REPOSITORY_CACHE: dispatch.inputs.cache,
					RENOVATE_PLATFORM_COMMIT: 'enabled',
					RENOVATE_REPOSITORIES: github.repository,
					RENOVATE_ALLOWED_COMMANDS: JSON.stringify(allowedCommands),
					LOG_LEVEL: dispatch.inputs.logLevel,
					NODE_OPTIONS: '--max-old-space-size=4096',
				},
			});
		});
	},
);
