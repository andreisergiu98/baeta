import type { MiddlewareParams } from '@baeta/core';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath } from '../utils/resolver.ts';
import { getAuthStore } from './store.ts';

export const grantRule = '$granted' as const;

export type GrantKey = typeof grantRule;

/**
 * Represents the result of a grant operation.
 * Can be either a single grant or an array of grants defined in AuthExtension.GrantsMap.
 */
export type GetGrantResult = AuthExtension.Grants | AuthExtension.Grants[];

/**
 * Function that determines grants based on resolver parameters and result.
 * Used for dynamic permission granting based on resolved data.
 */
export type GetGrantFn<Result, Root, Context, Args> = (
	params: MiddlewareParams<Root, Context, Args>,
	result: Result,
) => GetGrantResult | PromiseLike<GetGrantResult>;

/**
 * Union type for grant specifications.
 * Can be either a static grant result or a function that determines grants dynamically.
 */
export type GetGrant<Result, Root, Context, Args> =
	| GetGrantFn<Result, Root, Context, Args>
	| GetGrantResult;

export function isGrantedKey(rule: string): rule is GrantKey {
	return rule === grantRule;
}

export async function saveGrants<Result, Root, Context, Args>(
	root: Root,
	args: Args,
	ctx: Context,
	info: GraphQLResolveInfo,
	result: Result,
	grants: GetGrant<Result, Root, Context, Args>,
) {
	const [store, resolvedGrants] = await Promise.all([
		getAuthStore(ctx),
		resolveGrants(root, args, ctx, info, result, grants),
	]);

	store.grantCache.setGrants(createResolverPath(info.path), resolvedGrants);
}

async function resolveGrants<Result, Root, Context, Args>(
	root: Root,
	args: Args,
	ctx: Context,
	info: GraphQLResolveInfo,
	result: Result,
	grants: GetGrant<Result, Root, Context, Args>,
) {
	if (typeof grants !== 'function') {
		return grants;
	}
	return grants({ root, args, ctx, info }, result);
}
