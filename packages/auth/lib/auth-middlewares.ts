import type { Middleware, ResolverParams } from '@baeta/core';
import { ForbiddenError } from '@baeta/errors';
import type { AuthStore } from './auth-store.ts';
import { defaultErrorResolver, resolveError, type ScopeErrorResolver } from './error.ts';
import { type GetGrant, saveGrants } from './grant.ts';
import type { ScopeCacheKeyMap } from './scope-cache-keys.ts';
import { type DefaultScopes, selectDefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import { verifyScope, type ScopeRules } from './scope-rules.ts';
import type { ScopesShape } from './scope-shape.ts';

/**
 * Options for authorization middlewares
 */
export interface AuthMiddlewareOptions<Grants extends string, Result, Source, Context, Args, Info> {
	/** Permissions to grant after successful authorization */
	grants?: GetGrant<Grants, Result, Source, Context, Args, Info>;
	/** Whether to skip default scopes for this operation */
	skipDefaults?: boolean;
}

/**
 * Function to get scope rules for pre-resolution authorization
 */
export type GetScopeRules<
	Scopes extends ScopesShape,
	Grants extends string,
	Source,
	Context,
	Args,
	Info,
> = (
	params: ResolverParams<Source, Context, Args, Info>,
) => boolean | ScopeRules<Scopes, Grants> | PromiseLike<boolean | ScopeRules<Scopes, Grants>>;

/**
 * Function to get scope rules for post-resolution authorization
 */
export type GetPostScopeRules<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Source,
	Context,
	Args,
	Info,
> = (
	params: ResolverParams<Source, Context, Args, Info>,
	result: Result,
) => boolean | ScopeRules<Scopes, Grants> | PromiseLike<boolean | ScopeRules<Scopes, Grants>>;

export function createMiddleware<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Source,
	Context,
	Args,
	Info,
>(
	type: string,
	loadScopes: GetScopeLoader<Scopes, unknown>,
	cacheKeyMap: ScopeCacheKeyMap<Scopes>,
	authStore: AuthStore<Scopes, unknown>,
	scopes: ScopeRules<Scopes, Grants> | GetScopeRules<Scopes, Grants, Source, Context, Args, Info>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	options?: AuthMiddlewareOptions<Grants, Result, Source, Context, Args, Info>,
	onError?: ScopeErrorResolver,
): Middleware<Result, Source, Context, Args, Info> {
	const getScopes = typeof scopes === 'function' ? scopes : () => scopes;
	const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, globalScopes);

	return async (next, params) => {
		authStore.load(params.ctx, loadScopes, cacheKeyMap);

		const requiredScopes = await getScopes(params);

		await verifyMiddlewareScopes(
			params,
			defaultScopes,
			requiredScopes,
			onError ?? defaultErrorResolver,
			authStore,
		);

		const result = await next();

		if (options?.grants && result != null) {
			const { grantCache } = await authStore.get(params.ctx);
			await saveGrants(params, result, options.grants, grantCache);
		}

		return result;
	};
}

export function createPostMiddleware<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Source,
	Context,
	Args,
	Info,
>(
	type: string,
	loadScopes: GetScopeLoader<Scopes, unknown>,
	cacheKeyMap: ScopeCacheKeyMap<Scopes>,
	authStore: AuthStore<Scopes, unknown>,
	getScopes: GetPostScopeRules<Scopes, Grants, Result, Source, Context, Args, Info>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	options?: AuthMiddlewareOptions<Grants, Result, Source, Context, Args, Info>,
	onError?: ScopeErrorResolver,
): Middleware<Result, Source, Context, Args, Info> {
	const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, globalScopes);

	return async (next, params) => {
		authStore.load(params.ctx, loadScopes, cacheKeyMap);

		const result = await next();
		const requiredScopes = await getScopes(params, result);

		await verifyMiddlewareScopes(
			params,
			defaultScopes,
			requiredScopes,
			onError ?? defaultErrorResolver,
			authStore,
		);

		if (options?.grants && result != null) {
			const { grantCache } = await authStore.get(params.ctx);
			await saveGrants(params, result, options.grants, grantCache);
		}

		return result;
	};
}

export function createFallbackMiddleware<
	Scopes extends ScopesShape,
	Grants extends string,
	Context,
>(
	type: string,
	loadScopes: GetScopeLoader<Scopes, unknown>,
	cacheKeyMap: ScopeCacheKeyMap<Scopes>,
	authStore: AuthStore<Scopes, unknown>,
	globalScopes: DefaultScopes<Scopes, Grants>,
	onError?: ScopeErrorResolver,
) {
	const rules = selectDefaultScopes(false, type, globalScopes);
	if (rules == null) {
		return;
	}

	return createMiddleware<Scopes, Grants, any, unknown, Context, unknown, unknown>(
		type,
		loadScopes,
		cacheKeyMap,
		authStore,
		rules,
		{},
		{
			skipDefaults: true,
		},
		onError,
	);
}

export async function verifyMiddlewareScopes<
	Scopes extends ScopesShape,
	Grants extends string,
	Source,
	Context,
>(
	params: ResolverParams<Source, Context, unknown, unknown>,
	defaultScopes: ScopeRules<Scopes, Grants> | undefined,
	requiredScopes: ScopeRules<Scopes, Grants> | boolean | undefined,
	errorResolver: ScopeErrorResolver,
	authStore: AuthStore<Scopes, unknown>,
) {
	if (requiredScopes === false) {
		throw new ForbiddenError();
	}

	if (!defaultScopes && requiredScopes === true) {
		return;
	}

	const store = await authStore.get(params.ctx);
	const promises: Promise<unknown>[] = [];

	if (defaultScopes) {
		promises.push(verifyScope(params, defaultScopes, store));
	}

	if (requiredScopes !== true) {
		promises.push(verifyScope(params, requiredScopes, store));
	}

	return await Promise.all(promises).catch((err) => resolveError(err, errorResolver));
}
