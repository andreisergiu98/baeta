import { getInfo, getInfoFromPullRequest } from '@changesets/get-github-info';
import type { ChangelogFunctions } from '@changesets/types';

const GITHUB_SERVER_URL = process.env.GITHUB_SERVER_URL || 'https://github.com';

const CONFIG_HINT = [
	'Please provide a repo to this changelog generator like this:',
	'"changelog": ["@baeta/changelog", { "repo": "org/repo" }]',
].join('\n');

const changelogFunctions: ChangelogFunctions = {
	getDependencyReleaseLine: async (changesets, dependenciesUpdated, options) => {
		if (!options.repo) {
			throw new Error(CONFIG_HINT);
		}
		if (dependenciesUpdated.length === 0) {
			return '';
		}
		const commitLinks = (
			await Promise.all(
				changesets.map(async (cs) => {
					if (!cs.commit) return null;
					const { links } = await getInfo({
						repo: options.repo,
						commit: cs.commit,
					});
					return links.commit;
				}),
			)
		)
			.filter((el) => el)
			.join(', ');
		const changesetLink = `- Updated dependencies${commitLinks ? ` [${commitLinks}]` : ''}:`;
		const updatedDependenciesList = dependenciesUpdated.map(
			(dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
		);
		return [changesetLink, ...updatedDependenciesList].join('\n');
	},
	getReleaseLine: async (changeset, _type, options) => {
		if (!options?.repo) {
			throw new Error(CONFIG_HINT);
		}
		const ctx: RepoCtx = { repo: options.repo, serverUrl: GITHUB_SERVER_URL };
		const meta = parseSummary(changeset.summary);
		const links = await resolveLinks(meta, changeset.commit, ctx);
		const users = resolveUsers(meta, links, ctx);
		const attribution = buildAttribution(links, users);
		const body = formatBody(meta.body, attribution, ctx);
		return `\n\n- ${body}`;
	},
};

export default changelogFunctions;

type Links = { pull: string | null; commit: string | null; user: string | null };

type SummaryMeta = { pr?: number; commit?: string; users: string[]; body: string };

type RepoCtx = { repo: string; serverUrl: string };

const META_PR = /^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)\s*$/i;
const META_COMMIT = /^\s*commit:\s*(\S+)\s*$/i;
const META_USER = /^\s*(?:author|user):\s*@?(\S+)\s*$/i;

function parseSummary(summary: string): SummaryMeta {
	const lines = summary.split('\n');
	let pr: number | undefined;
	let commit: string | undefined;
	const users: string[] = [];
	let cursor = 0;

	for (; cursor < lines.length; cursor++) {
		const line = lines[cursor];

		if (line.trim() === '' && pr === undefined && commit === undefined && users.length === 0) {
			continue;
		}

		const prMatch = line.match(META_PR);
		if (prMatch) {
			const num = Number(prMatch[1]);
			if (!Number.isNaN(num)) pr = num;
			continue;
		}

		const commitMatch = line.match(META_COMMIT);
		if (commitMatch) {
			commit = commitMatch[1];
			continue;
		}

		const userMatch = line.match(META_USER);
		if (userMatch) {
			users.push(userMatch[1]);
			continue;
		}

		break;
	}

	const body = lines.slice(cursor).join('\n').trim();
	return { pr, commit, users, body };
}

async function resolveLinks(
	meta: SummaryMeta,
	fallbackCommit: string | undefined,
	ctx: RepoCtx,
): Promise<Links> {
	if (meta.pr !== undefined) {
		const { links } = await getInfoFromPullRequest({ repo: ctx.repo, pull: meta.pr });
		return meta.commit ? { ...links, commit: commitLink(meta.commit, ctx) } : links;
	}
	const sha = meta.commit ?? fallbackCommit;
	if (sha) {
		const { links } = await getInfo({ repo: ctx.repo, commit: sha });
		return links;
	}
	return { pull: null, commit: null, user: null };
}

function commitLink(sha: string, ctx: RepoCtx): string {
	const shortCommitId = sha.slice(0, 7);
	return `[\`${shortCommitId}\`](${ctx.serverUrl}/${ctx.repo}/commit/${sha})`;
}

function userLink(user: string, ctx: RepoCtx): string {
	return `[@${user}](${ctx.serverUrl}/${user})`;
}

function issueRefLinks(
	line: string,
	{ serverUrl, repo }: { serverUrl: string; repo: string },
): string {
	return line.replace(/\[.*?\]\(.*?\)|\B#([1-9]\d*)\b/g, (match, issue) =>
		// PRs and issues are the same thing on GitHub (to some extent, of course)
		// this relies on GitHub redirecting from /issues/1234 to /pull/1234 when necessary
		issue ? `[#${issue}](${serverUrl}/${repo}/issues/${issue})` : match,
	);
}

function resolveUsers(meta: SummaryMeta, links: Links, ctx: RepoCtx): string | null {
	if (meta.users.length) return meta.users.map((u) => userLink(u, ctx)).join(', ');
	return links.user;
}

function buildAttribution(links: Links, users: string | null): string {
	const parts: string[] = [];
	if (users !== null) parts.push(`by ${users}`);
	if (links.pull !== null) parts.push(`in ${links.pull}`);
	else if (links.commit !== null) parts.push(`in ${links.commit}`);
	return parts.length ? ` ${parts.join(' ')}` : '';
}

function formatBody(body: string, attribution: string, ctx: RepoCtx): string {
	const [first, ...rest] = body.split('\n').map((l) => l.trimEnd());
	const head = `${issueRefLinks(first, ctx)}${attribution}`;
	if (rest.length === 0) return head;
	const tail = rest.map((l) => `  ${issueRefLinks(l, ctx)}`).join('\n');
	return `${head}\n${tail}`;
}
