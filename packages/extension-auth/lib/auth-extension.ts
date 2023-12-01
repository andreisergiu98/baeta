import { MiddlewareParams } from '@baeta/core';
import { Extension, NativeMiddleware, ResolverMapper } from '@baeta/core/sdk';
import { createResolverPath, isOperationType } from '../utils/resolver';
import { ScopeErrorResolver, aggregateErrorResolver, resolveError } from './error';
import { GetGrant, saveGrants } from './grant';
import { LogicRule } from './rule';
import { GetScopeLoader } from './scope-resolver';
import { ScopeRules, verifyScopes } from './scope-rules';
import { loadAuthStore } from './store-loader';

export interface AuthOptions {
  defaultScopes?: {
    Query?: ScopeRules;
    Mutation?: ScopeRules;
    Subscription?: ScopeRules;
  };
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
  private defaultRule: LogicRule = '$or';
  private authMap: Record<string, Record<string, undefined | NativeMiddleware>> = {};

  constructor(
    readonly loadScopes: GetScopeLoader<T>,
    readonly options: AuthOptions = {},
  ) {
    super();
  }

  getModuleExtensions = () => {
    return {};
  };

  getTypeExtensions = <Root, Context>(
    type: string,
  ): BaetaExtensions.TypeExtensions<Root, Context> => {
    return {
      $auth: this.createPreAuthMethod(type, '*'),
      $postAuth: this.createPostAuthMethod(type, '*'),
    };
  };

  getResolverExtensions = <Result, Root, Context, Args>(
    type: string,
    field: string,
  ): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod(type, field),
      $postAuth: this.createPostAuthMethod(type, field),
    };
  };

  getSubscriptionSubscribeExtensions = <Root, Context, Args>(
    field: string,
  ): BaetaExtensions.SubscriptionSubscribeExtensions<Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod('Subscription', `${field}.subscribe`),
      $postAuth: this.createPostAuthMethod('Subscription', `${field}.subscribe`),
    };
  };

  getSubscriptionResolveExtensions = <Result, Root, Context, Args>(
    field: string,
  ): BaetaExtensions.SubscriptionResolveExtensions<Result, Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod('Subscription', `${field}.resolve`),
      $postAuth: this.createPostAuthMethod('Subscription', `${field}.resolve`),
    };
  };

  build = (mapper: ResolverMapper) => {
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

      if (!isOperationType(type)) {
        continue;
      }

      const defaultScopes = this.options.defaultScopes?.[type];

      if (defaultScopes == null) {
        continue;
      }

      for (const field of fieldsWithoutScopes) {
        const middleware = this.createMiddleware(() => defaultScopes);
        mapper.addMiddleware(type, field, middleware, true);
      }
    }
  };

  private createMiddleware(
    getScopes: GetScopeRules<unknown, unknown, unknown>,
    options?: AuthMethodOptions<unknown, unknown, unknown, unknown>,
    defaultScopes?: ScopeRules,
  ): NativeMiddleware {
    return (next) => async (root, args, ctx, info) => {
      loadAuthStore(ctx as T, this.loadScopes);

      const requiredScopes = await getScopes({ root, args, ctx, info });

      if (requiredScopes === true) {
        return next(root, args, ctx, info);
      }

      const parentPath = createResolverPath(info.path.prev);

      const errorResolver =
        options?.onError ?? this.options.errorResolver ?? aggregateErrorResolver;

      await Promise.all([
        defaultScopes && verifyScopes(ctx, defaultScopes, this.defaultRule, parentPath),
        verifyScopes(ctx, requiredScopes, this.defaultRule, parentPath),
      ]).catch((err) => resolveError(err, errorResolver));

      const result = await next(root, args, ctx, info);

      if (options?.grants) {
        await saveGrants(root, args, ctx, info, result, options.grants);
      }

      return result;
    };
  }

  private createPostMiddleware(
    getScopes: GetPostScopeRules<unknown, unknown, unknown, unknown>,
    options?: AuthMethodOptions<unknown, unknown, unknown, unknown>,
    defaultScopes?: ScopeRules,
  ): NativeMiddleware {
    return (next) => async (root, args, ctx, info) => {
      loadAuthStore(ctx as T, this.loadScopes);

      const result = await next(root, args, ctx, info);
      const requiredScopes = await getScopes({ root, args, ctx, info }, result);

      if (requiredScopes === true) {
        return result;
      }

      const parentPath = createResolverPath(info.path.prev);

      const errorResolver =
        options?.onError ?? this.options.errorResolver ?? aggregateErrorResolver;

      await Promise.all([
        defaultScopes && verifyScopes(ctx, defaultScopes, this.defaultRule, parentPath),
        verifyScopes(ctx, requiredScopes, this.defaultRule, parentPath),
      ]).catch((err) => resolveError(err, errorResolver));

      if (options?.grants) {
        await saveGrants(root, args, ctx, info, result, options.grants);
      }

      return result;
    };
  }

  private createPreAuthMethod<Result, Root, Context, Args>(type: string, field: string) {
    return (
      scopes: ScopeRules | GetScopeRules<Root, Context, Args>,
      options?: AuthMethodOptions<Result, Root, Context, Args>,
    ) => {
      const getScopes = typeof scopes === 'function' ? scopes : () => scopes;

      const defaultScopes =
        isOperationType(type) && options?.skipDefaults !== true
          ? this.options.defaultScopes?.[type]
          : undefined;

      const middleware = this.createMiddleware(
        getScopes as GetScopeRules<unknown, unknown, unknown>,
        options as AuthMethodOptions<unknown, unknown, unknown, unknown>,
        defaultScopes,
      );
      this.registerMiddleware(type, field, middleware);
    };
  }

  private createPostAuthMethod<Result, Root, Context, Args>(type: string, field: string) {
    return (
      getScopes: GetPostScopeRules<Result, Root, Context, Args>,
      options?: AuthMethodOptions<Result, Root, Context, Args>,
    ) => {
      const defaultScopes =
        isOperationType(type) && options?.skipDefaults !== true
          ? this.options.defaultScopes?.[type]
          : undefined;

      const middleware = this.createPostMiddleware(
        getScopes as GetPostScopeRules<unknown, unknown, unknown, unknown>,
        options as AuthMethodOptions<unknown, unknown, unknown, unknown>,
        defaultScopes,
      );
      this.registerMiddleware(type, field, middleware);
    };
  }

  private registerMiddleware(type: string, field: string, middleware: NativeMiddleware) {
    if (this.authMap[type] == null) {
      this.authMap[type] = {};
    }
    this.authMap[type][field] = middleware;
  }
}
