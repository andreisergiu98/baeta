import createWorkflow, { type Steps } from 'github-actions-workflow-builder';
import { github, secrets } from 'github-actions-workflow-builder/context';
import {
	and,
	eq,
	interpolate,
	joinStrings,
	neq,
	or,
	startsWith,
	type Expression,
} from 'github-actions-workflow-builder/lib/expression';
import { useCache, useChangesets } from './_shared/actions.ts';
import { useBaetaBotToken } from './_shared/bot-token.ts';
import {
	createNodeVersion,
	setNodeBuildMatrix,
	setNodeBuildMatrixWithMachine,
} from './_shared/node.ts';
import { redisService, valkeyService, redisHttpService } from './_shared/services.ts';
import { setupNode, turboCaches } from './_shared/setup.ts';

const MAIN_TEST_MATRIX = {
	node: [createNodeVersion('22'), createNodeVersion('24'), createNodeVersion('26')],
	machine: ['ubuntu-latest', 'windows-latest', 'macos-latest'],
};
const PR_TEST_MATRIX = {
	node: [createNodeVersion('22')],
	machine: ['ubuntu-latest'],
};

export default createWorkflow(
	({ setWorkflowName, setPermissions, addTrigger, addJob, whenTrigger, when }) => {
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

		const buildJob = addJob('build', ({ setName, add, run }) => {
			add(jobConcurrency('build'));
			setName('Check build');
			add(setupNode({ turboCache: turboCaches.build }));
			run('yarn build');
		});

		const typesJob = addJob('types', ({ setName, add, run }) => {
			add(jobConcurrency('types'));
			setName('Check types');
			add(setupNode({ turboCache: turboCaches.types }));
			run('yarn check:types');
		});

		const lintJob = addJob('lint', ({ setName, add, run }) => {
			add(jobConcurrency('lint'));
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
			add(jobConcurrency('formatting'));
			setName('Check formatting');
			add(setupNode());
			run('yarn check:formatting');
		});

		const depsJob = addJob('dependencies', ({ setName, add, run }) => {
			add(jobConcurrency('dependencies'));
			setName('Check dependencies');
			add(setupNode({ turboCache: turboCaches.deps }));
			run('yarn check:deps');
		});

		const constraintsJob = addJob('constraints', ({ setName, add, run }) => {
			add(jobConcurrency('constraints'));
			setName('Check package constraints');
			add(setupNode());
			run('yarn check:constraints');
		});

		const lockfileJob = addJob('yarn-dedupe', ({ setName, add, run }) => {
			add(jobConcurrency('yarn-dedupe'));
			setName('Check yarn dedupe');
			add(setupNode({ enableYarnHardenedMode: true }));
			run('yarn dedupe --check');
		});

		const buildExamplesJob = addJob('build-examples', ({ setName, add, run }) => {
			add(jobConcurrency('build-examples'));
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
			add(jobConcurrency(interpolate`tests-${matrix.node}`));
			setName(`Check tests (Node ${matrix.node})`);
			add(redisService(65535));
			add(valkeyService(65534));
			add(redisHttpService(60080));
			add(setupNode({ node: matrix, turboCache: turboCaches.tests }));
			run('yarn check:tests');
		});

		const e2eJob = addJob('e2e', ({ setName, add, run, setMachineType }) => {
			const matrix = add(
				setNodeBuildMatrixWithMachine(
					{ pr: PR_TEST_MATRIX, default: MAIN_TEST_MATRIX },
					{ failFast: false },
				),
			);
			add(jobConcurrency(interpolate`e2e-${matrix.node}-${matrix.machine}`));
			setName(`Check e2e tests (${matrix.machine} - Node ${matrix.node})`);
			setMachineType(`${matrix.machine}`);
			add(setupNode({ node: matrix, turboCache: turboCaches.e2e }));
			run('yarn check:e2e');
		});

		const releaseDependencies = [
			buildJob,
			typesJob,
			lintJob,
			depsJob,
			constraintsJob,
			lockfileJob,
			testsJob,
			e2eJob,
			buildExamplesJob,
		];

		whenTrigger('push', (event) => {
			when(
				and(
					or(eq(event.ref, 'refs/heads/main'), eq(event.ref, 'refs/heads/next')),
					eq(github.repository, 'andreisergiu98/baeta'),
				),
				() => {
					addJob('publish', ({ setName, add, addDependencies, setPermissions, setConcurrency }) => {
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
						add(setupNode({ turboCache: turboCaches.build, enableYarnHardenedMode: true }));
						const getToken = add(useBaetaBotToken());
						add(
							useChangesets({
								publishCommand:
									'yarn builder release --ci --create-release --create-tags --check-branch=${{ github.ref_name }} --verbose',
								versionCommand: 'yarn changeset version',
								commitMessage: 'chore: publish packages',
								prTitle: 'chore: publish packages',
								createPRToken: getToken.token,
								createReleaseToken: secrets.GITHUB_TOKEN,
							}),
						);
					});
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
						add(setupNode({ turboCache: turboCaches.build, enableYarnHardenedMode: true }));
						const prIdJob = run<{ pr: number }>(
							'Get PR number',
							joinStrings(
								[
									'PR_NUMBER=$(gh pr list \\',
									'  --head $BRANCH \\',
									`  --repo ${github.repository} \\`,
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
											`yarn changeset version --snapshot ${prIdJob.outputs.pr}`,
											'if [[ `git status --porcelain` ]]; then',
											`  echo "Changes detected, publishing snapshot"`,
											'else',
											'  echo "::error::No changesets detected, skipping snapshot"',
											'  exit 1',
											'fi',
											`yarn builder release --ci --tag=${event.inputs.tag} --verbose`,
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

function jobConcurrency(group: Expression<string>): Steps {
	return ({ setConcurrency }) => {
		setConcurrency({
			group: interpolate`${github.workflow}-${github.ref}-${group}`,
			cancelInProgress: true,
		});
	};
}
