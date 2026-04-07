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
import { DEFAULT_NODE, setupNode } from './_shared/setup.ts';

const NODE_VERSIONS = ['22', '24', '25.6.1'];

export default createWorkflow(
	({ setWorkflowName, setPermissions, setConcurrency, addTrigger, addJob, whenTrigger, when }) => {
		setWorkflowName('Build');
		setPermissions({
			contents: 'read',
		});
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
			group: interpolate`${github.workflow}-${github.ref}`,
			cancelInProgress: true,
		});

		const buildJob = addJob('build', ({ setName, add, run }) => {
			setName('Check build');
			add(setupNode(DEFAULT_NODE, 'build'));
			run('yarn build');
		});

		const typesJob = addJob('types', ({ setName, add, run }) => {
			setName('Check types');
			add(setupNode(DEFAULT_NODE, 'types'));
			run('yarn check:types');
		});

		const lintJob = addJob('lint', ({ setName, add, run }) => {
			setName('Check linting');
			add(setupNode(DEFAULT_NODE));
			run('yarn check:linting');
		});

		addJob('formatting', ({ setName, add, run }) => {
			setName('Check formatting');
			add(setupNode(DEFAULT_NODE));
			run('yarn check:formatting');
		});

		const depsJob = addJob('dependencies', ({ setName, add, run }) => {
			setName('Check dependencies');
			add(setupNode(DEFAULT_NODE, 'deps'));
			run('yarn check:deps');
		});

		const circularDepsJob = addJob('circular-dependencies', ({ setName, add, run }) => {
			setName('Check circular dependencies');
			add(setupNode(DEFAULT_NODE, 'circular'));
			run('yarn check:circular');
		});

		const constraintsJob = addJob('constraints', ({ setName, add, run }) => {
			setName('Check package constraints');
			add(setupNode(DEFAULT_NODE));
			run('yarn check:constraints');
		});

		addJob('yarn-dedupe', ({ setName, add, run }) => {
			setName('Check yarn dedupe');
			add(setupNode(DEFAULT_NODE));
			run('yarn dedupe --check');
		});

		const buildExamplesJob = addJob('build-examples', ({ setName, add, run }) => {
			setName('Check examples');
			add(setupNode(DEFAULT_NODE, 'examples'));
			run('yarn examples:build');
			run('yarn examples:types');
		});

		const testsJob = addJob('tests', ({ setName, add, run, setBuildMatrix, addService }) => {
			const matrix = setBuildMatrix(
				{
					node: NODE_VERSIONS,
				},
				{
					failFast: false,
				},
			);

			setName(`Check tests (Node ${matrix.node})`);

			addService({
				name: 'redis',
				image: 'redis',
				options: joinStrings(
					[
						`--health-cmd "redis-cli ping"`,
						'--health-interval 10s',
						'--health-timeout 5s',
						'--health-retries 5',
					],
					' ',
				),
				ports: ['65535:6379'],
			});
			addService({
				name: 'valkey',
				image: 'valkey/valkey:8-alpine',
				options: joinStrings(
					[
						`--health-cmd "valkey-cli ping"`,
						'--health-interval 10s',
						'--health-timeout 5s',
						'--health-retries 5',
					],
					' ',
				),
				ports: ['65534:6379'],
			});
			addService({
				name: 'redis-http',
				image: 'hiett/serverless-redis-http:latest',
				env: {
					SRH_MODE: 'env',
					SRH_TOKEN: 'example_token',
					SRH_CONNECTION_STRING: 'redis://redis:6379/0',
				},
				ports: ['60080:80'],
			});

			add(setupNode(matrix.node, 'tests'));
			run('yarn check:tests');
		});

		const e2eJob = addJob('e2e', ({ setName, add, run, setBuildMatrix, setMachineType }) => {
			const matrix = setBuildMatrix(
				{
					node: NODE_VERSIONS,
					machine: ['ubuntu-latest', 'windows-latest', 'macos-latest'] as const,
				},
				{
					failFast: false,
				},
			);

			setName(`Check e2e tests (${matrix.machine} - Node ${matrix.node})`);
			setMachineType(`${matrix.machine}`);

			add(setupNode(matrix.node, 'e2e'));
			run('yarn check:e2e');
		});

		const releaseDependencies = [
			buildJob,
			typesJob,
			lintJob,
			depsJob,
			circularDepsJob,
			constraintsJob,
			testsJob,
			e2eJob,
			buildExamplesJob,
		];

		whenTrigger('push', (event) => {
			when(or(eq(event.ref, 'refs/heads/main'), eq(event.ref, 'refs/heads/next')), () => {
				addJob('publish', ({ setName, add, use, addDependencies, setPermissions }) => {
					setPermissions({
						contents: 'write',
						'pull-requests': 'write',
						'id-token': 'write',
					});
					addDependencies(...releaseDependencies);
					setName('Publish packages or open PR');
					add(setupNode(DEFAULT_NODE, 'build'));
					use('dotansimha/changesets-action@069996e9be15531bd598272996fa23853d61590e', {
						with: {
							// biome-ignore lint/suspicious/noTemplateCurlyInString: ga template
							publish: 'yarn builder release --ci --check-branch=${{ github.ref_name }}',
							version: 'yarn changeset version',
							commit: 'chore: publish packages',
							title: 'chore: publish packages',
							createGithubReleases: 'aggregate',
						},
						env: {
							GITHUB_TOKEN: secrets['GITHUB_TOKEN'],
						},
					});
				});
			});
		});

		whenTrigger('workflow_dispatch', (event) => {
			addJob('publish-snapshot', ({ setName, add, run, addDependencies, when }) => {
				setPermissions({
					'id-token': 'write',
				});
				addDependencies(...releaseDependencies);
				setName('Publish snapshot packages');
				add(setupNode(DEFAULT_NODE, 'build'));
				const prIdJob = run<{ pr: number }>(
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
							// biome-ignore lint/suspicious/noTemplateCurlyInString: ga template
							BRANCH: '${{ github.ref_name }}',
							GITHUB_TOKEN: secrets['GITHUB_TOKEN'],
						},
					},
				);
				when(
					and(
						neq(prIdJob.outputs.pr, ''),
						neq(prIdJob.outputs.pr, null),
						startsWith(event.inputs['tag'], 'alpha'),
					),
					() => {
						run(
							joinStrings(
								[
									`yarn changeset version --snapshot ${prIdJob.outputs.pr}`,
									'if [[ `git status --porcelain` ]]; then',
									`  echo "Changes detected, publishing snapshot"`,
									'else',
									'  echo "::error::No changesets detected, skipping snapshot"',
									'  exit 1',
									'fi',
									`yarn builder release --ci --tag=${event.inputs['tag']}`,
								],
								'\n',
							),
							{
								shell: 'bash',
								env: {
									GITHUB_TOKEN: secrets['GITHUB_TOKEN'],
								},
							},
						);
					},
				);
			});
		});
	},
);
