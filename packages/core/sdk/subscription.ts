import { FilterFn, ResolverFn, withFilter } from 'graphql-subscriptions';
import { GM } from '../lib/graphql-modules';
import {
  SubscriptionFilterFn,
  SubscriptionObjectWithoutPayload,
  SubscriptionObjectWithPayload,
  SubscriptionResolveFn,
  SubscriptionResolver,
  SubscriptionSubscribeFn,
} from '../lib/subscription';
import { nameFunction } from '../utils/functions';
import { ManagerOptions } from './manager';
import { ResolversMap } from './resolver';

export type SubscriptionOptions<Payload, Sub> = Sub extends SubscriptionResolver<
  infer Result,
  infer Key,
  infer Root,
  infer Context,
  infer Args
>
  ? Payload extends Result
    ? SubscriptionObjectWithoutPayload<Result, Root, Context, Args>
    : SubscriptionObjectWithPayload<Result, Payload, Root, Context, Args>
  : never;

function normalizeSubscribe<Payload>(
  subscribe: SubscriptionSubscribeFn<Payload>,
  filter?: SubscriptionFilterFn<Payload>
) {
  const normalizedSubscribe: ResolverFn = (root, args, context, info) => {
    return subscribe({
      root,
      args,
      ctx: context,
      info,
    });
  };

  const normalizedFilter = normalizeFilter(filter);

  if (normalizedFilter == null) {
    return normalizedSubscribe;
  }

  return withFilter(normalizedSubscribe, normalizedFilter);
}

function normalizeFilter<Payload>(filter?: SubscriptionFilterFn<Payload>) {
  if (filter == null) {
    return;
  }

  const normalizedFilter: FilterFn = (payload, args, context, info) => {
    return filter({
      payload,
      args,
      info,
      ctx: context,
    });
  };

  return normalizedFilter;
}

function normalizeResolver<Payload>(resolve?: SubscriptionResolveFn<unknown, Payload>) {
  if (resolve == null) {
    return;
  }

  const normalizedResolver: GM.Resolver<unknown, Payload> = (
    payload: Payload,
    args,
    context,
    info
  ) => {
    return resolve({
      payload,
      args,
      info,
      ctx: context,
    });
  };

  return normalizedResolver;
}

export type OnSubscription = (
  field: string,
  options: SubscriptionObjectWithoutPayload<unknown>
) => void;

export function createSubscriptionBuilder<Subscription>(
  field: string,
  options: ManagerOptions
) {
  const builder = <Payload>(subscription: SubscriptionOptions<Payload, Subscription>) => {
    nameFunction(subscription.subscribe, `${field}.subscribe`);
    nameFunction(subscription.resolve, `${field}.resolve`);
    nameFunction(subscription.filter, `${field}.filter`);
    options.onSubscription(
      field,
      subscription as SubscriptionObjectWithoutPayload<unknown>
    );
  };

  return builder;
}

export function createSubscriptionsBuilder<Resolvers, ResolversType>(
  options: ManagerOptions,
  {}: ResolversType,
  resolvers: Resolvers
) {
  return resolvers;
}

export function addSubscription(
  map: ResolversMap,
  field: string,
  subscription: SubscriptionObjectWithoutPayload<unknown>
) {
  const subscribe = normalizeSubscribe(subscription.subscribe, subscription.filter);
  const resolve = normalizeResolver(subscription.resolve);

  if (map.Subscription == null) {
    map.Subscription = {};
  }

  map.Subscription[field] = { subscribe, resolve };
}
