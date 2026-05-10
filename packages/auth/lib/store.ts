import { createContextStore } from '@baeta/core';
import type { GrantCache } from './grant-cache.ts';
import type { ScopeCache } from './scope-cache.ts';
import type { ScopeResolverMap } from './scope-resolver.ts';

export interface AuthStore {
	scopes: ScopeResolverMap;
	scopeCache: ScopeCache;
	grantCache: GrantCache;
}

export const authStoreKey = Symbol('auth-extension');

export const [getAuthStore, setAuthStore] = createContextStore<AuthStore>(authStoreKey);
