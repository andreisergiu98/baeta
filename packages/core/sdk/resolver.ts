import { GraphQLFieldResolver } from 'graphql';
import { Resolver } from '../lib';
import { nameFunction } from '../utils/functions';
import {
  createMiddlewareBuilder,
  MiddlewareFromResolver,
  MiddlewareFromResolvers,
} from './middleware';
import { ModuleBuilder } from './module';

export type WithIndex<T> = T & Record<string, unknown>;
export type ResolversObject<T> = WithIndex<T>;
export type NativeResolver = GraphQLFieldResolver<unknown, unknown>;

// rome-ignore lint(nursery/noExplicitAny): TODO
type GenericResolver = Resolver<any, any, any, any>;

export function createResolverBuilder<T extends GenericResolver>(
  module: ModuleBuilder,
  type: string,
  field: string
) {
  const builder = (resolver: T) => {
    registerResolver(module, type, field, resolver);
  };

  builder.$use = createMiddlewareBuilder<MiddlewareFromResolver<T>>(module, type, field);
  builder.$scopes = {} as any;
  builder.$defineScope = (a: any, b: any) => {};
  builder.$defaultScope = (a: any, b: any) => {};
  return builder;
}

function registerResolver(
  module: ModuleBuilder,
  type: string,
  field: string,
  resolver: GenericResolver
) {
  nameFunction(resolver, `${type}.${field}`);
  module.onResolver(type, field, createAdapter(resolver));
}

function createAdapter(resolver: GenericResolver): NativeResolver {
  return function adapter(root, args, ctx, info) {
    return resolver({ root, args, ctx, info });
  };
}

export function aggregateResolvers<Resolvers, ResolversType>(
  module: ModuleBuilder,
  type: string,
  _type: ResolversType,
  resolvers: Resolvers
) {
  return {
    ...resolvers,
    $use: createMiddlewareBuilder<MiddlewareFromResolvers<Resolvers>>(module, type, '*'),
    $scopes: {} as any,
    $defineScope: (a: any, b: any) => {},
    $defaultScope: (a: any, b: any) => {},
  };
}
