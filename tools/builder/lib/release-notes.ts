import { readFile } from 'node:fs/promises';
import * as github from '@actions/github';
import { PACKAGES_WITH_FIXED_VERSIONS } from '@baeta/workspace-config';
import { RequestError } from '@octokit/request-error';
import { getChangelogEntry } from './changelog.ts';
import type { PublicWorkspacePackage } from './workspace.ts';

interface CreateReleaseNotesOptions {
	githubToken: string;
	metadata: {
		name: string;
		tag_name: string;
		prerelease: boolean;
	};
}

export async function createReleaseNotes({ metadata, githubToken }: CreateReleaseNotesOptions) {
	const octokit = github.getOctokit(githubToken);
	try {
		await octokit.rest.repos.createRelease({
			...github.context.repo,
			...metadata,
		});
	} catch (error) {
		if (error instanceof RequestError && error.status === 422) {
			console.warn(`Release ${metadata.tag_name} already exists, skipping`);
			return;
		}
		throw error;
	}
}

interface CreateVersionTagsOptions {
	packages: PublicWorkspacePackage[];
	githubToken: string;
}

export async function createPackagesVersionTags({
	packages,
	githubToken,
}: CreateVersionTagsOptions) {
	const octokit = github.getOctokit(githubToken);
	await Promise.all(packages.map((pkg) => createPackageVersionTag(pkg, octokit)));
}

async function createPackageVersionTag(
	pkg: PublicWorkspacePackage,
	octokit: ReturnType<typeof github.getOctokit>,
) {
	const tagName = `${pkg.name}@${pkg.version}`;
	try {
		await octokit.rest.git.createRef({
			...github.context.repo,
			ref: `refs/tags/${tagName}`,
			sha: github.context.sha,
		});
	} catch (error) {
		if (error instanceof RequestError && error.status === 422) {
			console.warn(`Tag ${tagName} already exists`);
		} else {
			throw error;
		}
	}
}

export interface CreateReleaseNotesMetadataOptions {
	packages: PublicWorkspacePackage[];
	isPrerelease: boolean;
}

export async function createReleaseNotesMetadata({
	packages,
	isPrerelease,
}: CreateReleaseNotesMetadataOptions) {
	const packagesWithNotes = await createPackagesWithReleaseNotes(packages);
	const body = packagesWithNotes
		.toSorted((a, b) => a.name.localeCompare(b.name))
		.map((pkg) => pkg.releaseNotes)
		.filter((notes) => notes != null)
		.sort((a, b) => b.highestLevel - a.highestLevel)
		.map((pkg) => pkg.content)
		.join('\n\n');
	const mainVersion = getFixedGroupVersion(packages);

	return {
		...createVersionMetadata(mainVersion, isPrerelease),
		prerelease: isPrerelease,
		body,
	};
}

function createVersionMetadata(mainVersion: string | undefined, isPrerelease: boolean) {
	if (mainVersion) {
		return {
			name: `v${mainVersion}`,
			tag_name: `v${mainVersion}`,
		};
	}
	console.warn('No fixed version found for the release, using utils release name and tag');

	const now = new Date();
	const stamp = now.toISOString().slice(0, 19).replace(/[:T-]/g, '');
	const date = now.toISOString().slice(0, 10);
	return {
		name: `Utils ${date}`,
		tag_name: ['utils', isPrerelease ? 'next' : null, stamp].filter((el) => el != null).join('-'),
	};
}

function getFixedGroupVersion(packages: PublicWorkspacePackage[]) {
	return packages.find((pkg) => PACKAGES_WITH_FIXED_VERSIONS.has(pkg.name))?.version;
}

async function createPackagesWithReleaseNotes(packages: PublicWorkspacePackage[]) {
	return await Promise.all(
		packages.map(async (pkg) => {
			return {
				...pkg,
				releaseNotes: await createReleaseNotesForPackage(pkg),
			};
		}),
	);
}

async function createReleaseNotesForPackage(pkg: PublicWorkspacePackage) {
	const changelog = await readFile(`${pkg.dir}/CHANGELOG.md`, 'utf8').catch(() => null);
	if (!changelog) {
		return null;
	}
	const entry = getChangelogEntry(changelog, pkg.version);
	if (!entry?.content) {
		return null;
	}
	return {
		content: `## ${pkg.name}@${pkg.version}\n\n${entry.content}`,
		highestLevel: entry.highestLevel,
	};
}
