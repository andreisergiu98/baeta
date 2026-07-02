import createWorkflow from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import {
	and,
	eq,
	interpolate,
	joinStrings,
	neq,
	or,
	startsWith,
} from 'github-actions-workflow-builder/lib/expression';
import { useCache, useChangesets, useUploadArtifact } from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';
import { e2e } from './_shared/e2e.ts';
import { createNodeVersion, setNodeBuildMatrix } from './_shared/node.ts';
import { redisHttpService, redisService, valkeyService } from './_shared/services.ts';
import { setupNode, turboCaches } from './_shared/setup.ts';

const PR_TEST_MATRIX = {
	node: [createNodeVersion('22')],
};
const MAIN_TEST_MATRIX = {
	node: [createNodeVersion('22'), createNodeVersion('24'), createNodeVersion('26')],
};
const E2E_PLATFORMS = ['ubuntu-latest', 'windows-latest', 'macos-latest'];
const E2E_PLATFORM_NODE = createNodeVersion('26');
const E2E_GRAPHQL_VERSIONS = ['16.6.0', '17.0.0', '^17.0.0'];

export default createWorkflow(
	({ setWorkflowName, setPermissions, setConcurrency, addTrigger, addJob, whenTrigger, when }) => {
		setPermissions({
			contents: 'read',
		});
		setWorkflowName('Build');
		addTrigger('push', {
			branches: ['main', 'next'],
		});
		addTrigger('pull_request');
		addTrigger('workflow_dispatch', {
			inputs: {
				tag: {
					description: 'Release tag',
					required: true,
					default: 'alpha',
				},
			},
		});

		setConcurrency({
			group: interpolate`${github.workflow}-\${{ github.head_ref || github.run_id }}`,
			cancelInProgress: true,
		});

		const buildJob = addJob('build', ({ setName, add, run }) => {
			setName('Check build');
			add(setupNode({ turboCache: turboCaches.build }));
			run('yarn build');
			add(
				useUploadArtifact({
					stepName: 'Upload package dist',
					name: 'package-dist',
					path: 'packages/*/dist',
					ifNoFilesFound: 'error',
					retentionDays: 1,
				}),
			);
		});

		const typesJob = addJob('types', ({ setName, add, run }) => {
			setName('Check types');
			add(setupNode({ turboCache: turboCaches.types }));
			run('yarn check:types');
		});

		const lintJob = addJob('lint', ({ setName, add, run }) => {
			setName('Check linting');
			add(setupNode());
			add(
				useCache({
					stepName: 'Setup ESLint Cache',
					paths: ['.cache/eslint'],
					key: interpolate`eslint-${github.sha}`,
					restoreKeys: ['eslint-'],
				}),
			);
			run('yarn check:linting');
		});

		addJob('formatting', ({ setName, add, run }) => {
			setName('Check formatting');
			add(setupNode());
			run('yarn check:formatting');
		});

		const depsJob = addJob('dependencies', ({ setName, add, run }) => {
			setName('Check dependencies');
			add(setupNode({ turboCache: turboCaches.deps }));
			run('yarn check:deps');
		});

		const constraintsJob = addJob('constraints', ({ setName, add, run }) => {
			setName('Check package constraints');
			add(setupNode());
			run('yarn check:constraints');
		});

		const lockfileJob = addJob('yarn-dedupe', ({ setName, add, run }) => {
			setName('Check yarn dedupe');
			add(setupNode({ enableYarnHardenedMode: true }));
			run('yarn dedupe --check');
		});

		const buildExamplesJob = addJob('build-examples', ({ setName, add, run }) => {
			setName('Check examples');
			add(setupNode({ turboCache: turboCaches.examples }));
			run('yarn examples:build');
			run('yarn examples:types');
		});

		const testsJob = addJob('tests', ({ setName, add, run }) => {
			const matrix = add(
				setNodeBuildMatrix(
					{
						pr: PR_TEST_MATRIX,
						default: MAIN_TEST_MATRIX,
					},
					{ failFast: false },
				),
			);
			setName(`Check tests - Node ${matrix.node}`);
			add(redisService(65535));
			add(valkeyService(65534));
			add(redisHttpService(60080));
			add(setupNode({ node: matrix, turboCache: turboCaches.tests }));
			run('yarn check:tests');
		});

		const e2eNodeJob = addJob('e2e-node', ({ setName, add }) => {
			const matrix = add(
				setNodeBuildMatrix(
					{
						pr: PR_TEST_MATRIX,
						default: MAIN_TEST_MATRIX,
					},
					{ failFast: false },
				),
			);
			setName(`Check e2e tests - Node ${matrix.node}`);
			add(
				e2e({
					buildJob,
					node: matrix,
					turboCache: turboCaches.e2eNode,
				}),
			);
		});

		const e2eGraphqlJob = addJob('e2e-graphql', ({ setName, add }) => {
			const matrix = add(({ setBuildMatrix }) =>
				setBuildMatrix({ graphql: E2E_GRAPHQL_VERSIONS }, { failFast: false }),
			);
			setName(`Check e2e tests - GraphQL ${matrix.graphql}`);
			add(
				e2e({
					buildJob,
					graphql: matrix.graphql,
					turboCache: turboCaches.e2eGraphql(matrix.graphql),
				}),
			);
		});

		const e2ePlatformJob = addJob(
			'e2e-platform',
			({ setName, add, setBuildMatrix, setMachineType }) => {
				const matrix = setBuildMatrix(
					{
						platform: E2E_PLATFORMS,
					},
					{
						failFast: false,
					},
				);
				setMachineType(`${matrix.platform}`);
				setName(`Check e2e tests - ${matrix.platform}`);
				add(
					e2e({
						buildJob,
						node: E2E_PLATFORM_NODE,
						turboCache: turboCaches.e2ePlatform,
					}),
				);
			},
		);

		const releaseDependencies = [
			buildJob,
			typesJob,
			lintJob,
			depsJob,
			constraintsJob,
			lockfileJob,
			testsJob,
			e2eNodeJob,
			e2eGraphqlJob,
			e2ePlatformJob,
			buildExamplesJob,
		];

		whenTrigger('push', (event) => {
			when(
				and(
					or(eq(event.ref, 'refs/heads/main'), eq(event.ref, 'refs/heads/next')),
					eq(github.repository, 'andreisergiu98/baeta'),
				),
				() => {
					addJob(
						'publish',
						({ setName, add, run, when, addDependencies, setPermissions, setConcurrency }) => {
							setConcurrency({
								group: 'publish-packages',
								cancelInProgress: false,
							});
							setPermissions({
								contents: 'write',
								'pull-requests': 'write',
								'id-token': 'write',
							});
							addDependencies(...releaseDependencies);
							setName('Publish packages or open PR');
							add(setupNode({ turboCache: turboCaches.build }));

							const branchTip = run<{ isTip: boolean }>(
								'Check branch tip',
								'yarn builder check-branch-tip',
								{
									env: {
										GITHUB_TOKEN: secrets.GITHUB_TOKEN,
									},
									jsonOutputs: true,
								},
							);

							when(eq(branchTip.outputs.isTip, true), () => {
								const getToken = add(useBaetaBotToken());
								add(
									useChangesets({
										publishCommand:
											'yarn builder release --ci --create-release --create-tags --check-branch=${{ github.ref_name }} --verbose',
										versionCommand: 'yarn changeset version',
										commitMessage: 'chore: publish packages',
										prTitle: 'chore: publish packages',
										prDraft: 'create',
										createPRToken: getToken.token,
										createReleaseToken: secrets.GITHUB_TOKEN,
									}),
								);
							});
						},
					);
				},
			);
		});

		whenTrigger('workflow_dispatch', (event) => {
			when(eq(github.repository, 'andreisergiu98/baeta'), () => {
				addJob(
					'publish-snapshot',
					({ setName, setPermissions, setConcurrency, add, run, addDependencies, when }) => {
						setConcurrency({
							group: interpolate`${github.workflow}-${github.ref}-snapshots`,
							cancelInProgress: false,
						});
						setPermissions({
							'id-token': 'write',
						});
						addDependencies(...releaseDependencies);
						setName('Publish snapshot packages');
						add(setupNode({ turboCache: turboCaches.build }));
						const prIdJob = run<{ pr: number }>(
							'Get PR number',
							joinStrings(
								[
									'PR_NUMBER=$(gh pr list \\',
									'  --head $BRANCH \\',
									interpolate`  --repo ${github.repository} \\`,
									'  --json number \\',
									'  --jq ".[0].number")',
									'echo "pr=$PR_NUMBER" >> $GITHUB_OUTPUT',
								],
								'\n',
							),
							{
								shell: 'bash',
								env: {
									BRANCH: '${{ github.ref_name }}',
									GITHUB_TOKEN: secrets.GITHUB_TOKEN,
								},
							},
						);
						when(
							and(
								neq(prIdJob.outputs.pr, ''),
								neq(prIdJob.outputs.pr, null),
								startsWith(event.inputs.tag, 'alpha'),
							),
							() => {
								run(
									'Publish snapshot',
									joinStrings(
										[
											interpolate`yarn changeset version --snapshot ${prIdJob.outputs.pr}`,
											'if [[ `git status --porcelain` ]]; then',
											`  echo "Changes detected, publishing snapshot"`,
											'else',
											'  echo "::error::No changesets detected, skipping snapshot"',
											'  exit 1',
											'fi',
											interpolate`yarn builder release --ci --tag=${event.inputs.tag} --verbose`,
										],
										'\n',
									),
									{
										shell: 'bash',
										env: {
											GITHUB_TOKEN: secrets.GITHUB_TOKEN,
										},
									},
								);
							},
						);
					},
				);
			});
		});
	},
);
