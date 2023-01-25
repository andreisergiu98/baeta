import { Path } from 'graphql/jsutils/Path';

export function createResolverPath(path: Path | undefined, prevKey: string = ''): string {
  if (!path) {
    return '';
  }

  if (path.prev) {
    return createResolverPath(path.prev);
  }

  return `${prevKey}.${path.typename}.${path.key}`;
}
