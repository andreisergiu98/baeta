import type { Middleware, ResolverParams } from '@baeta/core';
import { ForbiddenError } from '@baeta/errors';
import { mapMaybePromise, thenMaybePromise } from '@baeta/promises';
import type { AuthStore } from './auth-store.ts';
import { defaultErrorResolver, resolveError, type ScopeErrorResolver } from './error.ts';
import { type GetGrant, saveGrants } from './grant.ts';
import type { ScopeCacheKeyMap } from './scope-cache-keys.ts';
import { type DefaultScopes, selectDefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import { verifyAndScopes, type ScopeRules } from './scope-rules.ts';
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

	return (next, params) => {
		authStore.load(params.ctx, loadScopes, cacheKeyMap);

		const verified = mapMaybePromise(getScopes(params), (requiredScopes) =>
			verifyMiddlewareScopes(
				params,
				defaultScopes,
				requiredScopes,
				onError ?? defaultErrorResolver,
				authStore,
			),
		);

		return mapMaybePromise(verified, () =>
			mapMaybePromise(next(), (result) =>
				saveResultGrants(params, result, authStore, options?.grants),
			),
		);
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

	return (next, params) => {
		authStore.load(params.ctx, loadScopes, cacheKeyMap);

		return mapMaybePromise(next(), (result) => {
			const verified = mapMaybePromise(getScopes(params, result), (requiredScopes) =>
				verifyMiddlewareScopes(
					params,
					defaultScopes,
					requiredScopes,
					onError ?? defaultErrorResolver,
					authStore,
				),
			);

			return mapMaybePromise(verified, () =>
				saveResultGrants(params, result, authStore, options?.grants),
			);
		});
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

export function verifyMiddlewareScopes<
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

	return mapMaybePromise(authStore.getMaybeSync(params.ctx), (store) => {
		const scopes: (ScopeRules<Scopes, Grants> | undefined)[] = [];

		if (defaultScopes) {
			scopes.push(defaultScopes);
		}

		if (requiredScopes !== true) {
			scopes.push(requiredScopes);
		}

		return thenMaybePromise(
			() => verifyAndScopes(params, scopes, store),
			() => undefined,
			(err) => resolveError(err, errorResolver),
		);
	});
}

function saveResultGrants<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Source,
	Context,
	Args,
	Info,
>(
	params: ResolverParams<Source, Context, Args, Info>,
	result: Result,
	authStore: AuthStore<Scopes, unknown>,
	grants: GetGrant<Grants, Result, Source, Context, Args, Info> | undefined,
): Result | PromiseLike<Result> {
	if (!grants || result == null) {
		return result;
	}
	return mapMaybePromise(authStore.getMaybeSync(params.ctx), ({ grantCache }) =>
		mapMaybePromise(saveGrants(params, result, grants, grantCache), () => result),
	);
}
