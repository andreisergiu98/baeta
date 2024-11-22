import type { GraphQLFieldResolver } from 'graphql';
import type { Middleware } from '../lib/middleware.ts';

export type NativeMiddleware<
	Result = unknown,
	Root = unknown,
	Context = unknown,
	Args = unknown,
> = (
	next: GraphQLFieldResolver<Root, Context, Args, Result | PromiseLike<Result>>,
) => GraphQLFieldResolver<Root, Context, Args, Result | PromiseLike<Result>>;

export function createMiddlewareAdapter<Result, Root, Context, Args>(
	middleware: Middleware<Result, Root, Context, Args>,
): NativeMiddleware<Result, Root, Context, Args> {
	return (nextResolver) => {
		return function adapter(root, args, ctx, info) {
			const next = () => nextResolver(root, args, ctx, info) as Promise<Result>;
			return middleware({ root, args, info, ctx }, next);
		};
	};
}
