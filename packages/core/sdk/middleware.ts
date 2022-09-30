import { Middleware, Resolver } from "../lib";
import { GM } from "../lib/graphql-modules";
import { ResolversObject } from "./resolver";
import { ManagerOptions } from "../sdk";
import { nameFunction } from "../utils/functions";

export type OnMiddleware = (
  type: string,
  field: string,
  middleware: Middleware<unknown>
) => void;

export type MiddlewareFromResolver<R> = R extends Resolver<
  infer Result,
  infer Parent,
  infer Context,
  infer Args
>
  ? Middleware<Result, Parent, Context, Args>
  : never;

type MiddlewareFromResolvers<R> = R extends {
  [K in keyof R]: infer Inner;
}
  ? Inner extends Resolver<
      infer Result,
      infer Parent,
      infer Context,
      infer Args
    >
    ? Middleware<unknown, Parent, Context, {}>
    : never
  : never;

type MiddlewareFromResolverObject<R extends ResolversObject<{}>> =
  R extends ResolversObject<infer Context>
    ? Middleware<unknown, {}, Context, {}>
    : never;

export function createMiddlewareBuilder<T extends Middleware<unknown>>(
  type: string,
  field: string,
  options: ManagerOptions
) {
  const builder = (middleware: T) => {
    nameFunction(middleware, `${type}.${field}.$use`);
    options.onMiddleware(type, field, middleware);
  };
  return builder;
}

export function createObjectTypeMiddlewareBuilder<Resolvers>(
  object: string,
  options: ManagerOptions
) {
  return createMiddlewareBuilder<MiddlewareFromResolvers<Resolvers>>(
    object,
    "*",
    options
  );
}

export function createModuleMiddlewareBuilder<
  Resolvers extends ResolversObject<{}>
>(options: ManagerOptions) {
  return createMiddlewareBuilder<MiddlewareFromResolverObject<Resolvers>>(
    "*",
    "*",
    options
  );
}

function normalizeMiddleware(middleware: Middleware<unknown>) {
  const normalizedMiddleware: GM.Middleware<unknown> = (params, next) => {
    return middleware(
      {
        root: params.root,
        args: params.args,
        ctx: params.context,
        info: params.info,
      },
      next
    );
  };
  return normalizedMiddleware;
}

export type MiddlewaresMap = Record<string, Record<string, Array<unknown>>>;

export function addMiddleware(
  map: MiddlewaresMap,
  type: string,
  field: string,
  resolver: Middleware<unknown>
) {
  if (map[type] == null) {
    map[type] = {};
  }
  if (map[type][field] == null) {
    map[type][field] = [];
  }
  map[type][field].push(normalizeMiddleware(resolver));
}
