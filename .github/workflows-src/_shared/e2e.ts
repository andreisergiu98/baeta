import { type JobReference, type Steps } from 'github-actions-workflow-builder';
import {
	always,
	interpolate,
	type Expression,
} from 'github-actions-workflow-builder/lib/expression';
import { useDownloadArtifact } from './actions.ts';
import type { NodeVersion } from './node.ts';
import { setupNode, yarnInstall } from './setup.ts';

export function e2e(options: {
	buildJob: JobReference<void>;
	node?: NodeVersion<string | Expression<string>>;
	turboCache: Expression<string>;
	graphql?: Expression<string>;
}): Steps {
	return ({ run, add, addDependencies, when }) => {
		addDependencies(options.buildJob);

		add(
			setupNode({
				node: options.node,
				turboCache: options.turboCache,
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
		run(
			'Schedule e2e process dump',
			'(sleep 360; ps -A -o pid,ppid,pgid,etime,stat,args > "$RUNNER_TEMP/e2e-processes.txt") > /dev/null 2>&1 &',
			{ shell: 'bash' },
		);
		run('yarn check:e2e:run', { env: { TURBO_LOG_ORDER: 'stream' } });
		when(always(), () => {
			run(
				'Show e2e processes after 6 minutes',
				'cat "$RUNNER_TEMP/e2e-processes.txt" 2>/dev/null || true',
				{ shell: 'bash' },
			);
		});
	};
}
