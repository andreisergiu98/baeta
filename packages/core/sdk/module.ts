import { DocumentNode, GraphQLSchema } from 'graphql';
import { Middleware, Resolver, ScalarResolver } from '../lib';
import { Subscription } from '../lib/subscription';
import { extendFunction, nameFunction } from '../utils/functions';
import { Extension, ExtensionFactory, mergeExtensions, resolveExtensions } from './extension';
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
  readonly mapper = new ResolverMapper();
  readonly transformers: SchemaTransformer[] = [];
  readonly typeFields: Record<string, string[]> = {};

  constructor(
    readonly id: string,
    readonly dirname: string,
    readonly typedef: DocumentNode,
    private readonly extensions: Extension[]
  ) {}

  createResolverBuilder<Result, Root, Context, Args>(type: string, field: string) {
    this.registerTypeField(type, field);

    const builder = (resolver: Resolver<Result, Root, Context, Args>) => {
      nameFunction(resolver, `${type}.${field}`);
      this.mapper.setResolver(type, field, createResolverAdapter(resolver));
    };

    return extendFunction(builder, {
      ...this.getResolverExtensions<Result, Root, Context, Args>(type, field),
      $use: this.createMiddlewareBuilder<Middleware<Result, Root, Context, Args>>(type, field),
    });
  }

  createSubscriptionBuilder<Result, Root, Context, Args>(field: string) {
    this.registerTypeField('Subscription', field);

    const subscribeField = `${field}.subscribe`;
    const resolveField = `${field}.resolve`;
    const filterField = `${field}.filter`;

    const builder = <Payload>(subscription: Subscription<Payload, Result, Root, Context, Args>) => {
      nameFunction(subscription.subscribe, subscribeField);
      nameFunction(subscription.resolve, resolveField);
      nameFunction(subscription.filter, filterField);
      this.mapper.setSubscription(field, createSubscriptionAdapter(subscription));
    };

    return extendFunction(builder, {
      subscribe: {
        ...this.getSubscriptionSubscribeExtensions<Root, Context, Args>(field),
        $use: this.createMiddlewareBuilder('Subscription', subscribeField) as <Payload>(
          middleware: Middleware<AsyncIterator<Payload>, Root, Context, Args>
        ) => void,
      },
      resolve: {
        ...this.getSubscriptionResolveExtensions<Result, Root, Context, Args>(field),
        $use: this.createMiddlewareBuilder<Middleware<Result, Root, Context, Args>>(
          'Subscription',
          resolveField
        ),
      },
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
      ...this.getTypeExtensions<Root, Context>(type),
      $use: this.createMiddlewareBuilder<Middleware<unknown, Root, Context, unknown>>(type, '*'),
    };
  }

  createSubscriptionMethods<Root, Context>() {
    return {
      ...this.createTypeMethods<Root, Context>('Subscription'),
      $use: this.createMiddlewareBuilder<Middleware<unknown, Root, Context, unknown>>(
        'Subscription',
        '*'
      ),
    };
  }

  createModuleMethods<Context>() {
    return {
      ...this.getModuleExtensions(),
      $builder: this as ModuleBuilder,
      $use: this.createMiddlewareBuilder<Middleware<unknown, unknown, Context, unknown>>('*', '*'),
      $directive: this.addTransformer,
    };
  }

  private getResolverExtensions<Result, Root, Context, Args>(type: string, field: string) {
    return mergeExtensions(this.extensions, (ext) =>
      ext.getResolverExtensions(type, field)
    ) as BaetaExtensions.ResolverExtensions<Result, Root, Context, Args>;
  }

  private getTypeExtensions<Root, Context>(type: string) {
    return mergeExtensions(this.extensions, (ext) =>
      ext.getTypeExtensions(type)
    ) as BaetaExtensions.TypeExtensions<Root, Context>;
  }

  private getSubscriptionSubscribeExtensions<Root, Context, Args>(type: string) {
    return mergeExtensions(this.extensions, (ext) =>
      ext.getSubscriptionSubscribeExtensions(type)
    ) as BaetaExtensions.SubscriptionSubscribeExtensions<Root, Context, Args>;
  }

  private getSubscriptionResolveExtensions<Result, Root, Context, Args>(type: string) {
    return mergeExtensions(this.extensions, (ext) =>
      ext.getSubscriptionResolveExtensions(type)
    ) as BaetaExtensions.SubscriptionResolveExtensions<Result, Root, Context, Args>;
  }

  private getModuleExtensions() {
    return mergeExtensions(this.extensions, (ext) =>
      ext.getModuleExtensions()
    ) as BaetaExtensions.ModuleExtensions;
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

  private transform = (schema: GraphQLSchema) => {
    return transformSchema(schema, [
      ...this.transformers,
      ...this.extensions.flatMap((ext) => ext.getTransformers()),
    ]);
  };

  build = () => {
    for (const extension of this.extensions) {
      extension.build(this.mapper, this.typeFields);
    }

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

export function createModuleManager<T>(
  moduleMetadata: Module<T>,
  extensions?: ExtensionFactory<Extension>[]
) {
  const moduleBuilder = new ModuleBuilder(
    moduleMetadata.id,
    moduleMetadata.dirname,
    moduleMetadata.typedef,
    resolveExtensions(extensions ?? [])
  );
  const manager = moduleMetadata.createManager(moduleBuilder);
  return manager as Omit<T, '$builder'>;
}
