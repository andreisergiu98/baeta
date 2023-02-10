import { createGrantCache } from './grant-cache';
import { createScopeCache } from './scope-cache';
import { createScopeResolverMap, ScopesInitializer } from './scope-loader';
import { setAuthStore } from './store';

export function loadAuthStore<T>(ctx: T, initialize: ScopesInitializer<T>) {
  setAuthStore(ctx, async () => {
    const scopeMap = await initialize(ctx);
    return {
      scopes: createScopeResolverMap(ctx, scopeMap),
      scopeCache: createScopeCache(),
      grantCache: createGrantCache(),
    };
  });
}
