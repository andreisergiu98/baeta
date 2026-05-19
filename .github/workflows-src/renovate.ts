import createWorkflow from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import {
	and,
	eq,
	interpolate,
	joinStrings,
	not,
	success,
	type Expression,
} from 'github-actions-workflow-builder/lib/expression';
import { useCacheRestore, useCacheSave, useDockerLogin, useRenovate } from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';
import { DEFAULT_NODE, setupNode } from './_shared/setup.ts';

const nodeVersion = DEFAULT_NODE.version;
const renovateCacheKey = 'renovate-cache-v2';
const allowedCommands = ['^yarn install --immutable --immutable-cache$', '^yarn actions:build$'];

export default createWorkflow(
	({ setWorkflowName, addJob, setConcurrency, addTrigger, setPermissions }) => {
		setWorkflowName('Renovate');
		setConcurrency({ group: 'renovate' });
		const dispatch = addTrigger('workflow_dispatch', {
			inputs: {
				cache: {
					required: false,
					default: 'enabled',
					description: 'Cache mode',
					// @ts-expect-error - Missing type definition
					type: 'choice',
					options: ['enabled', 'disabled', 'reset'],
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

		const disableCache = eq(dispatch.inputs.cache, 'disabled');
		const resetCache = eq(dispatch.inputs.cache, 'reset');

		setPermissions({
			contents: 'read',
			actions: 'write',
		});
		addJob('Renovate', ({ add, when, run }) => {
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
					skipInstall: true,
				}),
			);

			const { outputs: yarnInfo } = run<{ version: string }>(
				'Get yarn info',
				joinStrings([`echo "version=$(yarn --version)" >> $GITHUB_OUTPUT`], '\n'),
			);

			const cacheHit = when(not(disableCache), () => {
				const cacheResult = add(
					useCacheRestore({
						stepName: 'Restore Renovate Cache',
						paths: ['/tmp/renovate/cache'],
						key: renovateCacheKey,
					}),
				);

				when(and(resetCache, cacheResult.cacheHit), () => {
					run(
						'Wipe Renovate Cache',
						joinStrings(
							[
								'mv /tmp/renovate/cache/renovate/repository /tmp/renovate-repo-keep',
								'rm -rf /tmp/renovate/cache',
								'mkdir -p /tmp/renovate/cache/renovate',
								'mv /tmp/renovate-repo-keep /tmp/renovate/cache/renovate/repository',
							],
							'\n',
						),
					);
				});

				when(cacheResult.cacheHit, () => {
					run('Fix-up Renovate cache permissions', 'sudo chown -R 12021:0 /tmp/renovate/ || true');
				});

				return cacheResult.cacheHit;
			});

			run('Write Renovate Entrypoint', makeEntrypointScript(nodeVersion, yarnInfo.version), {
				shell: 'bash',
			});

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
					allowedCommands,
				}),
			);

			when(and(success(), not(disableCache)), () => {
				when(cacheHit, () => {
					run('Remove Renovate Cache', `gh cache delete ${renovateCacheKey}`, {
						env: { GH_TOKEN: secrets.GITHUB_TOKEN },
					});
				});
				add(
					useCacheSave({
						stepName: 'Save Renovate Cache',
						paths: ['/tmp/renovate/cache'],
						key: renovateCacheKey,
					}),
				);
			});
		});
	},
);

function makeEntrypointScript(
	nodeVersion: string | Expression<string>,
	yarnVersion: string | Expression<string>,
): Expression<string> {
	return joinStrings(
		[
			`cat > /tmp/renovate-entrypoint.sh <<'EOF'`,
			`#!/bin/bash`,
			`set -e`,
			interpolate`runuser -u ubuntu -- install-tool node ${nodeVersion}`,
			interpolate`runuser -u ubuntu -- install-tool yarn ${yarnVersion}`,
			`exec runuser -u ubuntu --preserve-environment renovate`,
			`EOF`,
			`chmod +x /tmp/renovate-entrypoint.sh`,
		],
		'\n',
	);
}
