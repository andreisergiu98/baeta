import { DocumentNode, GraphQLSchema } from "graphql";
import { Middleware, Resolver, ScalarResolver } from "../lib";
import { GM } from "../lib/graphql-modules";
import { SubscriptionObjectWithoutPayload } from "../lib/subscription";
import { SchemaTransformer, transformSchema } from "./directive";
import { ManagerOptions } from "./manager";
import { addMiddleware, MiddlewaresMap } from "./middleware";
import { addResolver, ResolversMap } from "./resolver";
import { addScalar } from "./scalar";
import { addSubscription } from "./subscription";

export interface Module<T> {
  id: string;
  dirname: string;
  typedef: DocumentNode;
  createManager: (options: ManagerOptions) => T;
}

export type SdkModule<T> = T & {
  __build: () => GM.GMModule;
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
    return GM.createGMModule({
      id: module.id,
      typeDefs: module.typedef,
      dirname: module.dirname,
      resolvers: resolvers,
      middlewares: middlewares as GM.GMMiddlewareMap,
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
    addScalar(resolvers, scalar, resolver);
  };

  const onResolver = (
    type: string,
    field: string,
    resolver: Resolver<unknown>
  ) => {
    addResolver(resolvers, type, field, resolver);
  };

  const onSubscription = (
    field: string,
    subscription: SubscriptionObjectWithoutPayload<unknown>
  ) => {
    addSubscription(resolvers, field, subscription);
  };

  const onMiddleware = (
    type: string,
    field: string,
    resolver: Middleware<unknown>
  ) => {
    addMiddleware(middlewares, type, field, resolver);
  };

  const onDirective = (transformer: SchemaTransformer) => {
    transformers.push(transformer);
  };

  const manager = module.createManager({
    onScalar,
    onResolver,
    onMiddleware,
    onSubscription,
    onDirective,
  });

  extendManager(manager, {
    module,
    resolvers,
    middlewares,
    transformers,
  });

  return manager;
}

export function createSingletonModule<T>(create: () => T) {
  let module: T | undefined;
  return () => {
    if (!module) {
      module = create();
    }
    return module;
  };
}
