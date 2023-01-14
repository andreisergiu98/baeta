import { DocumentNode, GraphQLSchema } from 'graphql';
import { Middleware, Resolver, ScalarResolver } from '../lib';
import { Subscription } from '../lib/subscription';
import { extendFunction, nameFunction } from '../utils/functions';
import { createExtensionManager, Extension, ExtensionManager, mergeExtensions } from './extension';
import { createMiddlewareAdapter, GenericMiddleware } from './middleware';
import { createResolverAdapter } from './resolver';
import { ResolverMapper } from './resolver-mapper';
import { createSubscriptionAdapter } from './subscription';
import { SchemaTransformer } from './transformer';

export interface Module<T, E extends Extension> {
  id: string;
  dirname: string;
  typedef: DocumentNode;
  createManager: (builder: ModuleBuilder<E>) => T;
}

type Merge<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export class ModuleBuilder<E extends Extension> {
  mapper = new ResolverMapper();
  transformers: SchemaTransformer[] = [];
  typeFields: Record<string, string[]> = {};
  extensionManager: ExtensionManager<E>;

  constructor(
    readonly id: string,
    readonly dirname: string,
    readonly typedef: DocumentNode,
    readonly extensions: E[]
  ) {
    this.extensionManager = createExtensionManager(extensions);
  }

  createResolverBuilder<Result, Root, Context, Args>(type: string, field: string) {
    this.registerTypeField(type, field);

    const builder = (resolver: Resolver<Result, Root, Context, Args>) => {
      nameFunction(resolver, `${type}.${field}`);
      this.mapper.setResolver(type, field, createResolverAdapter(resolver));
    };

    return extendFunction(builder, {
      // ...this.getResolverExtensions<Result, Root, Context, Args>(type, field),
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
      // ...this.getModuleExtensions(),
      $builder: this as ModuleBuilder<E>,
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

  private getResolverExtensions<Result, Root, Context, Args>(type: string, field: string) {
    // return this.mergeExtensions(
    //   this.extensions.map((extension) =>
    //     extension.getResolverExtensions<Result, Root, Context, Args>(type, field)
    //   )
    // );
  }

  getTypeExtensions<Root, Context>(type: string) {
    const handler: E['getTypeExtensions'] = (type: string) => {
      return mergeExtensions(this.extensions, (extension) =>
        extension.getTypeExtensions<Root, Context>(type)
      );
    };
    return handler;
  }

  private getModuleExtensions() {
    // const list = this.extensions.map((extension) => extension.getModuleExtensions());
    // return this.mergeExtensions(list);
  }

  private mergeExt<T, K>(items: T[], callback: (item: T) => K) {
    const list = items.map(callback);
    const reduced = list.reduce((acc, handler) => ({
      ...acc,
      ...handler,
    }));
    return reduced;
  }

  private mergeExtensions<T>(list: T[]) {
    return list.reduce((acc, handler) => ({ ...acc, ...handler }));
  }

  private transform = (schema: GraphQLSchema) => {
    // const pluginTransformers = this.extensions.flatMap((extension) => extension.getTransformers());
    // const transformers = pluginTransformers.concat(this.transformers);
    // return transformSchema(schema, transformers);
    return schema;
  };

  build = () => {
    // for (const extension of this.extensions) {
    //   extension.build?.();
    //   extension.setResolvers?.(this.mapper, this.typeFields);
    //   extension.registerMiddlewares?.(this.mapper, this.typeFields);
    // }

    return {
      typedef: this.typedef,
      resolvers: this.mapper.compose(),
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

export function createModuleManager<T, E extends Extension>(
  moduleMetadata: Module<T, E>,
  extensions: E[]
) {
  const moduleBuilder = new ModuleBuilder(
    moduleMetadata.id,
    moduleMetadata.dirname,
    moduleMetadata.typedef,
    extensions
  );
  const manager = moduleMetadata.createManager(moduleBuilder);
  return manager as Omit<T, '$builder'>;
}
