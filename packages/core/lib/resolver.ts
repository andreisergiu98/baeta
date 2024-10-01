import { GraphQLResolveInfo } from 'graphql';

export type Resolver<Result, Root, Context, Args> = (
	params: ResolverParams<Root, Context, Args>,
) => Result | Promise<Result>;

export type ResolverParams<Root, Context, Args> = {
	root: Root;
	args: Args;
	ctx: Context;
	info: GraphQLResolveInfo;
};
