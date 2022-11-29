import { GraphQLFieldResolver } from 'graphql';
import { Middleware, Resolver } from '../lib';
import { ModuleBuilder } from '../sdk';
import { nameFunction } from '../utils/functions';
import { ResolversObject } from './resolver';

export type NativeMiddleware = (
  next: GraphQLFieldResolver<{}, {}, {}, Promise<{}>>
) => GraphQLFieldResolver<{}, {}>;

type GenericMiddleware = Middleware<unknown>;

export function createMiddlewareBuilder<T extends GenericMiddleware>(
  module: ModuleBuilder,
  type: string,
  field: string
) {
  const builder = (middleware: T) => {
    registerMiddleware(module, type, field, middleware);
  };
  return builder;
}

function registerMiddleware(
  module: ModuleBuilder,
  type: string,
  field: string,
  resolver: GenericMiddleware
) {
  nameFunction(resolver, `${type}.${field}.$use`);
  module.onMiddleware(type, field, createAdapter(resolver));
}

function createAdapter(middleware: Middleware<unknown>): NativeMiddleware {
  return (nextResolver) => {
    return function adapter(root, args, ctx, info) {
      const next = () => nextResolver(root, args, ctx, info);
      return middleware({ root, args, info, ctx }, next);
    };
  };
}

export type MiddlewareFromResolver<R> = R extends Resolver<
  infer Result,
  infer Parent,
  infer Context,
  infer Args
>
  ? Middleware<Result, Parent, Context, Args>
  : never;

export type MiddlewareFromResolvers<R> = R extends {
  [K in keyof R]: infer Inner;
}
  ? Inner extends Resolver<unknown, infer Parent, infer Context, unknown>
    ? Middleware<unknown, Parent, Context, {}>
    : never
  : never;

export type MiddlewareFromResolverObject<R extends ResolversObject<{}>> = R extends ResolversObject<
  infer Context
>
  ? Middleware<unknown, {}, Context, {}>
  : never;
