/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-check

/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');
const path = require('node:path');
const {
	GRAPHQL_PEER_VERSION,
	SUPPORTED_NODE_VERSIONS,
	GRAPHQL_NEXT_PEER_VERSION,
	GRAPHQL_NEXT_WORKSPACES,
} = require('@baeta/workspace-config');

/**
 * This rule will enforce that a workspace MUST depend on the same version of
 * a dependency as the one used by the other workspaces.
 * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
function enforceConsistentDependenciesAcrossTheProject({ Yarn }) {
	for (const dependency of Yarn.dependencies()) {
		if (
			dependency.workspace.ident &&
			GRAPHQL_NEXT_WORKSPACES.includes(dependency.workspace.ident)
		) {
			continue;
		}
		if (dependency.type === 'peerDependencies') {
			continue;
		}

		for (const otherDependency of Yarn.dependencies({
			ident: dependency.ident,
		})) {
			if (
				otherDependency.workspace.ident &&
				GRAPHQL_NEXT_WORKSPACES.includes(otherDependency.workspace.ident)
			) {
				continue;
			}
			if (otherDependency.type === 'peerDependencies') {
				continue;
			}

			dependency.update(otherDependency.range);
		}
	}
}

/**
 * This rule will enforce consistent metadata exports across all packages.
 * @param {import('@yarnpkg/types').Yarn.Constraints.Workspace} workspace
 */
function enforceConsistentEntries(workspace) {
	if (!workspace.manifest.exports) {
		workspace.unset('exports');
		return;
	}

	/**
	 * @type {Record<string, { types: string; default: string }>}
	 */
	const exports = {};

	/**
	 * @type {Record<string, { types: string; default: string }>}
	 */
	const publishExports = {};

	/**
	 * @type {string[]}
	 */
	const typedocEntries = [];
	for (const key in workspace.manifest.exports) {
		const dir = key === '.' ? '' : key.replace('./', '');

		const importEntry = `./${path.join('./dist', dir, 'index.js')}`;
		const typesEntry = `./${path.join('./dist', dir, 'index.d.ts')}`;
		const devTypesEntry = `./${path.join(dir, 'index.ts')}`;

		exports[key] = {
			types: devTypesEntry,
			default: devTypesEntry,
		};

		publishExports[key] = {
			types: typesEntry,
			default: importEntry,
		};

		typedocEntries.push(`./${path.join(dir, 'index.ts')}`);
	}

	workspace.set('exports', exports);
	workspace.set('publishConfig.exports', publishExports);
	workspace.set('typedocOptions.entryPoints', typedocEntries);
}

/**
 * This rule will enforce consistent metadata across all packages.
 * @param {import('@yarnpkg/types').Yarn.Constraints.Context} context
 */
function enforceWorkspaceMetadata({ Yarn }) {
	for (const workspace of Yarn.workspaces()) {
		if (workspace.manifest.name?.startsWith('@baeta/template-')) {
			continue;
		}

		workspace.set('homepage', 'https://github.com/andreisergiu98/baeta#readme');
		workspace.set('bugs.url', 'https://github.com/andreisergiu98/baeta/issues');

		workspace.set('author.name', 'Andrei Pampu');
		workspace.set('author.url', 'https://github.com/andreisergiu98');

		workspace.set('repository.type', 'git');
		workspace.set('repository.url', 'git+https://github.com/andreisergiu98/baeta.git');
		if (workspace.manifest.name !== 'baeta') {
			workspace.set('repository.directory', workspace.cwd);
		}

		workspace.set('license', 'MIT');

		workspace.set('keywords', [
			'baeta',
			'builder',
			'framework',
			'graphql',
			'schema',
			'types',
			'typescript',
		]);

		if (workspace.ident !== '@baeta/website' && workspace.ident !== '@baeta/changelog') {
			workspace.set('type', 'module');
		}

		if (workspace.manifest.private) {
			workspace.set('version', '0.0.0');
		}

		if (!workspace.manifest.private) {
			enforceConsistentEntries(workspace);

			workspace.set('files', ['dist']);
			workspace.set('sideEffects', false);
			workspace.set('publishConfig.access', 'public');
			workspace.set('engines.node', SUPPORTED_NODE_VERSIONS);

			if (workspace.manifest.scripts?.prebuild == null) {
				workspace.set('scripts.build', 'builder build');
				workspace.set('scripts.types', 'tsc --noEmit');
			} else {
				workspace.set('scripts.build', 'yarn prebuild && builder build');
				workspace.set('scripts.types', 'yarn prebuild && tsc --noEmit');
			}
			workspace.set('scripts.prepack', 'builder prepare');
			workspace.set('scripts.postpack', 'builder prepare --restore');
			workspace.set('scripts.test', 'builder test');
			workspace.set('scripts.check:deps', 'builder check-deps');

			workspace.set('devDependencies.@baeta/builder', 'workspace:^');
			workspace.set('devDependencies.@baeta/testing', 'workspace:^');
			workspace.set('devDependencies.@baeta/tsconfig', 'workspace:^');

			workspace.set('ava.extensions', ['ts']);

			workspace.set('typedocOptions.sort', [
				'kind',
				'instance-first',
				'required-first',
				'alphabetical-ignoring-documents',
			]);
			workspace.set('typedocOptions.readme', 'none');
			workspace.set('typedocOptions.tsconfig', './tsconfig.json');

			if (workspace.manifest.peerDependencies?.graphql) {
				if (workspace.ident && GRAPHQL_NEXT_WORKSPACES.includes(workspace.ident)) {
					workspace.set('peerDependencies.graphql', GRAPHQL_NEXT_PEER_VERSION);
				} else {
					workspace.set('peerDependencies.graphql', GRAPHQL_PEER_VERSION);
				}
			}
		}

		if (workspace.manifest.name.startsWith('@baeta/examples-')) {
			const excludeFromBuild = ['@baeta/examples-shared', '@baeta/examples-federation-supergraph'];
			const excludeFromTypes = ['@baeta/examples-federation-supergraph'];
			const excludeFromStart = [
				...excludeFromBuild,
				'@baeta/examples-cloudflare',
				'@baeta/examples-cloudflare-ws',
			];
			if (!excludeFromBuild.includes(workspace.manifest.name)) {
				workspace.set('scripts.build', 'baeta generate');
			}
			if (!excludeFromTypes.includes(workspace.manifest.name)) {
				if (
					['@baeta/examples-cloudflare', '@baeta/examples-cloudflare-ws'].includes(
						workspace.manifest.name,
					)
				) {
					workspace.set('scripts.types', 'tsc -b');
				} else {
					workspace.set('scripts.types', 'tsc --noEmit');
				}
			}
			if (!excludeFromStart.includes(workspace.manifest.name)) {
				workspace.set(
					'scripts.start',
					"baeta generate --watch --run='node --watch --enable-source-maps --inspect src/app.ts'",
				);
			}
		}

		if (workspace.manifest.name.startsWith('@baeta/e2e-')) {
			workspace.set('scripts.e2e:types', 'tsc --noEmit');
			if (workspace.manifest.name !== '@baeta/e2e-shared') {
				workspace.set('scripts.e2e:generate:baeta', 'baeta generate');
				workspace.set('scripts.e2e:generate:operations', 'graphql-codegen');
				workspace.set('scripts.e2e', 'ava');
			}
			workspace.set('ava.extensions', ['ts']);
			workspace.set('ava.timeout', '120s');
		}
	}
}

module.exports = defineConfig({
	async constraints(ctx) {
		enforceWorkspaceMetadata(ctx);
		enforceConsistentDependenciesAcrossTheProject(ctx);
	},
});
