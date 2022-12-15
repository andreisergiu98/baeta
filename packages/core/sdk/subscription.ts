import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { FilterFn, ResolverFn, withFilter } from 'graphql-subscriptions';
import { Subscribe, SubscribeFilter, SubscribeResolve, Subscription } from '../lib/subscription';

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export type NativeSubscribe<Payload = any, Result = any, Root = any, Context = any, Args = any> = {
  subscribe: (
    source: Root,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ) => AsyncIterator<Payload>;
  resolve?: GraphQLFieldResolver<Payload, Context, Args, Result>;
};

export function createSubscriptionAdapter<Payload, Result, Root, Context, Args>(
  subscription: Subscription<Payload, Result, Root, Context, Args>
) {
  const resolver: NativeSubscribe = {
    subscribe: createSubscribeAdapter(subscription.subscribe, subscription.filter),
  };

  if (subscription.resolve != null) {
    resolver.resolve = createResolverAdapter(subscription.resolve);
  }

  return resolver;
}

function createSubscribeAdapter<Payload, Root, Context, Args>(
  subscribe: Subscribe<Payload, Root, Context, Args>,
  filter?: SubscribeFilter<Payload, Context, Args>
) {
  const adapter: ResolverFn = (root, args, context, info) => {
    const params = {
      root,
      args,
      ctx: context,
      info,
    };
    return subscribe(params);
  };

  if (filter == null) {
    return adapter;
  }

  return withFilter(adapter, createFilterAdapter(filter));
}

function createFilterAdapter<Payload, Context, Args>(
  filter: SubscribeFilter<Payload, Context, Args>
): FilterFn {
  return function adapter(payload, args, context, info) {
    const params = {
      payload,
      args,
      info,
      ctx: context,
    };
    return filter(params);
  };
}

function createResolverAdapter<Payload, Result, Context, Args>(
  resolve: SubscribeResolve<Result, Payload, Context, Args>
): GraphQLFieldResolver<Payload, Context, Args, Result> {
  return function adapter(payload, args, context, info) {
    const params = {
      args,
      info,
      ctx: context,
      payload: payload,
    };
    return resolve(params) as Result;
  };
}
