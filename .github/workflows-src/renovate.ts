import createWorkflow from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import {
	interpolate,
	joinStrings,
	neq,
	type Expression,
} from 'github-actions-workflow-builder/lib/expression';
import { actions } from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';
import { DEFAULT_NODE, setupNode } from './_shared/setup.ts';

const allowedCommands = ['^yarn install --immutable --immutable-cache$', '^yarn actions:build$'];
const yarnGlobalDir = '/home/ubuntu/.yarn/berry';
const nodeVersion = DEFAULT_NODE.version;

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

			add(setupNode());

			const yarnInfo = run<{ yarnDir: string; yarnVersion: string }>(
				'Get yarn info',
				joinStrings(
					[
						`echo "yarnDir=$(yarn config get globalFolder)" >> $GITHUB_OUTPUT`,
						`echo "yarnVersion=$(yarn --version)" >> $GITHUB_OUTPUT`,
					],
					'\n',
				),
				{ shell: 'bash' },
			);

			when(neq(dispatch.inputs.cache, 'disabled'), () => {
				use('Use Renovate Cache', actions.cache, {
					with: {
						path: '/tmp/renovate/cache/renovate/repository',
						key: interpolate`renovate-cache-${github.run_id}`,
						'restore-keys': 'renovate-cache-',
					},
				});
				run('Fix-up Renovate cache permissions', 'sudo chown -R 12021:0 /tmp/renovate/ || true');
			});

			run(
				'Fix-up yarn cache permissions',
				interpolate`sudo chown -R 12021:0 ${yarnInfo.outputs.yarnDir}`,
			);

			run(
				'Write Renovate Entrypoint',
				makeEntrypointScript(nodeVersion, yarnInfo.outputs.yarnVersion),
				{
					shell: 'bash',
				},
			);

			use('Run Renovate', actions.renovate, {
				with: {
					token: getToken.outputs.token,
					configurationFile: '.github/renovate.json',
					'docker-user': 'root',
					'docker-cmd-file': '/tmp/renovate-entrypoint.sh',
					'docker-volumes': interpolate`/tmp:/tmp;${yarnInfo.outputs.yarnDir}:${yarnGlobalDir}`,
				},
				env: {
					RENOVATE_REPOSITORY_CACHE: dispatch.inputs.cache,
					RENOVATE_PLATFORM_COMMIT: 'enabled',
					RENOVATE_REPOSITORIES: github.repository,
					RENOVATE_ALLOWED_COMMANDS: JSON.stringify(allowedCommands),
					RENOVATE_CUSTOM_ENV_VARIABLES: JSON.stringify({
						YARN_GLOBAL_FOLDER: yarnGlobalDir,
						YARN_ENABLE_GLOBAL_CACHE: 'true',
					}),
					LOG_LEVEL: dispatch.inputs.logLevel,
					NODE_OPTIONS: '--max-old-space-size=4096',
				},
			});

			run(
				'Restore yarn cache permissions',
				interpolate`sudo chown -R $(id -u):$(id -g) ${yarnInfo.outputs.yarnDir}`,
			);
		});
	},
);

function makeEntrypointScript(
	nodeVersion: string | Expression<string>,
	yarnVersion: string | Expression<string>,
): string {
	return [
		`cat > /tmp/renovate-entrypoint.sh <<'EOF'`,
		`#!/bin/bash`,
		`set -e`,
		`runuser -u ubuntu -- install-tool node ${nodeVersion}`,
		`runuser -u ubuntu -- install-tool yarn ${yarnVersion}`,
		`exec runuser -u ubuntu --preserve-environment renovate`,
		`EOF`,
		`chmod +x /tmp/renovate-entrypoint.sh`,
	].join('\n');
}
