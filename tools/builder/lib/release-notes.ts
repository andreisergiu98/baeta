import { readFile, writeFile } from 'node:fs/promises';
import * as github from '@actions/github';
import { getChangelogEntry } from '@changesets/release-utils';
import changesetConfig from '../../../.changeset/config.json' with { type: 'json' };
import type { PublicWorkspacePackage } from './workspace.ts';

interface CreateReleaseNotesOptions {
	packages: PublicWorkspacePackage[];
	githubToken?: string;
	isPrerelease: boolean;
	dryRun?: boolean;
}

const fixedPackages = new Set(changesetConfig.fixed[0] ?? []);

export async function createReleaseNotes({
	packages,
	isPrerelease,
	githubToken,
	dryRun,
}: CreateReleaseNotesOptions) {
	const packagesWithNotes = await createPackagesWithReleaseNotes(packages);
	const body = packagesWithNotes.map((pkg) => pkg.releaseNotes).join('\n\n');
	const mainVersion = getFixedGroupVersion(packages);

	const metadata = {
		...createVersionMetadata(mainVersion, isPrerelease),
		prerelease: isPrerelease,
	};

	console.log('Creating GitHub release with the following content:\n', metadata);

	if (dryRun || !githubToken) {
		await writeFile(`./release-notes-${metadata.tag_name}.md`, body);
		return;
	}

	const octokit = github.getOctokit(githubToken);
	await octokit.rest.repos.createRelease({
		...github.context.repo,
		...metadata,
		body,
	});
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
	return packages.find((pkg) => fixedPackages.has(pkg.name))?.version;
}

async function createPackagesWithReleaseNotes(packages: PublicWorkspacePackage[]) {
	return Promise.all(
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
		return `## ${pkg.name}@${pkg.version}`;
	}
	const entry = getChangelogEntry(changelog, pkg.version);
	return `## ${pkg.name}@${pkg.version}\n\n${entry.content}`;
}
