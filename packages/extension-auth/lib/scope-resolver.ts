import { ForbiddenError } from '@baeta/errors';
import type { Scopes } from './scope-rules.ts';
import { getAuthStore } from './store.ts';

/**
 * Function that creates scope loaders for authorization checks.
 * Returns a map of scope loaders that can be synchronous or asynchronous.
 *
 * @param ctx - The application context
 * @returns A map of scope loaders or a promise resolving to scope loaders
 *
 * @example
 * ```typescript
 * const getScopeLoader: GetScopeLoader<Context> = (ctx) => ({
 *   isLoggedIn: async () => {
 *     if (!ctx.userId) throw new UnauthenticatedError();
 *     return true;
 *   },
 *   hasAccess: (role) => ctx.user?.role === role
 * });
 * ```
 */
export type GetScopeLoader<Ctx> = (ctx: Ctx) => ScopeLoaderMap | Promise<ScopeLoaderMap>;

/**
 * Represents a scope loader that can be either a boolean value or a function.
 * Function loaders receive the scope value and return a boolean result.
 *
 * @example
 * ```typescript
 * // Boolean loader
 * const publicLoader: ScopeLoader<boolean> = true;
 *
 * // Function loader
 * const roleLoader: ScopeLoader<string> = (role) => userRole === role;
 * ```
 */
export type ScopeLoader<T> = boolean | ((value: T) => boolean | Promise<boolean>);

/**
 * Maps scope names to their respective loaders.
 * Each loader handles authorization checks for its scope.
 *
 * @example
 * ```typescript
 * const loaders: ScopeLoaderMap = {
 *   isPublic: true,
 *   isLoggedIn: () => Boolean(ctx.userId),
 *   hasAccess: (role) => ctx.user?.roles.includes(role)
 * };
 * ```
 */
export type ScopeLoaderMap = {
	[K in Scopes]: ScopeLoader<AuthExtension.Scopes[K]>;
};

type ScopeResolver = (value: unknown) => true | Promise<true>;

export type ScopeResolverMap = {
	[k: string]: ScopeResolver;
};

export function resolveBoolean(param: boolean) {
	if (param !== true) {
		throw new ForbiddenError();
	}
	return true as const;
}

export function createScopeResolver(
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
