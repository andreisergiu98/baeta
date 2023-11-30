import { MiddlewareParams } from '@baeta/core';
import { GraphQLResolveInfo } from 'graphql';
import { createResolverPath } from '../utils/resolver';
import { getAuthStore } from './store';

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

export async function saveGrants(
  root: unknown,
  args: unknown,
  ctx: unknown,
  info: GraphQLResolveInfo,
  result: unknown,
  grants: GetGrant<unknown, unknown, unknown, unknown>,
) {
  const [store, resolvedGrants] = await Promise.all([
    getAuthStore(ctx),
    resolveGrants(root, args, ctx, info, result, grants),
  ]);

  store.grantCache.setGrants(createResolverPath(info.path), resolvedGrants);
}

async function resolveGrants(
  root: unknown,
  args: unknown,
  ctx: unknown,
  info: GraphQLResolveInfo,
  result: unknown,
  grants: GetGrant<unknown, unknown, unknown, unknown>,
) {
  if (typeof grants !== 'function') {
    return grants;
  }
  return grants({ root, args, ctx, info }, result);
}
