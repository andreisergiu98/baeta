import type { MiddlewareParams } from '@baeta/core';
import type { NativeMiddleware } from '@baeta/core/sdk';
import { ForbiddenError } from '@baeta/errors';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath, isOperationType } from '../utils/resolver.ts';
import { defaultErrorResolver, resolveError, type ScopeErrorResolver } from './error.ts';
import { type GetGrant, saveGrants } from './grant.ts';
import { type DefaultScopes, selectDefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import { type ScopeRules, type ScopesShape, verifyScopes } from './scope-rules.ts';
import { loadAuthStore } from './store-loader.ts';

/**
 * Options for authorization middlewares
 */
export interface AuthMiddlewareOptions<Grants extends string, Result, Root, Context, Args> {
	/** Permissions to grant after successful authorization */
	grants?: GetGrant<Grants, Result, Root, Context, Args>;
	/** Whether to skip default scopes for this operation */
	skipDefaults?: boolean;
	/** Custom error handler for this operation */
	onError?: ScopeErrorResolver;
}

/**
 * Options for authorization middlewares
 */
export interface AuthMiddlewareSubscribeOptions<Root, Context, Args> {
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
	Root,
	Context,
	Args,
> = (
	params: MiddlewareParams<Root, Context, Args>,
) => boolean | ScopeRules<Scopes, Grants> | Promise<boolean | ScopeRules<Scopes, Grants>>;

/**
 * Function to get scope rules for post-resolution authorization
 */
export type GetPostScopeRules<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Root,
	Context,
	Args,
> = (
	params: MiddlewareParams<Root, Context, Args>,
	result: Result,
) => boolean | ScopeRules<Scopes, Grants> | Promise<boolean | ScopeRules<Scopes, Grants>>;

export function createMiddleware<
	Scopes extends ScopesShape,
	Grants extends string,
	Result,
	Root,
	Context,
	Args,
>(
	type: string,
	field: string,
	loadScopes: GetScopeLoader<Scopes, Context>,
	scopes: ScopeRules<Scopes, Grants> | GetScopeRules<Scopes, Grants, Root, Context, Args>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	options?: AuthMiddlewareOptions<Grants, Result, Root, Context, Args>,
	onError?: ScopeErrorResolver,
): NativeMiddleware<Result, Root, Context, Args> {
	const getScopes = typeof scopes === 'function' ? scopes : () => scopes;
	const isSubscribe = type === 'Subscription' && field.endsWith('.subscribe');
	const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, field, globalScopes);

	return (next) => async (root, args, ctx, info) => {
		loadAuthStore(ctx, loadScopes);

		const requiredScopes = await getScopes({ root, args, ctx, info });

		await verifyMiddlewareScopes(
			ctx,
			info,
			defaultScopes,
			requiredScopes,
			options?.onError ?? onError ?? defaultErrorResolver,
		);

		if (isSubscribe) {
			return next(root, args, ctx, info);
		}

		const result = await next(root, args, ctx, info);

		if (options?.grants) {
			await saveGrants(root, args, ctx, info, result, options.grants);
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
>(
	type: string,
	field: string,
	loadScopes: GetScopeLoader<Scopes, Context>,
	getScopes: GetPostScopeRules<Scopes, Grants, Result, Root, Context, Args>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	options?: AuthMiddlewareOptions<Grants, Result, Root, Context, Args>,
	onError?: ScopeErrorResolver,
): NativeMiddleware<Result, Root, Context, Args> {
	const defaultScopes = selectDefaultScopes(options?.skipDefaults, type, field, globalScopes);

	return (next) => async (root, args, ctx, info) => {
		loadAuthStore(ctx, loadScopes);

		const result = await next(root, args, ctx, info);
		const requiredScopes = await getScopes({ root, args, ctx, info }, result);

		await verifyMiddlewareScopes(
			ctx,
			info,
			defaultScopes,
			requiredScopes,
			options?.onError ?? onError ?? defaultErrorResolver,
		);

		if (options?.grants) {
			await saveGrants(root, args, ctx, info, result, options.grants);
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
	field: string,
	loadScopes: GetScopeLoader<Scopes, Context>,
	globalScopes?: DefaultScopes<Scopes, Grants>,
	onError?: ScopeErrorResolver,
) {
	if (!isOperationType(type)) {
		return;
	}

	const rules = selectDefaultScopes(false, type, field, globalScopes);

	if (rules == null) {
		return;
	}

	return createMiddleware(
		type,
		field,
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
