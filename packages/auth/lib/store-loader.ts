import { createGrantCache } from './grant-cache.ts';
import type { ScopeCacheKeyMap } from './scope-cache-keys.ts';
import { createScopeCache } from './scope-cache.ts';
import {
	createScopeResolverMap,
	type GetScopeLoader,
	type ScopeResolverMap,
} from './scope-resolver.ts';
import type { ScopesShape } from './scope-rules.ts';
import { setAuthStore } from './store.ts';

export function loadAuthStore<S extends ScopesShape, T>(
	ctx: T,
	getScopeLoader: GetScopeLoader<S, T>,
	cacheKeyMap: ScopeCacheKeyMap<S>,
) {
	setAuthStore(ctx, async () => {
		const scopeLoaders = await getScopeLoader(ctx);
		return {
			scopes: createScopeResolverMap(ctx, scopeLoaders) as ScopeResolverMap<ScopesShape>,
			scopeCache: createScopeCache(cacheKeyMap),
			grantCache: createGrantCache(),
		};
	});
}
