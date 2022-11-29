import { GraphQLFieldResolver } from 'graphql';
import { FilterFn, ResolverFn, withFilter } from 'graphql-subscriptions';
import {
  Subscribe,
  SubscribeFilter,
  SubscribeResolve,
  Subscription,
  SubscriptionResolver,
} from '../lib/subscription';
import { nameFunction } from '../utils/functions';
import { ModuleBuilder } from './module';

export type NativeSubscribe = {
  subscribe: GraphQLFieldResolver<{}, {}>;
  resolve?: GraphQLFieldResolver<{}, {}>;
};

export type SubscriptionOptions<Payload, Sub> = Sub extends SubscriptionResolver<
  infer Result,
  string,
  infer Root,
  infer Context,
  infer Args
>
  ? Subscription<Payload, Result, Root, Context, Args>
  : never;

export function createSubscriptionBuilder<Subscription>(module: ModuleBuilder, field: string) {
  const builder = <Payload>(subscription: SubscriptionOptions<Payload, Subscription>) => {
    registerSubscription(module, field, subscription);
  };
  return builder;
}

function registerSubscription<Payload, Subscription>(
  module: ModuleBuilder,
  field: string,
  subscription: SubscriptionOptions<Payload, Subscription>
) {
  nameFunction(subscription.subscribe, `${field}.subscribe`);
  nameFunction(subscription.resolve, `${field}.resolve`);
  nameFunction(subscription.filter, `${field}.filter`);

  const resolver: NativeSubscribe = {
    subscribe: createSubscribeAdapter(subscription.subscribe, subscription.filter),
  };

  if (subscription.resolve != null) {
    resolver.resolve = createResolverAdapter(subscription.resolve);
  }

  module.onSubscription(field, resolver);
}

function createSubscribeAdapter<Payload>(
  subscribe: Subscribe<Payload>,
  filter?: SubscribeFilter<Payload>
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

function createFilterAdapter<Payload>(filter: SubscribeFilter<Payload>): FilterFn {
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

function createResolverAdapter<Payload>(
  resolve: SubscribeResolve<unknown, Payload>
): GraphQLFieldResolver<unknown, {}> {
  return function adapter(payload, args, context, info) {
    const params = {
      args,
      info,
      ctx: context,
      payload: payload as Payload,
    };
    return resolve(params);
  };
}

export function aggregateSubscriptions<Resolvers, ResolversType>(
  module: ModuleBuilder,
  _type: ResolversType,
  resolvers: Resolvers
) {
  return resolvers;
}
