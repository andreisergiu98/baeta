import type { Steps } from 'github-actions-workflow-builder';
import { github, runner } from 'github-actions-workflow-builder/context';
import {
	type Expression,
	hashFiles,
	interpolate,
	joinStrings,
} from 'github-actions-workflow-builder/lib/expression';
import { useCache, useCheckout, useSetupNode } from './actions.ts';
import { createNodeVersion, type NodeVersion } from './node.ts';

export const turboCaches = {
	build: 'build',
	types: 'types',
	deps: 'deps',
	tests: 'tests',
	e2e: 'e2e',
	examples: 'examples-build',
} as const;

type TurboCache = (typeof turboCaches)[keyof typeof turboCaches];

export const DEFAULT_NODE = createNodeVersion('24.14.1');

interface SetupNodeOptions {
	node?: NodeVersion<string | Expression<string>>;
	turboCache?: TurboCache;
	disableYarnCache?: boolean;
	skipInstall?: boolean;
}

export function setupNode(options: SetupNodeOptions = {}): Steps {
	const node = options.node ?? DEFAULT_NODE;
	const turboNamespace = options.turboCache;

	return ({ run, add }) => {
		add(useCheckout());

		add(
			useSetupNode({
				stepName: `Setup Node ${node.node}`,
				nodeVersion: node.version,
			}),
		);

		run(
			'Enable Corepack',
			joinStrings(['npm uninstall -g yarn || true', 'corepack enable'], '\n'),
			{
				shell: 'bash',
			},
		);

		if (!options.disableYarnCache && !options.skipInstall) {
			add(
				useCache({
					stepName: 'Setup Yarn Cache',
					paths: ['.yarn/cache'],
					key: interpolate`yarn-cache-v1-${runner.os}-${hashFiles('**/yarn.lock')}`,
					restoreKeys: [interpolate`yarn-cache-v1-${runner.os}-`],
				}),
			);
		}

		if (turboNamespace) {
			add(
				useCache({
					stepName: `Setup Turbo Cache for ${turboNamespace}`,
					paths: ['.cache/turbo'],
					key: interpolate`turbo-${turboNamespace}-${node.node}-${runner.os}-${github.sha}`,
					restoreKeys: [interpolate`turbo-${turboNamespace}-${node.node}-${runner.os}-`],
				}),
			);
		}

		if (!options.skipInstall) {
			run('yarn install --immutable', {
				env: {
					YARN_ENABLE_GLOBAL_CACHE: 'false',
				},
			});
		}
	};
}
