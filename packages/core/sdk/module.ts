import { DocumentNode, GraphQLSchema } from "graphql";
import { ManagerOptions } from "./manager";
import { GM } from "../lib/graphql-modules";
import { MiddlewaresMap, registerMiddleware } from "./middleware";
import { ResolversMap, registerResolver } from "./resolver";
import { registerScalar } from "./scalar";
import { registerSubscription } from "./subscription";
import { Middleware, Resolver, ScalarResolver } from "../lib";
import { SubscriptionObjectWithoutPayload } from "../lib/subscription";
import { SchemaTransformer, transformSchema } from "./directive";

export interface Module<T> {
  id: string;
  dirname: string;
  typedef: DocumentNode;
  createManager: (options: ManagerOptions) => T;
}

export type SdkModule<T> = T & {
  __build: () => GM.Module;
  __transformSchema: (schema: GraphQLSchema) => GraphQLSchema;
};

interface ExtendOptions {
  module: Module<unknown>;
  resolvers: ResolversMap;
  middlewares: MiddlewaresMap;
  transformers: SchemaTransformer[];
}

function extendManager<T>(manager: T, options: ExtendOptions): T {
  const { module, resolvers, middlewares, transformers } = options;
  const extended = manager as SdkModule<T>;

  extended.__build = () => {
    return GM.createModule({
      id: module.id,
      typeDefs: module.typedef,
      dirname: module.dirname,
      resolvers: resolvers,
      middlewares: middlewares as GM.MiddlewareMap,
    });
  };

  extended.__transformSchema = (schema) => {
    return transformSchema(schema, transformers);
  };

  return extended;
}

export function createModule<T>(module: Module<T>) {
  const resolvers: ResolversMap = {};
  const middlewares: MiddlewaresMap = {};
  const transformers: SchemaTransformer[] = [];

  const onScalar = (scalar: string, resolver: ScalarResolver) => {
    registerScalar(resolvers, scalar, resolver);
  };

  const onResolver = (
    type: string,
    field: string,
    resolver: Resolver<unknown>
  ) => {
    registerResolver(resolvers, type, field, resolver);
  };

  const onSubscription = (
    field: string,
    subscription: SubscriptionObjectWithoutPayload<unknown>
  ) => {
    registerSubscription(resolvers, field, subscription);
  };

  const onMiddleware = (
    type: string,
    field: string,
    resolver: Middleware<unknown>
  ) => {
    registerMiddleware(middlewares, type, field, resolver);
  };

  const onDirective = (transformer: SchemaTransformer) => {
    transformers.push(transformer);
  };

  const manager = module.createManager({
    onScalar,
    onResolver,
    onMiddleware,
    onSubscription,
  });

  extendManager(manager, {
    module,
    resolvers,
    middlewares,
    transformers,
  });

  return { ...manager, $directive: onDirective };
}
