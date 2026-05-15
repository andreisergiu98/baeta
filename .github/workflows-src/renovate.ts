import createWorkflow from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import {
	interpolate,
	joinStrings,
	neq,
	type Expression,
} from 'github-actions-workflow-builder/lib/expression';
import { useCache, useDockerLogin, useRenovate } from './_shared/actions.ts';
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

			add(
				useDockerLogin({
					stepName: 'Login to ghcr.io',
					registry: 'ghcr.io',
					username: github.actor,
					password: secrets.GITHUB_TOKEN,
				}),
			);

			add(
				setupNode({
					yarnCacheNamespace: 'renovate',
				}),
			);

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
				add(
					useCache({
						stepName: 'Setup Renovate Cache',
						paths: ['/tmp/renovate/cache/renovate/repository'],
						key: interpolate`renovate-cache-${github.run_id}`,
						restoreKeys: ['renovate-cache-'],
					}),
				);
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

			add(
				useRenovate({
					token: getToken.token,
					configurationFile: '.github/renovate.json',
					logLevel: dispatch.inputs.logLevel,
					repositoryCache: dispatch.inputs.cache,
					platformCommit: 'enabled',
					repositories: github.repository,
					nodeOptions: '--max-old-space-size=4096',
					dockerUser: 'root',
					dockerCmdFile: '/tmp/renovate-entrypoint.sh',
					dockerVolumes: ['/tmp:/tmp', `${yarnInfo.outputs.yarnDir}:${yarnGlobalDir}`],
					allowedCommands,
					customEnvVariables: {
						YARN_GLOBAL_FOLDER: yarnGlobalDir,
						YARN_ENABLE_GLOBAL_CACHE: 'true',
					},
				}),
			);

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
