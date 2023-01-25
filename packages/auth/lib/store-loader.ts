import { createGrantCache } from './grant-cache';
import { createScopeCache } from './scope-cache';
import { createScopeResolverMap, ScopesInitializer } from './scope-loader';
import { AuthStore, authStoreKey } from './store';

export function loadAuthStore<T>(_ctx: T, initialize: ScopesInitializer<T>) {
  const ctx = _ctx as Record<symbol, unknown>;

  // already loaded
  if (ctx[authStoreKey]) {
    return;
  }

  ctx[authStoreKey] = initializeAuthStore(_ctx, initialize);
}

async function initializeAuthStore<T>(
  ctx: T,
  initialize: ScopesInitializer<T>
): Promise<AuthStore> {
  const scopeMap = await initialize(ctx);

  return {
    scopes: createScopeResolverMap(ctx, scopeMap),
    scopeCache: createScopeCache(),
    grantCache: createGrantCache(),
  };
}
