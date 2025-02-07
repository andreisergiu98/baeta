import type { Path } from 'graphql/jsutils/Path';

export function createResolverPath(path: Path | undefined): string {
	if (!path) {
		return '';
	}

	if (path.prev && !path.typename) {
		return createResolverPath(path.prev);
	}

	if (!path.typename) {
		return '';
	}

	const current = `${path.typename}.${path.key}`;

	if (!path.prev) {
		return current;
	}

	return `${createResolverPath(path.prev)}.${current}`;
}

export function isOperationType(type: string): type is 'Query' | 'Mutation' | 'Subscription' {
	return ['Query', 'Mutation', 'Subscription'].includes(type);
}
