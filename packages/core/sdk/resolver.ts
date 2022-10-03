import { Resolver } from "../lib";
import { GM } from "../lib/graphql-modules";
import { nameFunction } from "../utils/functions";
import { ManagerOptions } from "./manager";
import {
  createMiddlewareBuilder,
  createObjectTypeMiddlewareBuilder,
  MiddlewareFromResolver,
} from "./middleware";

export type WithIndex<T> = T & Record<string, any>;
export type ResolversObject<T> = WithIndex<T>;

export type OnResolver = (
  type: string,
  field: string,
  resolver: Resolver<unknown>
) => void;

type ResolverRegisterer<T> = ((resolver: T) => void) & {
  $use: (middleware: MiddlewareFromResolver<T>) => void;
};

export function createResolverBuilder<T extends Resolver<any, any, any, any>>(
  type: string,
  field: string,
  options: ManagerOptions
): ResolverRegisterer<T> {
  const builder = (resolver: T) => {
    nameFunction(resolver, `${type}.${field}`);
    options.onResolver(type, field, resolver);
  };

  builder.$use = createMiddlewareBuilder(type, field, options);

  return builder;
}

export function createResolversBuilder<Resolvers, ResolversType>(
  name: string,
  options: ManagerOptions,
  {}: ResolversType,
  resolvers: Resolvers
) {
  return {
    ...resolvers,
    $use: createObjectTypeMiddlewareBuilder<ResolversType>(name, options),
  };
}

function normalizeResolver<T>(resolver: Resolver<T>) {
  const normalizedResolver: GM.Resolver<unknown> = (root, args, ctx, info) => {
    return resolver({ root, args, ctx, info });
  };
  return normalizedResolver;
}

export type ResolversMap = Record<string, Record<string, unknown>>;

export function addResolver(
  map: ResolversMap,
  type: string,
  field: string,
  resolver: Resolver<unknown>
) {
  if (map[type] == null) {
    map[type] = {};
  }
  map[type][field] = normalizeResolver(resolver);
}
