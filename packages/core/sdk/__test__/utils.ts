import { GraphQLResolveInfo, GraphQLScalarType } from 'graphql';
import { Middleware, Resolver } from '../../lib';
import { NativeMiddleware } from '../middleware';
import { NativeResolver } from '../resolver';
import { FieldResolvers, ResolversMap } from '../resolver-mapper';
import { NativeSubscribe } from '../subscription';

export function forgeResolverArgs(root = {}, args = {}, ctx = {}, info = {} as GraphQLResolveInfo) {
  return {
    native: [root, args, ctx, info] as const,
    params: { root, args, ctx, info },
  };
}

export function forgeResolver<T>(value: T): Resolver<T, unknown, unknown, unknown> {
  return () => value;
}

export function forgeNativeResolver<T>(value: T): NativeResolver {
  return () => value;
}

export function forgeMiddleware(): Middleware<unknown, unknown, unknown, unknown> {
  return (params, next) => next();
}

export function forgeNativeMiddleware(): NativeMiddleware {
  return (next: NativeResolver) => {
    return next;
  };
}

export async function executeNativeMiddleware<T>(value: T, middleware: NativeMiddleware) {
  const resolver = forgeNativeResolver(value);
  const resolverArgs = forgeResolverArgs();

  const resolve = middleware(resolver);

  return resolve(...resolverArgs.native) as Promise<T>;
}

export function getResolverFromMap(map: ResolversMap, type: string, field: string): NativeResolver {
  const resolver = (map[type] as FieldResolvers)[field];

  if (resolver == null) {
    throw new Error('Resolver not found');
  }

  return resolver;
}

export function getSubscriptionFromMap(map: ResolversMap, field: string): NativeSubscribe {
  const subscription = map.Subscription?.[field];

  if (subscription == null) {
    throw new Error('Subscription not found');
  }

  return subscription;
}

export const mockedScalar = new GraphQLScalarType({
  name: 'MockedScalar',
  description: '',
  serialize() {
    throw Error('Not implemented');
  },
  parseValue() {
    throw Error('Not implemented');
  },
  parseLiteral() {
    throw Error('Not implemented');
  },
});
