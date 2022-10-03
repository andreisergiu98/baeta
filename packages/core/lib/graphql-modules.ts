import { GraphQLResolveInfo } from 'graphql';
import { createApplication, createModule, Module } from 'graphql-modules';
import { MiddlewareMap } from 'graphql-modules/shared/middleware';

export namespace GM {
  export const createGMModule = createModule;
  export const createGMApplication = createApplication;

  export type GMModule = Module;
  export type GMMiddlewareMap = MiddlewareMap;

  export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
    parent: Parent,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ) => Promise<Result> | Result;

  export type Middleware<
    Result,
    Root extends {} = {},
    Args extends {} = {},
    Context extends {} = {}
  > = (
    params: {
      root: Root;
      args: Args;
      context: Context;
      info: GraphQLResolveInfo;
    },
    next: () => Promise<Result>
  ) => Promise<Result>;
}
