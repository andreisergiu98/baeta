import { v4 as uuid } from 'uuid';

export type PoolingType = 'global' | 'colo' | 'continent' | 'none';

export function getPoolingId(request: Request, poolingType: PoolingType): string {
  switch (poolingType) {
    case 'global':
      return 'global';
    case 'colo':
      return parseCfPropertyWithFallback(request.cf?.colo, 'global');
    case 'continent':
      return parseCfPropertyWithFallback(request.cf?.continent, 'global');
    case 'none':
      return uuid();
  }
}

function parseCfPropertyWithFallback(property: unknown, fallback: string) {
  if (typeof property === 'string') {
    return property;
  }
  return fallback;
}
