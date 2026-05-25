import { ForbiddenError } from '@baeta/errors';
import type { ScopesShape } from './scope-rules.ts';
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
export type GetScopeLoader<Scopes extends ScopesShape, Ctx> = (
	ctx: Ctx,
) => ScopeLoaderMap<Scopes> | Promise<ScopeLoaderMap<Scopes>>;

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
export type ScopeLoader<T> = T extends boolean
	? boolean | (() => boolean | Promise<boolean>)
	: (param: T) => boolean | Promise<boolean>;

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
export type ScopeLoaderMap<Scopes extends ScopesShape> = {
	[K in keyof Scopes]: Scopes[K] extends boolean
		? boolean | (() => boolean | Promise<boolean>)
		: (param: Scopes[K]) => boolean | Promise<boolean>;
};

type ScopeResolver = (value: unknown) => true | Promise<true>;

export type ScopeResolverMap<Scopes extends ScopesShape> = Map<keyof Scopes, ScopeResolver>;

export function resolveBoolean(param: boolean) {
	if (param !== true) {
		throw new ForbiddenError();
	}
	return true as const;
}

export function createScopeResolver(
	ctx: unknown,
	name: string,
	value: boolean | ScopeLoader<unknown>,
): ScopeResolver {
	const isFunction = typeof value === 'function';

	if (!isFunction) {
		return () => resolveBoolean(value);
	}

	return async (params: unknown) => {
		const store = await getAuthStore(ctx);
		const cached = await store.scopeCache.getScopeValue(name, params);

		if (cached != null) {
			return resolveBoolean(cached);
		}

		const resultPromise = value(params);
		store.scopeCache.setScopeValue(name, params, resultPromise);
		const result = await resultPromise;
		return resolveBoolean(result);
	};
}

export function createScopeResolverMap<Scopes extends ScopesShape>(
	ctx: unknown,
	scopeLoaderMap: ScopeLoaderMap<Scopes>,
): ScopeResolverMap<Scopes> {
	const map = new Map<keyof Scopes, ScopeResolver>();
	for (const [key, value] of Object.entries(scopeLoaderMap)) {
		map.set(key, createScopeResolver(ctx, key, value));
	}
	return map;
}
