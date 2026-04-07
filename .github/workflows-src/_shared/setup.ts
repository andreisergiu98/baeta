import type { Steps } from 'github-actions-workflow-builder';
import { github, runner } from 'github-actions-workflow-builder/context';
import {
	type Expression,
	hashFiles,
	interpolate,
	joinStrings,
} from 'github-actions-workflow-builder/lib/expression';

export const turboCaches = {
	build: 'build',
	types: 'types',
	deps: 'deps',
	tests: 'tests',
	e2e: 'e2e',
	circular: 'deps-circular',
	examples: 'examples-build',
} as const;

type TurboCache = (typeof turboCaches)[keyof typeof turboCaches];

export const DEFAULT_NODE = '24';

interface SetupNodeOptions {
	nodeVersion?: string | Expression<string>;
	turboCache?: TurboCache;
	disableYarnCache?: boolean;
	skipInstall?: boolean;
}

export function setupNode(options: SetupNodeOptions = {}): Steps {
	const nodeVersion = options.nodeVersion ?? DEFAULT_NODE;
	const turboNamespace = options.turboCache;

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

		if (!options.disableYarnCache) {
			const yarnDir = run<{
				dir: string;
			}>(
				'Get yarn cache directory',
				`echo "dir=$(yarn config get cacheFolder)" >> $GITHUB_OUTPUT`,
				{
					shell: 'bash',
				},
			);

			use('actions/cache@v5', {
				with: {
					path: interpolate`${yarnDir.outputs.dir}`,
					key: interpolate`yarn-cache-${runner.os}-${hashFiles('**/yarn.lock')}`,
					'restore-keys': interpolate`yarn-cache-${runner.os}-`,
				},
			});
		}

		if (turboNamespace) {
			use('actions/cache@v5', {
				with: {
					path: '.turbo',
					key: interpolate`turbo-${turboNamespace}-${nodeVersion}-${runner.os}-${github.sha}`,
					'restore-keys': interpolate`turbo-${turboNamespace}-${nodeVersion}-${runner.os}-`,
				},
			});
		}

		if (!options.skipInstall) {
			run('yarn install --immutable');
		}
	};
}
