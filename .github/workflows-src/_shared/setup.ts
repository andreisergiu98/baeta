import type { Steps } from 'github-actions-workflow-builder';
import { github, runner } from 'github-actions-workflow-builder/context';
import {
	type Expression,
	hashFiles,
	interpolate,
	joinStrings,
} from 'github-actions-workflow-builder/lib/expression';

const turboCaches = {
	build: 'build',
	types: 'types',
	deps: 'deps',
	tests: 'tests',
	e2e: 'e2e',
	circular: 'deps-circular',
	examples: 'examples-build',
} as const;

export const DEFAULT_NODE = '24';

export function setupNode(
	nodeVersion: string | Expression<string>,
	turboCache?: keyof typeof turboCaches,
): Steps {
	return ({ use, run }) => {
		use('actions/checkout@v6');

		use('actions/setup-node@v6', {
			with: {
				'node-version': nodeVersion,
			},
		});

		run(
			'Enable Corepack',
			joinStrings(['npm uninstall -g yarn || true', 'corepack enable'], '\n'),
			{
				shell: 'bash',
			},
		);

		const yarnDir = run<{
			dir: string;
		}>('Get yarn cache directory', `echo "dir=$(yarn config get cacheFolder)" >> $GITHUB_OUTPUT`, {
			shell: 'bash',
		});

		use('actions/cache@v5', {
			with: {
				path: interpolate`${yarnDir.outputs.dir}`,
				key: interpolate`yarn-cache-${runner.os}-${hashFiles('**/yarn.lock')}`,
				'restore-keys': interpolate`yarn-cache-${runner.os}-`,
			},
		});

		if (turboCache) {
			const namespace = turboCaches[turboCache];
			use('actions/cache@v5', {
				with: {
					path: '.turbo',
					key: interpolate`turbo-${namespace}-${nodeVersion}-${runner.os}-${github.sha}`,
					'restore-keys': interpolate`turbo-${namespace}-${nodeVersion}-${runner.os}-`,
				},
			});
		}

		run('yarn install');
	};
}
