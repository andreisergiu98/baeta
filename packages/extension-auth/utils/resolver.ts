import { Path } from 'graphql/jsutils/Path';

export function createResolverPath(path: Path | undefined, prevKey = ''): string {
  if (!path) {
    return '';
  }

  if (path.prev) {
    return createResolverPath(path.prev);
  }

  return `${prevKey}.${path.typename}.${path.key}`;
}

export function isOperationType(type: string): type is 'Query' | 'Mutation' | 'Subscription' {
  return ['Query', 'Mutation', 'Subscription'].includes(type);
}
