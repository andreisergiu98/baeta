import type { MiddlewareParams } from '@baeta/core';
import type { GraphQLResolveInfo } from 'graphql';
import { createResolverPath } from '../utils/resolver.ts';
import { getAuthStore } from './store.ts';

export const grantRule = '$granted' as const;

export type GrantKey = typeof grantRule;

type GetGrantResult = AuthExtension.Grants | AuthExtension.Grants[];

type GetGrantFn<Result, Root, Context, Args> = (
	params: MiddlewareParams<Root, Context, Args>,
	result: Result,
) => GetGrantResult | PromiseLike<GetGrantResult>;

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
