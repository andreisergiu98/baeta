import type { MiddlewareParams } from '@baeta/core';
import type { NativeMiddleware } from '@baeta/core/sdk';
import { ForbiddenError } from '@baeta/errors';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath, isOperationType } from '../utils/resolver.ts';
import { type ScopeErrorResolver, defaultErrorResolver, resolveError } from './error.ts';
import { type GetGrant, saveGrants } from './grant.ts';
import { type DefaultScopes, selectDefaultScopes } from './scope-defaults.ts';
import type { GetScopeLoader } from './scope-resolver.ts';
import { type ScopeRules, verifyScopes } from './scope-rules.ts';
import { loadAuthStore } from './store-loader.ts';

/**
 * Options for authorization middlewares
 */
export interface AuthMiddlewareOptions<Result, Root, Context, Args> {
	/** Permissions to grant after successful authorization */
	grants?: GetGrant<Result, Root, Context, Args>;
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
export type GetScopeRules<Root, Context, Args> = (
	params: MiddlewareParams<Root, Context, Args>,
) => boolean | ScopeRules | Promise<boolean | ScopeRules>;

/**
 * Function to get scope rules for post-resolution authorization
 */
export type GetPostScopeRules<Result, Root, Context, Args> = (
	params: MiddlewareParams<Root, Context, Args>,
	result: Result,
) => boolean | ScopeRules | Promise<boolean | ScopeRules>;

export function createMiddleware<Result, Root, Context, Args>(
	type: string,
	field: string,
	loadScopes: GetScopeLoader<Context>,
	scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
	globalScopes?: DefaultScopes,
	options?: AuthMiddlewareOptions<Result, Root, Context, Args>,
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

export function createPostMiddleware<Result, Root, Context, Args>(
	type: string,
	field: string,
	loadScopes: GetScopeLoader<Context>,
	getScopes: GetPostScopeRules<Result, Root, Context, Args>,
	globalScopes?: DefaultScopes,
	options?: AuthMiddlewareOptions<Result, Root, Context, Args>,
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

export function createFallbackMiddleware<Context>(
	type: string,
	field: string,
	loadScopes: GetScopeLoader<Context>,
	globalScopes?: DefaultScopes,
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

export async function verifyMiddlewareScopes<Context>(
	ctx: Context,
	info: GraphQLResolveInfo,
	defaultScopes: ScopeRules | undefined,
	requiredScopes: ScopeRules | boolean | undefined,
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
