import createWorkflow from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import { interpolate, neq } from 'github-actions-workflow-builder/lib/expression';
import { actions } from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';

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

			use('Login to ghcr.io', actions.dockerLogin, {
				with: {
					registry: 'ghcr.io',
					username: github.actor,
					password: secrets.GITHUB_TOKEN,
				},
			});

			use('Checkout', actions.checkout);

			when(neq(dispatch.inputs.cache, 'disabled'), () => {
				use('Use Renovate Cache', actions.cache, {
					with: {
						path: '/tmp/renovate/cache/renovate/repository',
						key: interpolate`renovate-cache-${github.run_id}`,
						'restore-keys': 'renovate-cache-',
					},
				});
				run('Fix cache permissions', 'sudo chown -R 12021:0 /tmp/renovate/ || true');
			});

			use('Run Renovate', actions.renovate, {
				with: {
					token: getToken.outputs.token,
					configurationFile: '.github/renovate.json',
				},
				env: {
					RENOVATE_REPOSITORY_CACHE: dispatch.inputs.cache,
					RENOVATE_PLATFORM_COMMIT: 'enabled',
					RENOVATE_REPOSITORIES: github.repository,
					LOG_LEVEL: dispatch.inputs.logLevel,
					NODE_OPTIONS: '--max-old-space-size=4096',
				},
			});
		});
	},
);
