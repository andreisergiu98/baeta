import { createGrantCache } from './grant-cache';
import { createScopeCache } from './scope-cache';
import { GetScopeLoader, createScopeResolverMap } from './scope-resolver';
import { setAuthStore } from './store';

export function loadAuthStore<T>(ctx: T, getScopeLoader: GetScopeLoader<T>) {
  setAuthStore(ctx, async () => {
    const scopeLoaders = await getScopeLoader(ctx);
    return {
      scopes: createScopeResolverMap(ctx, scopeLoaders),
      scopeCache: createScopeCache(),
      grantCache: createGrantCache(),
    };
  });
}
