import { ForbiddenError } from '@baeta/errors';
import type { Scopes } from './scope-rules.ts';
import { getAuthStore } from './store.ts';

export type GetScopeLoader<Ctx> = (ctx: Ctx) => ScopeLoaderMap | Promise<ScopeLoaderMap>;

export type ScopeLoader<T> = boolean | ((value: T) => boolean | Promise<boolean>);

export type ScopeLoaderMap = {
	[K in Scopes]: ScopeLoader<AuthExtension.Scopes[K]>;
};

type ScopeResolver = (value: unknown) => true | Promise<true>;

export type ScopeResolverMap = {
	[k: string]: ScopeResolver;
};

function resolveBoolean(param: boolean) {
	if (param !== true) {
		throw new ForbiddenError();
	}
	return true as const;
}

function createScopeResolver(
	ctx: unknown,
	name: string,
	value: ScopeLoader<unknown>,
): ScopeResolver {
	const isFunction = typeof value === 'function';

	if (!isFunction) {
		return () => resolveBoolean(value);
	}

	return async (param: unknown) => {
		const store = await getAuthStore(ctx);
		const key = store.scopeCache.createKey(name, param);
		const cached = await store.scopeCache.getScopeValue(key);

		if (cached != null) {
			return resolveBoolean(cached);
		}

		const awaitableResult = value(param);
		store.scopeCache.setScopeValue(key, awaitableResult);
		return resolveBoolean(await awaitableResult);
	};
}

export function createScopeResolverMap(
	ctx: unknown,
	scopeLoaderMap: ScopeLoaderMap,
): ScopeResolverMap {
	const map: ScopeResolverMap = {};

	for (const [key, value] of Object.entries(scopeLoaderMap)) {
		map[key] = createScopeResolver(ctx, key, value as ScopeLoader<unknown>);
	}

	return map;
}
