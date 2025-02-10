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
export type GetGrantResult<Grants extends string> = Grants | Grants[];

/**
 * Function that determines grants based on resolver parameters and result.
 * Used for dynamic permission granting based on resolved data.
 */
export type GetGrantFn<Grants extends string, Result, Root, Context, Args> = (
	params: MiddlewareParams<Root, Context, Args>,
	result: Result,
) => GetGrantResult<Grants> | PromiseLike<GetGrantResult<Grants>>;

/**
 * Union type for grant specifications.
 * Can be either a static grant result or a function that determines grants dynamically.
 */
export type GetGrant<Grants extends string, Result, Root, Context, Args> =
	| GetGrantFn<Grants, Result, Root, Context, Args>
	| GetGrantResult<Grants>;

export function isGrantedKey(rule: string): rule is GrantKey {
	return rule === grantRule;
}

export async function saveGrants<Grants extends string, Result, Root, Context, Args>(
	root: Root,
	args: Args,
	ctx: Context,
	info: GraphQLResolveInfo,
	result: Result,
	grants: GetGrant<Grants, Result, Root, Context, Args>,
) {
	const [store, resolvedGrants] = await Promise.all([
		getAuthStore(ctx),
		resolveGrants(root, args, ctx, info, result, grants),
	]);
	store.grantCache.setGrants(createResolverPath(info.path), resolvedGrants);
}

async function resolveGrants<Grants extends string, Result, Root, Context, Args>(
	root: Root,
	args: Args,
	ctx: Context,
	info: GraphQLResolveInfo,
	result: Result,
	grants: GetGrant<Grants, Result, Root, Context, Args>,
) {
	if (typeof grants !== 'function') {
		return grants;
	}
	return grants({ root, args, ctx, info }, result);
}
