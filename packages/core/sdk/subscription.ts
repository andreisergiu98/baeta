import { withFilter, ResolverFn, FilterFn } from "graphql-subscriptions";
import { nameFunction } from "../utils/functions";
import { GM } from "../lib/graphql-modules";
import { ManagerOptions } from "./manager";
import { ResolversMap } from "./resolver";
import {
  SubscriptionFilterFn,
  SubscriptionObjectWithoutPayload,
  SubscriptionObjectWithPayload,
  SubscriptionResolveFn,
  SubscriptionSubscribeFn,
  SubscriptionResolver,
} from "../lib/subscription";

export type SubscriptionOptions<Payload, Sub> =
  Sub extends SubscriptionResolver<
    infer Result,
    infer Key,
    infer Root,
    infer Context,
    infer Args
  >
    ? Payload extends Result
      ? SubscriptionObjectWithoutPayload<Result, Root, Context, Args>
      : SubscriptionObjectWithPayload<
          Result,
          Payload,
          Root,
          Context,
          Args
        >
    : never;

function normalizeSubscribe<Payload>(
  subscribe: SubscriptionSubscribeFn<Payload>,
  filter?: SubscriptionFilterFn<Payload>
) {
  const handler: ResolverFn = (root, args, context, info) => {
    return subscribe({
      root,
      args,
      ctx: context,
      info,
    });
  };

  const normalizedFilter = normalizeFilter(filter);

  if (normalizedFilter == null) {
    return handler;
  }

  return withFilter(handler, normalizedFilter);
}

function normalizeFilter<Payload>(filter?: SubscriptionFilterFn<Payload>) {
  if (filter == null) {
    return;
  }

  const handler: FilterFn = (payload, args, context, info) => {
    return filter({
      payload,
      args,
      info,
      ctx: context,
    });
  };

  return handler;
}

function normalizeResolve<Payload>(
  resolve?: SubscriptionResolveFn<unknown, Payload>
) {
  if (resolve == null) {
    return;
  }

  const handler: GM.Resolver<unknown, Payload> = (
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

  return handler;
}

export type OnSubscription = (
  field: string,
  options: SubscriptionObjectWithoutPayload<unknown>
) => void;

export function createSubscriptionRegisterer<Subscription>(
  field: string,
  options: ManagerOptions
) {
  const handler = <Payload>(
    subscription: SubscriptionOptions<Payload, Subscription>
  ) => {
    nameFunction(subscription.subscribe, `${field}.subscribe`);
    nameFunction(subscription.resolve, `${field}.resolve`);
    nameFunction(subscription.filter, `${field}.filter`);
    options.onSubscription(
      field,
      subscription as SubscriptionObjectWithoutPayload<unknown>
    );
  };

  return handler;
}

export function registerSubscription(
  map: ResolversMap,
  field: string,
  subscription: SubscriptionObjectWithoutPayload<unknown>
) {
  const subscribe = normalizeSubscribe(
    subscription.subscribe,
    subscription.filter
  );
  const resolve = normalizeResolve(subscription.resolve);

  if (map.Subscription == null) {
    map.Subscription = {};
  }

  map.Subscription[field] = { subscribe, resolve };
}
