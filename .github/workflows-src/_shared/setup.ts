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
	examples: 'examples-build',
	e2eNode: 'e2e-node',
	e2ePlatform: 'e2e-platform',
	e2eGraphql: (graphql: Expression<string>) => interpolate`e2e-graphql-${graphql}`,
} as const;

export type TurboCache = (typeof turboCaches)[keyof typeof turboCaches];

export const DEFAULT_NODE = createNodeVersion('24');

const NODE_COMPILE_CACHE_DIR = '.cache/node-compile';

interface SetupNodeOptions {
	node?: NodeVersion<string | Expression<string>>;
	turboCache?: string | Expression<string>;
	disableYarnCache?: boolean;
	skipInstall?: boolean;
	enableYarnHardenedMode?: boolean;
	enableNodeCompileCache?: boolean;
}

export function setupNode(options: SetupNodeOptions = {}): Steps {
	const node = options.node ?? DEFAULT_NODE;

	return ({ run, add, setEnv }) => {
		add(useCheckout());

		add(
			useSetupNode({
				stepName: `Setup Node ${node.node}`,
				nodeVersion: node.version,
				checkLatest: true,
				packageManagerCache: false,
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
					key: interpolate`yarn-cache-v2-${runner.os}-${hashFiles('**/yarn.lock')}`,
					restoreKeys: [interpolate`yarn-cache-v2-${runner.os}-`],
				}),
			);
		}

		if (options.turboCache) {
			add(
				useCache({
					stepName: `Setup Turbo Cache for ${options.turboCache}`,
					paths: ['.cache/turbo'],
					key: interpolate`turbo-${options.turboCache}-${node.node}-${runner.os}-${github.sha}`,
					restoreKeys: [interpolate`turbo-${options.turboCache}-${node.node}-${runner.os}-`],
				}),
			);
		}

		if (options.turboCache && options.enableNodeCompileCache) {
			setEnv('NODE_COMPILE_CACHE', NODE_COMPILE_CACHE_DIR);
			add(
				useCache({
					stepName: 'Setup Node Compile Cache',
					paths: [NODE_COMPILE_CACHE_DIR],
					key: interpolate`node-compile-${options.turboCache}-${node.node}-${runner.os}-${hashFiles('**/yarn.lock')}`,
					restoreKeys: [interpolate`node-compile-${options.turboCache}-${node.node}-${runner.os}-`],
				}),
			);
		}

		if (!options.skipInstall) {
			add(yarnInstall({ enableHardenedMode: options.enableYarnHardenedMode }));
		}
	};
}

export function yarnInstall(
	options: { enableHardenedMode?: boolean; disableImmutableInstall?: boolean } = {},
): Steps {
	return ({ run }) => {
		run(`yarn install ${options.disableImmutableInstall ? '--no-immutable' : '--immutable'}`, {
			env: {
				YARN_ENABLE_GLOBAL_CACHE: 'false',
				YARN_ENABLE_HARDENED_MODE: options.enableHardenedMode ? '1' : '0',
			},
		});
	};
}
