import type { ResolverParams } from '@baeta/core';
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
export type GetGrantFn<Grants extends string, Result, Source, Context, Args, Info> = (
	params: ResolverParams<Source, Context, Args, Info>,
	result: Result,
) => GetGrantResult<Grants> | PromiseLike<GetGrantResult<Grants>>;

/**
 * Union type for grant specifications.
 * Can be either a static grant result or a function that determines grants dynamically.
 */
export type GetGrant<Grants extends string, Result, Source, Context, Args, Info> =
	| GetGrantFn<Grants, Result, Source, Context, Args, Info>
	| GetGrantResult<Grants>;

export function isGrantedKey(rule: string): rule is GrantKey {
	return rule === grantRule;
}

export async function saveGrants<Grants extends string, Result, Root, Context, Args, Info>(
	params: ResolverParams<Root, Context, Args, Info>,
	result: Result,
	grants: GetGrant<Grants, Result, Root, Context, Args, Info>,
) {
	const [store, resolvedGrants] = await Promise.all([
		getAuthStore(params.ctx),
		resolveGrants(params, result, grants),
	]);
	store.grantCache.setGrants(
		createResolverPath((params.info as GraphQLResolveInfo).path),
		resolvedGrants,
	);
}

async function resolveGrants<Grants extends string, Result, Source, Context, Args, Info>(
	params: ResolverParams<Source, Context, Args, Info>,
	result: Result,
	grants: GetGrant<Grants, Result, Source, Context, Args, Info>,
) {
	if (typeof grants !== 'function') {
		return grants;
	}
	return grants(params, result);
}
