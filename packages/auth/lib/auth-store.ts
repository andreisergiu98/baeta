import { createContextStoreWithLoader } from '@baeta/core';
import { mapMaybePromise } from '@baeta/promises';
import { createGrantCache, type GrantCache } from './grant-cache.ts';
import type { ScopeCacheKeyMap } from './scope-cache-keys.ts';
import { createScopeCache } from './scope-cache.ts';
import {
	createScopeResolverMap,
	type GetScopeLoader,
	type ScopeResolverMap,
} from './scope-resolver.ts';
import type { ScopesShape } from './scope-shape.ts';

export interface AuthStoreResult {
	scopeResolverMap: ScopeResolverMap<ScopesShape>;
	grantCache: GrantCache;
}

export type AuthStore<Scopes extends ScopesShape, Context> = ReturnType<
	typeof createAuthStore<Scopes, Context>
>;

export function createAuthStore<Scopes extends ScopesShape, Context>() {
	const [get, load, getMaybeSync] = createContextStoreWithLoader(
		Symbol('@baeta/auth'),
		authStoreLoader<Scopes, Context>,
		{ warnOnDuplicateLoader: false },
	);
	return {
		get,
		load,
		getMaybeSync,
	};
}

function authStoreLoader<Scopes extends ScopesShape, Context>(
	ctx: Context,
	getScopeLoader: GetScopeLoader<Scopes, Context>,
	cacheKeyMap: ScopeCacheKeyMap<Scopes>,
): AuthStoreResult | PromiseLike<AuthStoreResult> {
	return mapMaybePromise(getScopeLoader(ctx), (scopeLoaders) => {
		const scopeCache = createScopeCache(cacheKeyMap);
		return {
			scopeResolverMap: createScopeResolverMap(
				scopeCache,
				scopeLoaders,
			) as ScopeResolverMap<ScopesShape>,
			grantCache: createGrantCache(),
		};
	});
}
