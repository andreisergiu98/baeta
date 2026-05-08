import path from 'node:path';
import type { PlopTypes } from '@turbo/gen';
import { pathsFromMapping, syncRules } from './sync-rules.ts';

const TEMPLATE_TO_ROOT = '../../../../';
const DEST_TO_ROOT = '../../';

function templatePath(...segments: string[]): string {
	return TEMPLATE_TO_ROOT + path.join(...segments);
}

function destPath(...segments: string[]): string {
	return DEST_TO_ROOT + path.join(...segments);
}

export function buildSyncActions(): PlopTypes.ActionType[] {
	const actions: PlopTypes.ActionType[] = [];

	for (const rule of syncRules) {
		const src = `e2e/${rule.from}`;
		const dest = `e2e/${rule.to}`;
		const ignoreSet = new Set(rule.ignore);

		for (const mapping of rule.files) {
			const [relativeSrc, relativeDest] = pathsFromMapping(mapping);
			if (ignoreSet.has(relativeSrc)) continue;
			actions.push({
				type: 'add',
				path: destPath(dest, relativeDest),
				templateFile: templatePath(src, relativeSrc),
				force: true,
			});
		}

		for (const mapping of rule.dirs) {
			const [relativeSrc, relativeDest] = pathsFromMapping(mapping);
			const negativeGlobs = rule.ignore
				.filter((ig) => ig.startsWith(`${relativeSrc}/`))
				.map((ig) => `!${templatePath(src, ig)}`);
			actions.push({
				type: 'addMany',
				destination: destPath(dest, relativeDest),
				base: templatePath(src, relativeSrc),
				templateFiles: [templatePath(src, relativeSrc, '**', '*'), ...negativeGlobs],
				globOptions: { dot: true },
				force: true,
			});
		}
	}

	return actions;
}
