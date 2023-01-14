import { DocumentNode, GraphQLSchema } from 'graphql';
import { Middleware, Resolver, ScalarResolver } from '../lib';
import { Subscription } from '../lib/subscription';
import { extendFunction, nameFunction } from '../utils/functions';
import { createMiddlewareAdapter, GenericMiddleware } from './middleware';
import { createResolverAdapter } from './resolver';
import { ResolverMapper } from './resolver-mapper';
import { createSubscriptionAdapter } from './subscription';
import { SchemaTransformer, transformSchema } from './transformer';

export interface Module<T> {
  id: string;
  dirname: string;
  typedef: DocumentNode;
  createManager: (builder: ModuleBuilder) => T;
}

export class ModuleBuilder {
  mapper = new ResolverMapper();
  transformers: SchemaTransformer[] = [];
  typeFields: Record<string, string[]> = {};
  // plugins;

  constructor(
    readonly id: string,
    readonly dirname: string,
    readonly typedef: DocumentNode // pluginsBuilder: PluginBuilders
  ) {
    // this.plugins = pluginsBuilder.map((createPlugin) => createPlugin(this));
  }

  createResolverBuilder<Result, Root, Context, Args>(type: string, field: string) {
    this.registerTypeField(type, field);

    const builder = (resolver: Resolver<Result, Root, Context, Args>) => {
      nameFunction(resolver, `${type}.${field}`);
      this.mapper.setResolver(type, field, createResolverAdapter(resolver));
    };

    return extendFunction(builder, {
      // ...this.getResolverPluginMethods(type, field),
      $use: this.createMiddlewareBuilder<Middleware<Result, Root, Context, Args>>(type, field),
    });
  }

  createSubscriptionBuilder<Result, Root, Context, Args>(field: string) {
    this.registerTypeField('Subscription', field);

    const builder = <Payload>(subscription: Subscription<Payload, Result, Root, Context, Args>) => {
      nameFunction(subscription.subscribe, `${field}.subscribe`);
      nameFunction(subscription.resolve, `${field}.resolve`);
      nameFunction(subscription.filter, `${field}.filter`);
      this.mapper.setSubscription(field, createSubscriptionAdapter(subscription));
    };

    return extendFunction(builder, {
      $subscribeUse: this.createMiddlewareBuilder('Subscription', `${field}.subscribe`) as <
        Payload
      >(
        middleware: Middleware<AsyncIterator<Payload>, Root, Context, Args>
      ) => void,
      $resolveUse: this.createMiddlewareBuilder<Middleware<Result, Root, Context, Args>>(
        'Subscription',
        `${field}.resolve`
      ),
    });
  }

  createScalarBuilder(scalar: string) {
    const builder = (resolver: ScalarResolver) => {
      this.mapper.setScalar(scalar, resolver);
    };
    return builder;
  }

  createMiddlewareBuilder<M extends GenericMiddleware>(type: string, field: string) {
    const builder = (middleware: M) => {
      nameFunction(middleware, `${type}.${field}.$use`);
      this.setDefaultResolvers(type, field);
      this.mapper.addMiddleware(type, field, createMiddlewareAdapter(middleware));
    };
    return builder;
  }

  createTypeMethods<Root, Context>(type: string) {
    return {
      // ...this.getTypePluginMethods(type),
      $use: this.createMiddlewareBuilder<Middleware<unknown, Root, Context, unknown>>(type, '*'),
    };
  }

  createSubscriptionMethods<Root, Context>() {
    return {
      $use: this.createMiddlewareBuilder<Middleware<unknown, Root, Context, unknown>>(
        'Subscription',
        '*'
      ),
    };
  }

  createModuleMethods<Context>() {
    return {
      $builder: this as ModuleBuilder,
      $use: this.createMiddlewareBuilder<Middleware<unknown, unknown, Context, unknown>>('*', '*'),
      $directive: this.addTransformer,
    };
  }

  private addTransformer = (transformer: SchemaTransformer) => {
    this.transformers.push(transformer);
  };

  private setDefaultResolvers(type: string, field: string) {
    if (['Query', 'Mutation', 'Subscription'].includes(type)) {
      return;
    }

    if (field !== '*') {
      return this.mapper.setDefaultFieldResolver(type, field);
    }

    for (const field of this.typeFields[type]) {
      this.mapper.setDefaultFieldResolver(type, field);
    }
  }

  private registerTypeField(type: string, field: string) {
    if (this.typeFields[type] == null) {
      this.typeFields[type] = [];
    }

    if (this.typeFields[type].includes(field)) {
      return;
    }

    this.typeFields[type].push(field);
  }

  // private getResolverPluginMethods(type: string, field: string) {
  //   return this.mergePluginMethods(
  //     this.plugins.map((plugin) => plugin.resolverMethods(type, field))
  //   );
  // }

  // private getTypePluginMethods(type: string) {
  //   return this.mergePluginMethods(this.plugins.map((plugin) => plugin.typeMethods(type)));
  // }

  // private getModulePluginMethods() {
  //   return this.mergePluginMethods(this.plugins.map((plugin) => plugin.moduleMethods()));
  // }

  // private mergePluginMethods<T>(list: T[]) {
  //   return list.reduce((acc, handler) => ({ ...acc, ...handler })) as UnionToIntersection<T>;
  // }

  private transform = (schema: GraphQLSchema) => {
    // const pluginTransformers = this.plugins.flatMap((plugin) => plugin.transformers);
    // const transformers = pluginTransformers.concat(this.transformers);
    return transformSchema(schema, this.transformers);
  };

  build() {
    // for (const plugin of this.plugins) {
    //   plugin.build();
    // }

    return {
      typedef: this.typedef,
      resolvers: this.mapper.compose(),
      transform: this.transform,
    };
  }
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
