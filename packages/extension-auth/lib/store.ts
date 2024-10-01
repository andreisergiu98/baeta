import { createContextStore } from '@baeta/core';
import { GrantCache } from './grant-cache';
import { ScopeCache } from './scope-cache';
import { ScopeResolverMap } from './scope-resolver';

export interface AuthStore {
	scopes: ScopeResolverMap;
	scopeCache: ScopeCache;
	grantCache: GrantCache;
}

export const authStoreKey = Symbol('auth-extension');

export const [getAuthStore, setAuthStore] = createContextStore<AuthStore>(authStoreKey);
