import { GrantCache } from './grant-cache';
import { ScopeCache } from './scope-cache';
import { ScopeResolverMap } from './scope-loader';

export interface AuthStore {
  scopes: ScopeResolverMap;
  scopeCache: ScopeCache;
  grantCache: GrantCache;
}

export const authStoreKey = Symbol('getAuthStore');

export async function getAuthStore(_ctx: unknown) {
  const ctx = _ctx as Record<symbol, unknown>;
  if (!ctx[authStoreKey]) {
    throw new Error('Auth Store not initialized');
  }
  return ctx[authStoreKey] as Promise<AuthStore>;
}
