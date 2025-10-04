import type { Source } from '@graphql-tools/utils';
import type { GraphQLSchema } from 'graphql';
import { extractModuleDirectory, getRelativePath } from './path.ts';

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
