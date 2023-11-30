import { createObjectLens } from '../utils/object';
import { MiddlewareMap, ResolversMap, SubscriptionsResolvers } from './resolver-mapper';

export function composeResolvers(resolvers: ResolversMap, middlewareMap: MiddlewareMap = {}) {
  const composed = copyResolvers(resolvers);

  for (const key in middlewareMap) {
    const fns = middlewareMap[key];
    const path = key.split('.');
    const lens = createObjectLens(composed, path);

    const originalResolver = lens.get();

    if (!originalResolver) {
      continue;
    }

    const createResolver = chainResolvers([...fns, () => originalResolver]);
    lens.set(createResolver());
  }

  return composed;
}

export function copySubscriptionResolvers(map: ResolversMap) {
  if (map.Subscription == null) {
    return;
  }

  const subscription = map.Subscription;
  const copy = {} as NonNullable<SubscriptionsResolvers['Subscription']>;

  for (const key in subscription) {
    const resolvers = subscription[key];

    if (resolvers) {
      copy[key] = { ...resolvers };
    }
  }

  return copy;
}

export function copyResolvers<T extends ResolversMap>(resolvers: T): T {
  const copy = {} as T;

  for (const key in resolvers) {
    if (key === 'Subscription') {
      copy.Subscription = copySubscriptionResolvers(resolvers);
      continue;
    }

    if (resolvers[key]) {
      copy[key] = { ...resolvers[key] };
    }
  }

  return copy;
}

export function chainResolvers(funcs: Function[]) {
  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => {
    return (...args: unknown[]) => a(b(...args));
  });
}
