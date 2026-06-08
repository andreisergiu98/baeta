import { type JobReference, type Steps } from 'github-actions-workflow-builder';
import { interpolate, type Expression } from 'github-actions-workflow-builder/lib/expression';
import { useDownloadArtifact } from './actions.ts';
import type { NodeVersion } from './node.ts';
import { setupNode, yarnInstall } from './setup.ts';

export function e2e(options: {
	buildJob: JobReference<void>;
	node?: NodeVersion<string | Expression<string>>;
	turboCache: Expression<string>;
	graphql?: Expression<string>;
}): Steps {
	return ({ run, add, addDependencies, setEnv }) => {
		addDependencies(options.buildJob);

		add(
			setupNode({
				node: options.node,
				turboCache: options.turboCache,
				enableNodeCompileCache: true,
			}),
		);

		add(
			useDownloadArtifact({
				stepName: 'Download package dist',
				name: 'package-dist',
				path: 'packages',
			}),
		);

		run('yarn builder use-dist');
		if (options.graphql) {
			run(interpolate`yarn builder set-catalog graphql ${options.graphql}`);
		}
		add(yarnInstall({ disableImmutableInstall: true }));

		run('yarn check:e2e:setup');
		run('yarn check:e2e:run');
	};
}
