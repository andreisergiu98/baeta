import type { Steps } from 'github-actions-workflow-builder';
import type { ContextValue } from 'github-actions-workflow-builder/lib/ContextValue';
import {
	eq,
	joinStrings,
	neq,
	type Expression,
} from 'github-actions-workflow-builder/lib/expression';

const actions = {
	checkout: 'actions/checkout@9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0', // v7.0.0
	setupNode: 'actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e', // v6.4.0
	cache: 'actions/cache@55cc8345863c7cc4c66a329aec7e433d2d1c52a9', // v6.1.0
	createGithubAppToken: 'actions/create-github-app-token@bcd2ba49218906704ab6c1aa796996da409d3eb1', // v3.2.0
	githubScript: 'actions/github-script@3a2844b7e9c422d3c10d287c895573f7108da1b3', // v9.0.0
	uploadArtifact: 'actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a', // v7.0.1
	downloadArtifact: 'actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c', // v8.0.1
	changesets: 'changesets/action@a45c4d594aa4e2c509dc14a9f2b3b67ba3780d0d', // v1.9.0
	dockerLogin: 'docker/login-action@650006c6eb7dba73a995cc03b0b2d7f5ca915bee', // v4.2.0
	ghPages: 'peaceiris/actions-gh-pages@84c30a85c19949d7eee79c4ff27748b70285e453', // v4.1.0
	renovate: 'renovatebot/github-action@dd5302ec17783b2fc721b19ae7209b57b1587765', // v46.1.17
};

export interface UseCheckoutOptions {
	stepName?: string;
	ref?: Expression<string>;
	fetchDepth?: Expression<number>;
}

export function useCheckout(options: UseCheckoutOptions = {}): Steps {
	return ({ use }) => {
		use(options.stepName || 'Git Checkout', actions.checkout, {
			with: {
				ref: options.ref,
				'fetch-depth': options.fetchDepth,
			},
		});
	};
}

export interface UseCacheOptions {
	stepName?: string;
	paths: Expression<string>[];
	key: Expression<string>;
	restoreKeys?: Expression<string>[];
}

export function useCache(options: UseCacheOptions): Steps<{
	cacheHit: Expression<boolean>;
	cacheMiss: Expression<boolean>;
}> {
	return ({ use }) => {
		const { outputs } = use<{ 'cache-hit': string }>(
			options.stepName || 'Enable Cache',
			actions.cache,
			{
				with: {
					path: joinStrings(options.paths, '\n'),
					key: options.key,
					'restore-keys': options.restoreKeys && joinStrings(options.restoreKeys, '\n'),
				},
			},
		);
		return {
			cacheHit: eq(outputs['cache-hit'], 'true'),
			cacheMiss: neq(outputs['cache-hit'], 'true'),
		};
	};
}

export interface UseCacheRestoreOptions {
	stepName?: string;
	paths: Expression<string>[];
	key: Expression<string>;
	restoreKeys?: Expression<string>[];
	failOnCacheMiss?: Expression<boolean>;
	lookupOnly?: Expression<boolean>;
}

export function useCacheRestore(options: UseCacheRestoreOptions): Steps<{
	cacheHit: Expression<boolean>;
	cacheMiss: Expression<boolean>;
	cachePrimaryKey: Expression<string>;
	cacheMatchedKey: Expression<string>;
}> {
	return ({ use }) => {
		const { outputs } = use<{
			'cache-hit': string;
			'cache-primary-key': string;
			'cache-matched-key': string;
		}>(
			options.stepName || 'Restore Cache',
			actions.cache.replace('actions/cache@', 'actions/cache/restore@'),
			{
				with: {
					path: joinStrings(options.paths, '\n'),
					key: options.key,
					'restore-keys': options.restoreKeys && joinStrings(options.restoreKeys, '\n'),
					'fail-on-cache-miss': options.failOnCacheMiss,
					'lookup-only': options.lookupOnly,
				},
			},
		);
		return {
			cacheHit: eq(outputs['cache-hit'], 'true'),
			cacheMiss: neq(outputs['cache-hit'], 'true'),
			cachePrimaryKey: outputs['cache-primary-key'],
			cacheMatchedKey: outputs['cache-matched-key'],
		};
	};
}

export interface UseCacheSaveOptions {
	stepName?: string;
	paths: Expression<string>[];
	key: Expression<string>;
	uploadChunkSize?: Expression<number>;
}

export function useCacheSave(options: UseCacheSaveOptions): Steps {
	return ({ use }) => {
		use(
			options.stepName || 'Save Cache',
			actions.cache.replace('actions/cache@', 'actions/cache/save@'),
			{
				with: {
					path: joinStrings(options.paths, '\n'),
					key: options.key,
					'upload-chunk-size': options.uploadChunkSize,
				},
			},
		);
	};
}

export interface UseUploadArtifactOptions {
	stepName?: string;
	name?: Expression<string>;
	path: Expression<string>;
	ifNoFilesFound?: 'warn' | 'error' | 'ignore';
	retentionDays?: Expression<number>;
	compressionLevel?: Expression<number>;
	overwrite?: Expression<boolean>;
	includeHiddenFiles?: Expression<boolean>;
	archive?: Expression<boolean>;
}

export function useUploadArtifact(options: UseUploadArtifactOptions): Steps {
	return ({ use }) => {
		const { outputs } = use<{
			'artifact-id': string;
			'artifact-url': string;
			'artifact-name': string;
		}>(options.stepName || 'Upload Artifact', actions.uploadArtifact, {
			with: {
				name: options.name,
				path: options.path,
				archive: options.archive,
				overwrite: options.overwrite,
				'if-no-files-found': options.ifNoFilesFound,
				'retention-days': options.retentionDays,
				'compression-level': options.compressionLevel,
				'include-hidden-files': options.includeHiddenFiles,
			},
		});
		return {
			artifactId: outputs['artifact-id'],
			artifactUrl: outputs['artifact-url'],
			artifactName: outputs['artifact-name'],
		};
	};
}

export interface UseDownloadArtifactOptions {
	stepName?: string;
	name: Expression<string>;
	artifactIds?: Expression<string>[];
	path?: Expression<string>;
	patterns?: Expression<string>;
	mergeMultiple?: Expression<boolean>;
	githubToken?: Expression<string>;
	repository?: Expression<string>;
	runId?: Expression<string>;
	skipDecompress?: Expression<boolean>;
	digestMismatch?: 'info' | 'warn' | 'error' | 'ignore';
	continueOnError?: Expression<boolean>;
}

export function useDownloadArtifact(options: UseDownloadArtifactOptions): Steps {
	return ({ use }) => {
		const { outputs } = use<{
			'download-path': string;
		}>(options.stepName || 'Download Artifact', actions.downloadArtifact, {
			with: {
				name: options.name,
				path: options.path,
				patterns: options.patterns,
				repository: options.repository,
				'artifact-ids': options.artifactIds ? joinStrings(options.artifactIds, ',') : undefined,
				'run-id': options.runId,
				'merge-multiple': options.mergeMultiple,
				'github-token': options.githubToken,
				'skip-decompress': options.skipDecompress,
				'digest-mismatch': options.digestMismatch,
			},
			continueOnError: options.continueOnError,
		});
		return {
			downloadPath: outputs['download-path'],
		};
	};
}

export interface UseSetupNodeOptions {
	stepName?: string;
	nodeVersion?: Expression<string>;
	checkLatest?: Expression<boolean>;
	packageManagerCache?: Expression<boolean>;
}

export function useSetupNode(options: UseSetupNodeOptions = {}): Steps {
	return ({ use }) => {
		use(options.stepName || 'Setup Node', actions.setupNode, {
			with: {
				'node-version': options.nodeVersion,
				'check-latest': options.checkLatest,
				'package-manager-cache': options.packageManagerCache,
			},
		});
	};
}

export interface UseGithubAppTokenOptions {
	stepName?: string;
	clientId: Expression<string>;
	clientSecret: Expression<string>;
	owner: Expression<string>;
	repositories: Expression<string>;
}

export function useGithubAppToken(
	options: UseGithubAppTokenOptions,
): Steps<ContextValue<{ token: string }>> {
	return ({ use }) => {
		const { outputs } = use<{ token: string }>(
			options.stepName || 'Create GitHub App Token',
			actions.createGithubAppToken,
			{
				with: {
					'client-id': options.clientId,
					'private-key': options.clientSecret,
					owner: options.owner,
					repositories: options.repositories,
				},
			},
		);
		return outputs;
	};
}

export interface UseGithubScriptOptions {
	stepName?: string;
	script: Expression<string>;
}

export function useGithubScript(options: UseGithubScriptOptions): Steps {
	return ({ use }) => {
		use(options.stepName || 'Run Github Script', actions.githubScript, {
			with: {
				script: options.script,
			},
		});
	};
}

export interface UseDockerLoginOptions {
	stepName?: string;
	registry: Expression<string>;
	username: Expression<string>;
	password: Expression<string>;
}

export function useDockerLogin(options: UseDockerLoginOptions): Steps {
	return ({ use }) => {
		use(options.stepName || 'Docker Login', actions.dockerLogin, {
			with: {
				registry: options.registry,
				username: options.username,
				password: options.password,
			},
		});
	};
}

export interface UseChangesetsOptions {
	stepName?: string;
	publishCommand: Expression<string>;
	versionCommand: Expression<string>;
	commitMessage: Expression<string>;
	prTitle: Expression<string>;
	createPRToken: Expression<string>;
	createReleaseToken: Expression<string>;
}

export function useChangesets(options: UseChangesetsOptions): Steps {
	return ({ use }) => {
		use(options.stepName || 'Run @changesets/action', actions.changesets, {
			with: {
				publish: options.publishCommand,
				version: options.versionCommand,
				commit: options.commitMessage,
				title: options.prTitle,
				commitMode: 'github-api',
				createGithubReleases: false,
			},
			env: {
				GITHUB_TOKEN: options.createPRToken,
				RELEASE_GITHUB_TOKEN: options.createReleaseToken,
			},
		});
	};
}

export interface UseGhPagesOptions {
	stepName?: string;
	githubToken: Expression<string>;
	publishDir: Expression<string>;
	userName: Expression<string>;
	userEmail: Expression<string>;
}

export function useGhPages(options: UseGhPagesOptions): Steps {
	return ({ use }) => {
		use(options.stepName || 'Deploy to GitHub Pages', actions.ghPages, {
			with: {
				github_token: options.githubToken,
				publish_dir: options.publishDir,
				user_name: options.userName,
				user_email: options.userEmail,
			},
		});
	};
}

export interface UseRenovateOptions {
	stepName?: string;
	token: Expression<string>;
	configurationFile: Expression<string>;
	logLevel?: Expression<string>;
	repositoryCache?: Expression<string>;
	platformCommit?: Expression<string>;
	repositories?: Expression<string>;
	nodeOptions?: Expression<string>;
	allowedCommands?: Expression<string>[];
	dockerUser?: Expression<string>;
	dockerCmdFile?: Expression<string>;
	dockerVolumes?: Expression<string>[];
	customEnvVariables?: Record<string, Expression<string>>;
}

export function useRenovate(options: UseRenovateOptions): Steps {
	return ({ use }) => {
		use(options.stepName || 'Run Renovate', actions.renovate, {
			with: {
				token: options.token,
				configurationFile: options.configurationFile,
				'docker-user': options.dockerUser,
				'docker-cmd-file': options.dockerCmdFile,
				'docker-volumes': options.dockerVolumes && joinStrings(options.dockerVolumes, ';'),
			},
			env: {
				RENOVATE_REPOSITORY_CACHE: options.repositoryCache,
				RENOVATE_PLATFORM_COMMIT: options.platformCommit,
				RENOVATE_REPOSITORIES: options.repositories,
				RENOVATE_ALLOWED_COMMANDS:
					options.allowedCommands && JSON.stringify(options.allowedCommands),
				RENOVATE_CUSTOM_ENV_VARIABLES:
					options.customEnvVariables && JSON.stringify(options.customEnvVariables),
				LOG_LEVEL: options.logLevel,
				NODE_OPTIONS: options.nodeOptions,
			},
		});
	};
}
