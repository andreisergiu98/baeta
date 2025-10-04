import type { Middleware, ResolverParams } from '@baeta/core';
import { ForbiddenError } from '@baeta/errors';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath } from '../utils/resolver.ts';
import { defaultErrorResolver, resolveError, type ScopeErrorResolver } from './error.ts';
import { type GetGrant, saveGrants } from './grant.ts';
import { type DefaultScopes, selectDefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import { type ScopeRules, type ScopesShape, verifyScopes } from './scope-rules.ts';
import { loadAuthStore } from './store-loader.ts';

/**
 * Options for authorization middlewares
 */
export interface AuthMiddlewareOptions<Grants extends string, Result, Root, Context, Args, Info> {
	/** Permissions to grant after successful authorization */
	grants?: GetGrant<Grants, Result, Root, Context, Args, Info>;
	/** Whether to skip default scopes for this operation */
	skipDefaults?: boolean;
	/** Custom error handler for this operation */
	onError?: ScopeErrorResolver;
}

/**
 * Options for authorization middlewares
 */
export interface AuthMiddlewareSubscribeOptions {
	/** Whether to skip default scopes for this operation */
	skipDefaults?: boolean;
	/** Custom error handler for this operation */
	onError?: ScopeErrorResolver;
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
) => boolean | ScopeRules<Scopes, Grants> | Promise<boolean | ScopeRules<Scopes, Grants>>;

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
) => boolean | ScopeRules<Scopes, Grants> | Promise<boolean | ScopeRules<Scopes, Grants>>;

export function createMiddleware<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Root,
	Context,
	Args,
	Info,
>(
	type: string,
	loadScopes: GetScopeLoader<Scopes, Context>,
	scopes: ScopeRules<Scopes, Grants> | GetScopeRules<Scopes, Grants, Root, Context, Args, Info>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	options?: AuthMiddlewareOptions<Grants, Result, Root, Context, Args, Info>,
	onError?: ScopeErrorResolver,
): Middleware<Result, Root, Context, Args, Info> {
	const getScopes = typeof scopes === 'function' ? scopes : () => scopes;
	const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, globalScopes);

	return async (next, params) => {
		loadAuthStore(params.ctx, loadScopes);

		const requiredScopes = await getScopes(params);

		await verifyMiddlewareScopes(
			params.ctx,
			params.info as GraphQLResolveInfo,
			defaultScopes,
			requiredScopes,
			options?.onError ?? onError ?? defaultErrorResolver,
		);

		const result = await next();

		if (options?.grants) {
			await saveGrants(params, result, options.grants);
		}

		return result;
	};
}

export function createPostMiddleware<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Root,
	Context,
	Args,
	Info,
>(
	type: string,
	loadScopes: GetScopeLoader<Scopes, Context>,
	getScopes: GetPostScopeRules<Scopes, Grants, Result, Root, Context, Args, Info>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	options?: AuthMiddlewareOptions<Grants, Result, Root, Context, Args, Info>,
	onError?: ScopeErrorResolver,
): Middleware<Result, Root, Context, Args, Info> {
	const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, globalScopes);

	return async (next, params) => {
		loadAuthStore(params.ctx, loadScopes);

		const result = await next();
		const requiredScopes = await getScopes(params, result);

		await verifyMiddlewareScopes(
			params.ctx,
			params.info as GraphQLResolveInfo,
			defaultScopes,
			requiredScopes,
			options?.onError ?? onError ?? defaultErrorResolver,
		);

		if (options?.grants) {
			await saveGrants(params, result, options.grants);
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
	loadScopes: GetScopeLoader<Scopes, Context>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	onError?: ScopeErrorResolver,
) {
	const rules = selectDefaultScopes(false, type, globalScopes);

	if (rules == null) {
		return;
	}

	return createMiddleware<Scopes, Grants, unknown, unknown, Context, unknown, unknown>(
		type,
		loadScopes,
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
	Context,
>(
	ctx: Context,
	info: GraphQLResolveInfo,
	defaultScopes: ScopeRules<Scopes, Grants> | undefined,
	requiredScopes: ScopeRules<Scopes, Grants> | boolean | undefined,
	errorResolver: ScopeErrorResolver,
) {
	if (requiredScopes === false) {
		throw new ForbiddenError();
	}

	const promises: Promise<unknown>[] = [];
	const fullPath = createResolverPath(info.path);
	const parentPath = createResolverPath(info.path.prev);

	if (defaultScopes) {
		promises.push(verifyScopes(ctx, defaultScopes, '$and', parentPath));
	}

	if (requiredScopes !== true) {
		promises.push(verifyScopes(ctx, requiredScopes, '$and', parentPath));
	}

	if (promises.length === 0) {
		return;
	}

	return Promise.all(promises).catch((err) => resolveError(err, errorResolver, fullPath));
}
