import type { ScopeCacheKeyMap } from './scope-cache-keys.ts';
import type { ScopesShape } from './scope-rules.ts';
import { canSafelySerialize, createScopeCacheKey } from './serialize.ts';

const noParameterKey = Symbol('no-parameter');

export function createScopeCache<Scopes extends ScopesShape>(
	cacheKeyMap: ScopeCacheKeyMap<Scopes>,
) {
	const scopeCache = new Map<string, Map<any, boolean | Promise<boolean>>>();
	const keyFns = cacheKeyMap as Record<string, ((param?: unknown) => unknown) | undefined>;

	const makeKey = (scope: string, params?: unknown) => {
		if (params === undefined) return noParameterKey;
		const customKeyFn = keyFns[scope];
		if (customKeyFn) return customKeyFn(params);
		if (canSafelySerialize(params)) return createScopeCacheKey(params);
		return params;
	};

	return {
		getScopeValue: (scope: string, params?: unknown) => {
			return scopeCache.get(scope)?.get(makeKey(scope, params));
		},
		setScopeValue: (scope: string, params: unknown, value: boolean | Promise<boolean>) => {
			const inScopeMap = scopeCache.get(scope) ?? new Map<any, boolean | Promise<boolean>>();
			inScopeMap.set(makeKey(scope, params), value);
			scopeCache.set(scope, inScopeMap);
		},
	};
}

export type ScopeCache = ReturnType<typeof createScopeCache>;
