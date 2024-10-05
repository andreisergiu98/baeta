// @ts-check

/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');

/**
 * This rule will enforce that a workspace MUST depend on the same version of
 * a dependency as the one used by the other workspaces.
 * @param {import('@yarnpkg/types/lib/constraints').Context} context
 */
function enforceConsistentDependenciesAcrossTheProject({ Yarn }) {
	for (const dependency of Yarn.dependencies()) {
		if (dependency.type === 'peerDependencies') {
			continue;
		}

		for (const otherDependency of Yarn.dependencies({
			ident: dependency.ident,
		})) {
			if (otherDependency.type === 'peerDependencies') {
				continue;
			}

			dependency.update(otherDependency.range);
		}
	}
}

/**
 * This rule will enforce consistent metadata across all packages.
 * @param {import('@yarnpkg/types/lib/constraints').Context} context
 */
function enforceWorkspaceMetadata({ Yarn }) {
	for (const workspace of Yarn.workspaces()) {
		workspace.set('homepage', 'https://github.com/andreisergiu98/baeta#readme');
		workspace.set('bugs.url', 'https://github.com/andreisergiu98/baeta/issues');

		workspace.set('author.name', 'Andrei Pampu');
		workspace.set('author.url', 'https://github.com/andreisergiu98');

		workspace.set('repository.type', 'git');
		workspace.set('repository.url', 'https://github.com/andreisergiu98/baeta.git');
		workspace.set('repository.directory', workspace.cwd);

		workspace.set('license', 'MIT');

		workspace.set('keywords', [
			'baeta',
			'graphql',
			'schema',
			'types',
			'typescript',
			'framework',
			'builder',
		]);

		if (workspace.ident !== '@baeta/website') {
			workspace.set('type', 'module');
		}

		if (!workspace.manifest.private) {
			workspace.set('publishConfig.access', 'public');
			workspace.set('engines.node', '>=20.0.0');
			workspace.set('scripts.build', 'tsup');
			workspace.set('scripts.types', 'tsc --noEmit');
			workspace.set('scripts.prepack', 'prep');
			workspace.set('scripts.postpack', 'prep --clean');

			workspace.set('ava.extensions.ts', 'module');
			workspace.set('ava.nodeArguments', ['--no-warnings', '--experimental-transform-types']);
		}
	}
}

module.exports = defineConfig({
	async constraints(ctx) {
		enforceWorkspaceMetadata(ctx);
		enforceConsistentDependenciesAcrossTheProject(ctx);
	},
});
