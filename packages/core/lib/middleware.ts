import { GraphQLResolveInfo } from 'graphql';

export type Middleware<Result, Root, Context, Args> = (
  params: MiddlewareParams<Root, Context, Args>,
  next: MiddlewareNext<Result>,
) => Promise<Result>;

export type MiddlewareParams<Root, Context, Args> = {
  root: Root;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type MiddlewareNext<T> = () => Promise<T>;
