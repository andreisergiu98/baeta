import { GraphQLResolveInfo } from "graphql";
import { MiddlewareMap as GMMiddlewareMap } from "graphql-modules/shared/middleware";
import {
  createModule as createGMModule,
  createApplication as createGMApplication,
  Module as GMModule,
} from "graphql-modules";

export namespace GM {
  export const createModule = createGMModule;
  export const createApplication = createGMApplication;

  export type Module = GMModule;
  export type MiddlewareMap = GMMiddlewareMap;

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
