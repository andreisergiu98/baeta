import { GraphQLResolveInfo } from 'graphql';

export type Subscribe<Payload, Root = {}, Context = {}, Args = {}> = (
  params: SubscribeParams<Root, Context, Args>
) => AsyncIterator<Payload>;

export type SubscribeParams<Root, Context, Args> = {
  root: Root;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type SubscribeResolve<Result, Payload, Context = {}, Args = {}> = (
  params: SubscribeResolveParams<Payload, Context, Args>
) => Result | Promise<Result>;

export type SubscribeResolveParams<Payload, Context, Args> = {
  payload: Payload;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type SubscribeFilter<Payload, Context = {}, Args = {}> = (
  params: SubscribeFilterParams<Payload, Context, Args>
) => boolean | Promise<boolean>;

export type SubscribeFilterParams<Payload, Context, Args> = {
  payload: Payload;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type Subscription<Payload, Result, Root = {}, Context = {}, Args = {}> = {
  subscribe: Subscribe<Payload, Root, Context, Args>;
  filter?: SubscribeFilter<Payload, Context, Args>;
  resolve?: SubscribeResolve<Result, Payload, Context, Args>;
};

export type SubscriptionResolver<Result, Key extends string, Root = {}, Context = {}, Args = {}> = {
  subscribe: Subscribe<Result, Root, Context, Args>;
};
