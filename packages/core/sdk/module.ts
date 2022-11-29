import { composeResolvers, ResolversComposerMapping } from '@graphql-tools/resolvers-composition';
import { DocumentNode, GraphQLFieldResolver, GraphQLSchema } from 'graphql';
import { ScalarResolver } from '../lib';
import {
  createMiddlewareBuilder,
  MiddlewareFromResolverObject,
  NativeMiddleware,
} from './middleware';
import { NativeSubscribe } from './subscription';
import { SchemaTransformer, transformSchema } from './transformer';

// rome-ignore lint(nursery/noExplicitAny): TODO
export type ResolversMap = Record<string, any>;

export interface ModuleMetadata<T> {
  id: string;
  dirname: string;
  typedef: DocumentNode;
  createManager: (builder: ModuleBuilder) => T;
}
export class ModuleBuilder {
  private resolvers: ResolversMap = {};
  private middlewares: Record<string, NativeMiddleware[]> = {};
  private transformers: SchemaTransformer[] = [];

  constructor(
    public readonly id: string,
    public readonly dirname: string,
    private readonly typedef: DocumentNode
  ) {}

  onResolver = (type: string, field: string, resolver: GraphQLFieldResolver<unknown, unknown>) => {
    if (this.resolvers[type] == null) {
      this.resolvers[type] = {};
    }
    this.resolvers[type][field] = resolver;
  };

  onScalar = (scalar: string, resolver: ScalarResolver) => {
    if (this.resolvers[scalar] == null) {
      this.resolvers[scalar] = {};
    }
    this.resolvers[scalar] = resolver;
  };

  onSubscription = (field: string, resolver: NativeSubscribe) => {
    if (this.resolvers.Subscription == null) {
      this.resolvers.Subscription = {};
    }
    this.resolvers.Subscription[field] = resolver;
  };

  onMiddleware = (type: string, field: string, middleware: NativeMiddleware) => {
    const key = `${type}.${field}`;
    if (this.middlewares[key] == null) {
      this.middlewares[key] = [];
    }
    this.middlewares[key].push(middleware);
  };

  onDirective = (transformer: SchemaTransformer) => {
    this.transformers.push(transformer);
  };

  transform = (schema: GraphQLSchema) => {
    return transformSchema(schema, this.transformers);
  };

  build = () => {
    const withMiddlewares = composeResolvers(
      this.resolvers,
      this.middlewares as ResolversComposerMapping
    );
    return {
      resolvers: withMiddlewares,
      typedef: this.typedef,
      transform: this.transform,
    };
  };
}

export function getModuleBuilder(module: Record<string, unknown>) {
  if (module.$module instanceof ModuleBuilder) {
    return module.$module;
  }
  throw new Error('Invalid module', module);
}

export function aggregateBuilders<Map, Resolvers extends {}>(
  module: ModuleBuilder,
  _type: Resolvers,
  map: Map
) {
  return {
    ...map,
    $use: createMiddlewareBuilder<MiddlewareFromResolverObject<Resolvers>>(module, '*', '*'),
    $module: module,
    $directive: module.onDirective,
  };
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

export function createModuleManager<T>(moduleMetadata: ModuleMetadata<T>) {
  const moduleBuilder = new ModuleBuilder(
    moduleMetadata.id,
    moduleMetadata.dirname,
    moduleMetadata.typedef
  );
  const manager = moduleMetadata.createManager(moduleBuilder);
  return manager as Omit<T, 'module'>;
}
