import { GraphQLResolveInfo } from 'graphql';

export type SubscriptionSubscribeParams<Root, Context, Args> = {
  root: Root;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type SubscriptionSubscribeFn<Payload, Root = {}, Context = {}, Args = {}> = (
  params: SubscriptionSubscribeParams<Root, Context, Args>
) => AsyncIterator<Payload>;

export type SubscriptionResolveParams<Payload, Context, Args> = {
  payload: Payload;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type SubscriptionResolveFn<Result, Payload, Context = {}, Args = {}> = (
  params: SubscriptionResolveParams<Payload, Context, Args>
) => Result | Promise<Result>;

export type SubscriptionFilterParams<Payload, Context, Args> = {
  payload: Payload;
  args: Args;
  ctx: Context;
  info: GraphQLResolveInfo;
};

export type SubscriptionFilterFn<Payload, Context = {}, Args = {}> = (
  params: SubscriptionFilterParams<Payload, Context, Args>
) => boolean | Promise<boolean>;

export type SubscriptionObjectWithoutPayload<
  Result,
  Root = {},
  Context = {},
  Args = {}
> = {
  subscribe: SubscriptionSubscribeFn<Result, Root, Context, Args>;
  resolve?: SubscriptionResolveFn<Result, Result, Context, Args>;
  filter?: SubscriptionFilterFn<Result, Context, Args>;
};

export type SubscriptionObjectWithPayload<
  Result,
  Payload,
  Root = {},
  Context = {},
  Args = {}
> = {
  subscribe: SubscriptionSubscribeFn<Payload, Root, Context, Args>;
  resolve: <A extends Result>(
    params: SubscriptionResolveParams<A & Result, Context, Args>
  ) => A | Promise<A>;
  filter?: <A extends Result>(
    params: SubscriptionFilterParams<A & Result, Context, Args>
  ) => boolean | Promise<boolean>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type SubscriptionResolver<Result, Key extends string, Root, Context, Args> = {
  subscribe: SubscriptionSubscribeFn<Result, Root, Context, Args>;
};
