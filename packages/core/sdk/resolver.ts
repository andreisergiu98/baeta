import type { GraphQLFieldResolver } from 'graphql';
import type { Resolver } from '../lib/resolver.ts';

export type NativeResolver<
	Result = unknown,
	Root = unknown,
	Context = unknown,
	Args = unknown,
> = GraphQLFieldResolver<Root, Context, Args, Result>;

export function createResolverAdapter<Result, Root, Context, Args>(
	resolver: Resolver<Result, Root, Context, Args>,
): NativeResolver<Result | PromiseLike<Result>, Root, Context, Args> {
	return function adapter(root, args, ctx, info) {
		return resolver({ root, args, ctx, info });
	};
}
