import { marked } from 'marked';

export const BumpLevels = {
	dep: 0,
	patch: 1,
	minor: 2,
	major: 3,
} as const;

export function getChangelogEntry(changelog: string, version: string) {
	const tokens = marked.lexer(changelog);

	let highestLevel: number = BumpLevels.dep;
	let headingStartInfo:
		| {
				index: number;
				depth: number;
		  }
		| undefined;
	let endIndex: number | undefined;

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];
		if (token.type !== 'heading') continue;
		const text: string = token.text;
		const depth: number = token.depth;

		const stringified = text.trim();
		const match = stringified.toLowerCase().match(/(major|minor|patch)/);

		if (match !== null && match.length > 0) {
			const level = BumpLevels[match[0] as 'major' | 'minor' | 'patch'];
			highestLevel = Math.max(level, highestLevel);
		}

		if (headingStartInfo == null && stringified === version) {
			headingStartInfo = {
				index: i,
				depth,
			};
			continue;
		}

		if (endIndex == null && headingStartInfo != null && headingStartInfo.depth === depth) {
			endIndex = i;
			break;
		}
	}

	if (headingStartInfo == null) {
		return null;
	}

	return {
		content: tokens
			.slice(headingStartInfo.index + 1, endIndex)
			.map((t) => t.raw)
			.join('')
			.trim(),
		highestLevel,
	};
}
