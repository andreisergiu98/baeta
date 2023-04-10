import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';
import { Subscribe, SubscribeResolve, Subscription } from '../lib/subscription';

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
    subscribe: createSubscribeAdapter(subscription.subscribe),
  };

  if (subscription.resolve != null) {
    resolver.resolve = createResolverAdapter(subscription.resolve);
  }

  return resolver;
}

function createSubscribeAdapter<Payload, Root, Context, Args>(
  subscribe: Subscribe<Payload, Root, Context, Args>
) {
  const adapter: NativeSubscribe['subscribe'] = (root, args, context, info) => {
    const params = {
      root,
      args,
      ctx: context,
      info,
    };
    return subscribe(params);
  };

  return adapter;
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
