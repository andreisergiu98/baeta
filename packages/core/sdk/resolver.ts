import { Resolver } from "../lib";
import { GM } from "../lib/graphql-modules";
import { nameFunction } from "../utils/functions";
import { ManagerOptions } from "./manager";
import {
  createMiddlewareRegisterer,
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

export function createResolverRegisterer<
  T extends Resolver<any, any, any, any>
>(type: string, field: string, options: ManagerOptions): ResolverRegisterer<T> {
  const handler = (resolver: T) => {
    nameFunction(resolver, `${type}.${field}`);
    options.onResolver(type, field, resolver);
  };

  handler.$use = createMiddlewareRegisterer(type, field, options);

  return handler;
}

export type ResolversMap = Record<string, Record<string, unknown>>;

export function registerResolver(
  map: ResolversMap,
  type: string,
  field: string,
  resolver: Resolver<unknown>
) {
  const normalizedResolver: GM.Resolver<unknown> = (root, args, ctx, info) => {
    return resolver({ root, args, ctx, info });
  };

  if (map[type] == null) {
    map[type] = {};
  }

  map[type][field] = normalizedResolver;
}
