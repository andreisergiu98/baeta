import { composeResolvers, ResolversComposerMapping } from '@graphql-tools/resolvers-composition';
import { defaultFieldResolver, DocumentNode, GraphQLFieldResolver, GraphQLSchema } from 'graphql';
import { UnionToIntersection } from 'type-fest';
import { Middleware, Resolver, ScalarResolver } from '../lib';
import { Subscription } from '../lib/subscription';
import { extendFunction, nameFunction } from '../utils/functions';
import { createMiddlewareAdapter, GenericMiddleware, NativeMiddleware } from './middleware';
import { PluginA, PluginB, PluginC, PluginV1Builder } from './plugin-v1';
import { createResolverAdapter } from './resolver';
import { createSubscriptionAdapter, NativeSubscribe } from './subscription';
import { SchemaTransformer, transformSchema } from './transformer';

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ResolversMap = Record<string, any>;

export interface Module<T> {
  id: string;
  dirname: string;
  typedef: DocumentNode;
  createManager: (builder: ModuleBuilder) => T;
}

export class ModuleBuilder {
  resolvers: ResolversMap = {};
  middlewares: Record<string, NativeMiddleware[]> = {};
  transformers: SchemaTransformer[] = [];
  plugins;

  constructor(
    readonly id: string,
    readonly dirname: string,
    readonly typedef: DocumentNode,
    pluginsBuilder: PluginV1Builder[] = []
  ) {
    this.plugins = [new PluginA(this), new PluginB(this), new PluginC(this)] as const;
  }

  createResolverBuilder = <Result, Root, Context, Args>(type: string, field: string) => {
    const builder = (resolver: Resolver<Result, Root, Context, Args>) => {
      nameFunction(resolver, `${type}.${field}`);
      const adaptedResolver = createResolverAdapter(resolver);
      this.addResolver(type, field, adaptedResolver);
    };

    const methods = {
      ...this.getResolverPluginMethods(type, field),
      $use: this.createMiddlewareBuilder<Middleware<Result, Root, Context, Args>>(type, field),
    };

    return extendFunction(builder, methods);
  };

  createSubscriptionBuilder = <Result, Root, Context, Args>(field: string) => {
    const builder = <Payload>(subscription: Subscription<Payload, Result, Root, Context, Args>) => {
      nameFunction(subscription.subscribe, `${field}.subscribe`);
      nameFunction(subscription.resolve, `${field}.resolve`);
      nameFunction(subscription.filter, `${field}.filter`);
      const adaptedSubscription = createSubscriptionAdapter(subscription);
      this.addSubscription(field, adaptedSubscription);
    };

    const methods = {
      $use: this.createMiddlewareBuilder<Middleware<Result, Root, Context, Args>>(
        'Subscription',
        `${field}`
      ),
    };

    return extendFunction(builder, methods);
  };

  createScalarBuilder = (scalar: string) => {
    const builder = (resolver: ScalarResolver) => {
      this.addScalar(scalar, resolver);
    };
    return builder;
  };

  createMiddlewareBuilder = <M extends GenericMiddleware>(type: string, field: string) => {
    const builder = (middleware: M) => {
      nameFunction(middleware, `${type}.${field}.$use`);
      const adaptedMiddleware = createMiddlewareAdapter(middleware);
      this.addMiddleware(type, field, adaptedMiddleware);
    };
    return builder;
  };

  createTypeMethods = <Root, Context>(type: string) => {
    return {
      ...this.getTypePluginMethods(type),
      $use: this.createMiddlewareBuilder<Middleware<unknown, Root, Context, unknown>>(type, '*'),
    };
  };

  createSubscriptionMethods = <Root, Context>() => {
    return {
      ...this.getTypePluginMethods('Subscription'),
      $use: this.createMiddlewareBuilder<Middleware<unknown, Root, Context, unknown>>(
        'Subscription',
        '*'
      ),
    };
  };

  createModuleMethods = <Context>() => {
    return {
      ...this.getModulePluginMethods(),
      $builder: this as ModuleBuilder,
      $use: this.createMiddlewareBuilder('*', '*'),
      $directive: this.addTransformer,
    };
  };

  private addResolver = (
    type: string,
    field: string,
    resolver: GraphQLFieldResolver<unknown, unknown>
  ) => {
    if (this.resolvers[type] == null) {
      this.resolvers[type] = {};
    }
    this.resolvers[type][field] = resolver;
  };

  private addScalar = (scalar: string, resolver: ScalarResolver) => {
    if (this.resolvers[scalar] == null) {
      this.resolvers[scalar] = {};
    }
    this.resolvers[scalar] = resolver;
  };

  private addSubscription = (field: string, resolver: NativeSubscribe) => {
    if (this.resolvers.Subscription == null) {
      this.resolvers.Subscription = {};
    }
    this.resolvers.Subscription[field] = resolver;
  };

  private addMiddleware = (type: string, field: string, middleware: NativeMiddleware) => {
    const key = `${type}.${field}`;
    if (this.middlewares[key] == null) {
      this.middlewares[key] = [];
    }
    this.middlewares[key].push(middleware);
    this.addDefaultFieldResolver(type, field);
  };

  private addTransformer = (transformer: SchemaTransformer) => {
    this.transformers.push(transformer);
  };

  private addDefaultFieldResolver = (type: string, field: string) => {
    if (['Query', 'Mutation', 'Subscription'].includes(type)) {
      return;
    }
    if (this.resolvers[type]?.[field] != null) {
      return;
    }
    this.addResolver(type, field, defaultFieldResolver);
  };

  private getResolverPluginMethods = (type: string, field: string) => {
    return this.mergePluginMethods(
      this.plugins.map((plugin) => plugin.resolverMethods(type, field))
    );
  };

  private getTypePluginMethods = (type: string) => {
    return this.mergePluginMethods(this.plugins.map((plugin) => plugin.typeMethods(type)));
  };

  private getModulePluginMethods = () => {
    return this.mergePluginMethods(this.plugins.map((plugin) => plugin.moduleMethods()));
  };

  private mergePluginMethods = <T>(list: T[]) => {
    return list.reduce((acc, handler) => ({ ...acc, ...handler })) as UnionToIntersection<T>;
  };

  private transform = (schema: GraphQLSchema) => {
    const pluginTransformers = this.plugins.flatMap((plugin) => plugin.transformers);
    const transformers = pluginTransformers.concat(this.transformers);
    return transformSchema(schema, transformers);
  };

  build = () => {
    for (const plugin of this.plugins) {
      plugin.build();
    }

    const resolvers = composeResolvers(
      this.resolvers,
      this.middlewares as ResolversComposerMapping
    );

    return {
      resolvers: resolvers,
      typedef: this.typedef,
      transform: this.transform,
    };
  };
}

export function getModuleBuilder(module: Record<string, unknown>) {
  if (module.$builder instanceof ModuleBuilder) {
    return module.$builder;
  }
  throw new Error('Invalid module', module);
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

export function createModuleManager<T>(moduleMetadata: Module<T>) {
  const moduleBuilder = new ModuleBuilder(
    moduleMetadata.id,
    moduleMetadata.dirname,
    moduleMetadata.typedef
  );
  const manager = moduleMetadata.createManager(moduleBuilder);
  return manager as Omit<T, '$builder'>;
}
