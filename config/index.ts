import { type UserConfig } from 'tsdown';
import changesetConfig from '../.changeset/config.json' with { type: 'json' };

/*
 * tsdown defaults for packages that require building.
 */
export const BUILD_DEFAULTS = {
	target: 'es2024',
	dts: true,
	clean: true,
	sourcemap: true,
	fixedExtension: false,
	outDir: 'dist',
} as const satisfies UserConfig;

/**
 * Packages that diverge too much from default tsconfig and should be skipped.
 */
export const SKIP_TSCONFIG_CHECK = new Set([
	'baeta',
	'@baeta/website',
	'@baeta/tsconfig',
	'@baeta/examples-federation-supergraph',
	'@baeta/template-apollo',
	'@baeta/template-yoga',
	'@baeta/examples-cloudflare',
	'@baeta/examples-cloudflare-ws',
]);

/**
 * Dev dependencies that are allowed to be unused in the codebase, as they are only used in tests or build scripts.
 */
export const ALLOWED_UNUSED_DEV_DEPS = new Set([
	'@baeta/builder',
	'@baeta/testing',
	'@baeta/tsconfig',
	'typescript',
]);

export interface PackageDependenciesOverrides {
	ignoreDeps?: string[];
	ignoreMissingDeps?: string[];
	ignoreDevDeps?: string[];
}

export const PACKAGE_DEPENDENCY_OVERRIDES: Record<string, PackageDependenciesOverrides> = {
	'@baeta/plugin-graphql': {
		ignoreDevDeps: ['@types/node'],
	},
	'@baeta/plugin-directives': {
		ignoreDevDeps: ['@types/node'],
	},
	'@baeta/plugin-pagination': {
		ignoreDevDeps: ['@types/node'],
	},
	'@baeta/plugin-exec': {
		ignoreDevDeps: ['@types/node'],
	},
	'@baeta/plugin-cloudflare': {
		ignoreDevDeps: ['@cloudflare/workers-types', 'graphql'],
	},
	'@baeta/util-graphql': {
		ignoreDevDeps: ['@types/node'],
	},
	'@baeta/subscriptions-cloudflare': {
		ignoreDevDeps: ['@cloudflare/workers-types'],
	},
	'@baeta/cache-cloudflare': {
		ignoreMissingDeps: ['cloudflare:workers'],
		ignoreDevDeps: ['@cloudflare/workers-types'],
	},
	'@baeta/extension-cache': {
		ignoreDevDeps: ['graphql'],
	},
	'@baeta/subscriptions-pubsub': {
		ignoreDevDeps: ['graphql'],
	},
};

const changesetFixedPackages = changesetConfig.fixed.at(0);
if (changesetFixedPackages == null) {
	throw new Error('No fixed packages found in changeset config');
}

export const PACKAGES_WITH_FIXED_VERSIONS = new Set(changesetFixedPackages);
