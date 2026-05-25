import createWorkflow from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import {
	and,
	eq,
	interpolate,
	joinStrings,
	neq,
	not,
	success,
	type Expression,
} from 'github-actions-workflow-builder/lib/expression';
import {
	useCacheRestore,
	useCacheSave,
	useDockerLogin,
	useDownloadArtifact,
	useRenovate,
	useUploadArtifact,
} from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';
import { setupNode } from './_shared/setup.ts';

const allowedCommands = ['^yarn install --immutable$', '^yarn actions:build$'];

const renovateCacheDir = '/tmp/renovate/cache';
const renovateCacheKey = 'renovate-cache-v2';
const renovateRepositoryCacheName = 'renovate-repository-cache';
const renovateRepositoryCacheDir = '/tmp/renovate/cache/renovate/repository';

export default createWorkflow(
	({ setWorkflowName, addJob, setConcurrency, addTrigger, setPermissions }) => {
		setWorkflowName('Renovate');
		setConcurrency({ group: 'renovate' });
		setPermissions({
			contents: 'read',
			actions: 'write',
		});

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
				'Get Yarn info',
				joinStrings([`echo "version=$(yarn --version)" >> $GITHUB_OUTPUT`], '\n'),
			);

			const { outputs: nodeInfo } = run<{ version: string }>(
				'Get Node.js info',
				joinStrings([`echo "version=$(node --version | sed 's/^v//')" >> $GITHUB_OUTPUT`], '\n'),
			);

			when(not(disableCache), () => {
				when(not(resetCache), () => {
					add(
						useCacheRestore({
							stepName: 'Restore Renovate Cache',
							paths: [renovateCacheDir],
							key: renovateCacheKey,
						}),
					);
				});

				run(
					'Prepare Renovate repository cache dir',
					joinStrings(
						[
							`rm -rf ${renovateRepositoryCacheDir} || true`,
							`mkdir -p ${renovateRepositoryCacheDir}`,
						],
						'\n',
					),
				);

				const { outputs: lastRun } = run<{ runId: string }>(
					'Get last Renovate run id',
					joinStrings(
						[
							interpolate`run_id=$(gh run list --workflow="${github.workflow}" --branch="\${{ github.ref_name }}" --status=success --limit=1 --json databaseId --jq '.[0].databaseId  // empty')`,
							`echo "runId=$run_id" >> $GITHUB_OUTPUT`,
						],
						'\n',
					),
					{
						env: { GH_TOKEN: secrets.GITHUB_TOKEN },
					},
				);

				when(neq(lastRun.runId, ''), () => {
					add(
						useDownloadArtifact({
							stepName: 'Download Renovate repository cache',
							name: renovateRepositoryCacheName,
							path: renovateRepositoryCacheDir,
							runId: lastRun.runId,
							githubToken: secrets.GITHUB_TOKEN,
							continueOnError: true,
						}),
					);
				});

				run('Fix-up Renovate cache permissions', 'sudo chown -R 12021:0 /tmp/renovate/ || true');
			});

			run('Write Renovate entrypoint', makeEntrypointScript(nodeInfo.version, yarnInfo.version), {
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

			when(and(not(disableCache), success()), () => {
				add(
					useUploadArtifact({
						stepName: 'Upload Renovate repository cache',
						name: renovateRepositoryCacheName,
						path: renovateRepositoryCacheDir,
						retentionDays: 1,
					}),
				);
				run('Remove Renovate cache', `gh cache delete ${renovateCacheKey} || true`, {
					env: { GH_TOKEN: secrets.GITHUB_TOKEN },
				});
				add(
					useCacheSave({
						stepName: 'Save Renovate Cache',
						paths: [renovateCacheDir],
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
