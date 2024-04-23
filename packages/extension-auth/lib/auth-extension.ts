import { MiddlewareParams } from '@baeta/core';
import { Extension, ModuleBuilder, NativeMiddleware, ResolverMapper } from '@baeta/core/sdk';
import { GraphQLResolveInfo } from 'graphql';
import { createResolverPath, isOperationType } from '../utils/resolver';
import { ScopeErrorResolver, defaultErrorResolver, resolveError } from './error';
import { GetGrant, saveGrants } from './grant';
import { LogicRule } from './rule';
import { GetScopeLoader } from './scope-resolver';
import { ScopeRules, verifyScopes } from './scope-rules';
import { loadAuthStore } from './store-loader';

interface OperationOptions<T> {
  Query?: T;
  Mutation?: T;
  Subscription?: {
    subscribe?: T;
    resolve?: T;
  };
}

export interface AuthOptions {
  defaultScopes?: OperationOptions<ScopeRules>;
  errorResolver?: ScopeErrorResolver;
}

export interface AuthMethodOptions<Result, Root, Context, Args> {
  grants?: GetGrant<Result, Root, Context, Args>;
  skipDefaults?: boolean;
  onError?: ScopeErrorResolver;
}

export type GetScopeRules<Root, Context, Args> = (
  params: MiddlewareParams<Root, Context, Args>,
) => ScopeRules | Promise<ScopeRules> | true | Promise<true>;

export type GetPostScopeRules<Result, Root, Context, Args> = (
  params: MiddlewareParams<Root, Context, Args>,
  result: Result,
) => ScopeRules | Promise<ScopeRules> | true | Promise<true>;

export class AuthExtension<T> extends Extension {
  private defaultRule: LogicRule = '$and';
  private authMap: Record<string, Record<string, undefined | NativeMiddleware>> = {};

  private readonly defaultMiddlewares: OperationOptions<NativeMiddleware>;

  constructor(
    readonly loadScopes: GetScopeLoader<T>,
    readonly options: AuthOptions = {},
  ) {
    super();
    this.defaultMiddlewares = this.createDefaultMiddlewares();
  }

  getModuleExtensions = () => {
    return {};
  };

  getTypeExtensions = <Root, Context>(
    module: ModuleBuilder,
    type: string,
  ): BaetaExtensions.TypeExtensions<Root, Context> => {
    return {
      $auth: this.createPreAuthMethod(type, '*'),
      $postAuth: this.createPostAuthMethod(type, '*'),
    };
  };

  getResolverExtensions = <Result, Root, Context, Args>(
    module: ModuleBuilder,
    type: string,
    field: string,
  ): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod(type, field),
      $postAuth: this.createPostAuthMethod(type, field),
    };
  };

  getSubscriptionExtensions = <Root, Context, Args>(
    module: ModuleBuilder,
    field: string,
  ): BaetaExtensions.SubscriptionExtensions<Root, Context, Args> => {
    return {
      $auth: this.createSubscriptionPreAuthMethod(field),
    };
  };

  getSubscriptionSubscribeExtensions = <Root, Context, Args>(
    module: ModuleBuilder,
    field: string,
  ): BaetaExtensions.SubscriptionSubscribeExtensions<Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod('Subscription', `${field}.subscribe`),
    };
  };

  getSubscriptionResolveExtensions = <Result, Root, Context, Args>(
    module: ModuleBuilder,
    field: string,
  ): BaetaExtensions.SubscriptionResolveExtensions<Result, Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod('Subscription', `${field}.resolve`),
      $postAuth: this.createPostAuthMethod('Subscription', `${field}.resolve`),
    };
  };

  build = (module: ModuleBuilder, mapper: ResolverMapper) => {
    for (const type of mapper.getTypes()) {
      const fields = mapper.getTypeFields(type);
      const fieldsWithScopes = Object.keys(this.authMap[type] ?? {});
      let fieldsWithoutScopes = fields.filter((field) => !fieldsWithScopes.includes(field));

      for (const field of fieldsWithScopes) {
        const middleware = this.authMap[type][field];

        if (middleware == null) {
          continue;
        }

        if (field !== '*') {
          mapper.addMiddleware(type, field, middleware, true);
          continue;
        }

        for (const fieldWithoutScope of fieldsWithoutScopes) {
          mapper.addMiddleware(type, fieldWithoutScope, middleware, true);
        }

        fieldsWithoutScopes = [];
      }

      if (!isOperationType(type) || fieldsWithoutScopes.length === 0) {
        continue;
      }

      const buildDefaultMiddleware = this.createDefaultMiddlewareBuilder(type);

      if (buildDefaultMiddleware == null) {
        continue;
      }

      for (const field of fieldsWithoutScopes) {
        buildDefaultMiddleware(mapper, field);
      }
    }
  };

  private createDefaultMiddlewares() {
    const createDefaultMiddleware = (rules?: ScopeRules) => {
      if (rules == null) {
        return;
      }
      return this.createPreMiddleware(() => rules);
    };

    return {
      Query: createDefaultMiddleware(this.options.defaultScopes?.Query),
      Mutation: createDefaultMiddleware(this.options.defaultScopes?.Mutation),
      Subscription: {
        resolve: createDefaultMiddleware(this.options.defaultScopes?.Subscription?.resolve),
        subscribe: createDefaultMiddleware(this.options.defaultScopes?.Subscription?.subscribe),
      },
    };
  }

  private createDefaultMiddlewareBuilder(type: 'Query' | 'Mutation' | 'Subscription') {
    if (type !== 'Subscription') {
      const middleware = this.defaultMiddlewares[type];

      if (middleware == null) {
        return;
      }

      return (mapper: ResolverMapper, field: string) => {
        mapper.addMiddleware(type, field, middleware, true);
      };
    }

    const subscribeDefaultMiddleware = this.defaultMiddlewares?.Subscription?.subscribe;
    const resolveDefaultMiddleware = this.defaultMiddlewares.Subscription?.resolve;

    if (resolveDefaultMiddleware == null && subscribeDefaultMiddleware == null) {
      return;
    }

    return (mapper: ResolverMapper, field: string) => {
      if (subscribeDefaultMiddleware) {
        mapper.addMiddleware(type, `${field}.subscribe`, subscribeDefaultMiddleware, true);
      }

      if (resolveDefaultMiddleware) {
        mapper.addMiddleware(type, `${field}.resolve`, resolveDefaultMiddleware, true);
      }
    };
  }

  private createPreAuthMethod<Result, Root, Context, Args>(type: string, field: string) {
    return (
      scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
      options?: AuthMethodOptions<Result, Root, Context, Args>,
    ) => {
      const getScopes = typeof scopes === 'function' ? scopes : () => scopes;
      const shouldUseDefaultScopes = options?.skipDefaults !== true && isOperationType(type);
      const defaultScopes = shouldUseDefaultScopes ? this.options.defaultScopes?.[type] : undefined;
      const middleware = this.createPreMiddleware(getScopes, options, defaultScopes);
      this.registerMiddleware(type, field, middleware);
    };
  }

  private createPostAuthMethod<Result, Root, Context, Args>(type: string, field: string) {
    return (
      getScopes: GetPostScopeRules<Result, Root, Context, Args>,
      options?: AuthMethodOptions<Result, Root, Context, Args>,
    ) => {
      const shouldUseDefaultScopes = options?.skipDefaults !== true && isOperationType(type);
      const defaultScopes = shouldUseDefaultScopes ? this.options.defaultScopes?.[type] : undefined;
      const middleware = this.createPostMiddleware(getScopes, options, defaultScopes);
      this.registerMiddleware(type, field, middleware);
    };
  }

  private createSubscriptionPreAuthMethod<Root, Context, Args>(field: string) {
    return (
      scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
      options?: AuthMethodOptions<{}, Root, Context, Args>,
    ) => {
      const registerResolve = this.createPreAuthMethod<{}, Root, Context, Args>(
        'Subscription',
        `${field}.resolve`,
      );
      const registerSubscribe = this.createPreAuthMethod<{}, Root, Context, Args>(
        'Subscription',
        `${field}.subscribe`,
      );

      registerResolve(scopes, options);
      registerSubscribe(scopes, options);
    };
  }

  private createPreMiddleware(
    getScopes: GetScopeRules<any, any, any>,
    options?: AuthMethodOptions<any, any, any, any>,
    defaultScopes?: ScopeRules,
  ): NativeMiddleware {
    return (next) => async (root, args, ctx, info) => {
      loadAuthStore(ctx as T, this.loadScopes);

      const requiredScopes = await getScopes({ root, args, ctx, info });

      if (requiredScopes === true) {
        return next(root, args, ctx, info);
      }

      await this.verifyAllScopes(ctx, info, options, defaultScopes, requiredScopes);
      const result = await next(root, args, ctx, info);

      if (options?.grants) {
        await saveGrants(root, args, ctx, info, result, options.grants);
      }

      return result;
    };
  }

  private createPostMiddleware(
    getScopes: GetPostScopeRules<any, any, any, any>,
    options?: AuthMethodOptions<any, any, any, any>,
    defaultScopes?: ScopeRules,
  ): NativeMiddleware {
    return (next) => async (root, args, ctx, info) => {
      loadAuthStore(ctx as T, this.loadScopes);

      const result = await next(root, args, ctx, info);
      const requiredScopes = await getScopes({ root, args, ctx, info }, result);

      if (requiredScopes === true) {
        return result;
      }

      await this.verifyAllScopes(ctx, info, options, defaultScopes, requiredScopes);

      if (options?.grants) {
        await saveGrants(root, args, ctx, info, result, options.grants);
      }

      return result;
    };
  }

  private registerMiddleware(type: string, field: string, middleware: NativeMiddleware) {
    if (this.authMap[type] == null) {
      this.authMap[type] = {};
    }
    this.authMap[type][field] = middleware;
  }

  private async verifyAllScopes(
    ctx: unknown,
    info: GraphQLResolveInfo,
    options: AuthMethodOptions<any, any, any, any> | undefined,
    defaultScopes: ScopeRules | undefined,
    requiredScopes: ScopeRules | undefined,
  ) {
    const fullPath = createResolverPath(info.path);
    const parentPath = createResolverPath(info.path.prev);
    const errorResolver = this.createErrorResolver(options?.onError);

    const promises: Promise<unknown>[] = [];

    if (defaultScopes) {
      promises.push(verifyScopes(ctx, defaultScopes, this.defaultRule, parentPath));
    }
    promises.push(verifyScopes(ctx, requiredScopes, this.defaultRule, parentPath));

    return Promise.all(promises).catch((err) => resolveError(err, errorResolver, fullPath));
  }

  private createErrorResolver(errorResolver?: ScopeErrorResolver) {
    return errorResolver ?? this.options.errorResolver ?? defaultErrorResolver;
  }
}
