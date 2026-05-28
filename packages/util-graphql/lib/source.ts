import { normalize } from '@baeta/util-path';
import type { Source } from '@graphql-tools/utils';
import type { GraphQLSchema } from 'graphql';

export type { Source };

const SEP = '/';

export function groupSourcesByModule(sources: Source[], basePath: string) {
	const map = new Map<string, Source[]>();
	for (const source of sources) {
		if (!source.location) {
			continue;
		}
		const relativePath = getRelativePath(source.location, basePath);
		if (!relativePath) {
			continue;
		}
		const mod = extractModuleDirectory(relativePath);
		const existing = map.get(mod) ?? [];
		existing.push(source);
		map.set(mod, existing);
	}
	return map;
}

export function getSourcesFromSchema(schema: GraphQLSchema) {
	const extensions = schema.extensions;
	return (extensions?.extendedSources ?? []) as Source[];
}

function extractModuleDirectory(relativePath: string): string {
	const [moduleDirectory] = relativePath.split(SEP);
	return moduleDirectory;
}

function getRelativePath(filepath: string, basePath: string) {
	const normalizedFilepath = ensureStartsWithSeparator(
		ensureEndsWithSeparator(normalize(filepath)),
	);
	const normalizedBasePath = ensureStartsWithSeparator(
		ensureEndsWithSeparator(normalize(basePath)),
	);
	const idx = normalizedFilepath.indexOf(normalizedBasePath);
	if (idx === -1) {
		return undefined;
	}
	const relativePath = normalizedFilepath.slice(idx + normalizedBasePath.length);
	return relativePath.length > 0 ? relativePath : undefined;
}

function ensureStartsWithSeparator(path: string) {
	return path.startsWith(SEP) ? path : SEP + path;
}

function ensureEndsWithSeparator(path: string) {
	return path.endsWith(SEP) ? path : path + SEP;
}
