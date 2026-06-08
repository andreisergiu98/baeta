import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

export type PathMapping = `${string}:${string}`;

export interface TextTransform {
	file: string;
	replacements: [search: string, replace: string][];
}

export interface SyncRule {
	kind: 'sync';
	from: string;
	to: string;
	files?: PathMapping[];
	dirs?: PathMapping[];
	transforms?: TextTransform[];
	ignore?: string[];
}

export interface AddRule {
	kind: 'add';
	to: string;
	content: string;
}

export type GenerateRule = SyncRule | AddRule;

export function defineGenerateConfig(rules: GenerateRule[]): GenerateRule[] {
	return rules;
}

export function pathsFromMapping(mapping: PathMapping): [string, string] {
	const [relativeSrc, relativeDest] = mapping.split(':');
	return [relativeSrc, relativeDest];
}

export function merge(
	rule: Pick<SyncRule, 'from' | 'to'> & Partial<SyncRule>,
	defaults: Partial<SyncRule>,
): SyncRule {
	return {
		kind: 'sync',
		from: rule.from,
		to: rule.to,
		files: (rule.files ?? []).concat(defaults.files ?? []),
		dirs: (rule.dirs ?? []).concat(defaults.dirs ?? []),
		transforms: (rule.transforms ?? []).concat(defaults.transforms ?? []),
		ignore: (rule.ignore ?? []).concat(defaults.ignore ?? []),
	};
}

interface ApplyOptions {
	cwd?: string;
}

export async function applyRules(rules: GenerateRule[], options: ApplyOptions = {}): Promise<void> {
	const cwd = options.cwd ?? process.cwd();
	for (const rule of rules) {
		switch (rule.kind) {
			case 'add':
				await applyAddRule(rule, cwd);
				break;
			case 'sync':
				await applySyncRule(rule, cwd);
				break;
			default:
				return rule satisfies never;
		}
	}
}

async function applyAddRule(rule: AddRule, cwd: string): Promise<void> {
	const dest = path.resolve(cwd, rule.to);
	await mkdir(path.dirname(dest), { recursive: true });
	await writeFile(dest, rule.content);
}

async function applySyncRule(rule: SyncRule, cwd: string): Promise<void> {
	const src = path.resolve(cwd, rule.from);
	const dest = path.resolve(cwd, rule.to);
	const ignore = new Set(rule.ignore ?? []);

	for (const mapping of rule.files ?? []) {
		const [relativeSrc, relativeDest] = pathsFromMapping(mapping);
		if (ignore.has(relativeSrc)) continue;
		await copyFile(path.join(src, relativeSrc), path.join(dest, relativeDest));
	}

	for (const mapping of rule.dirs ?? []) {
		const [relativeSrc, relativeDest] = pathsFromMapping(mapping);
		await copyDir(path.join(src, relativeSrc), path.join(dest, relativeDest), {
			isIgnored: (fromRelative) => ignore.has(fromRelative),
			relativeSrc,
		});
	}

	for (const transform of rule.transforms ?? []) {
		await applyTransform(path.join(dest, transform.file), transform);
	}
}

async function copyFile(from: string, to: string): Promise<void> {
	await mkdir(path.dirname(to), { recursive: true });
	await rm(to, { force: true });
	await cp(from, to);
}

async function copyDir(
	from: string,
	to: string,
	options: { isIgnored: (fromRelative: string) => boolean; relativeSrc: string },
): Promise<void> {
	const entries = await readdir(from, { withFileTypes: true, recursive: true });
	for (const entry of entries) {
		if (!entry.isFile()) continue;
		const absolute = path.join(entry.parentPath, entry.name);
		const withinDir = path.relative(from, absolute);
		const fromRelative = path.join(options.relativeSrc, withinDir);
		if (options.isIgnored(fromRelative)) continue;
		await copyFile(absolute, path.join(to, withinDir));
	}
}

async function applyTransform(file: string, transform: TextTransform): Promise<void> {
	let content = await readFile(file, 'utf-8');
	for (const [search, replace] of transform.replacements) {
		content = content.split(search).join(replace);
	}
	await writeFile(file, content);
}
