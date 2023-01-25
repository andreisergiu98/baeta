import { MiddlewareParams } from '@baeta/core';
import { Extension, NativeMiddleware, ResolverMapper } from '@baeta/core/sdk';
import { GraphQLResolveInfo } from 'graphql';
import { createResolverPath } from '../utils/resolver';
import { LogicRule } from './rule';
import { RequiredScopes, resolveScopes } from './scope';
import { ScopesInitializer } from './scope-loader';
import { getAuthStore } from './store';
import { loadAuthStore } from './store-loader';

declare global {
  export namespace BaetaExtensions {
    interface RequireAuthOptions {
      grants?: string | string[];
    }

    export interface ResolverExtensions<Result, Root, Context, Args> {
      $auth: (
        scopes: RequiredScopes | GetPreScopes<Root, Context, Args>,
        options?: RequireAuthOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostScopes<Result, Root, Context, Args>,
        options?: RequireAuthOptions
      ) => void;
    }

    export interface TypeExtensions<Root, Context> {
      $auth: (
        scopes: RequiredScopes | GetPreScopes<Root, Context, unknown>,
        options?: RequireAuthOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostScopes<unknown, Root, Context, unknown>,
        options?: RequireAuthOptions
      ) => void;
    }

    export interface SubscriptionSubscribeExtensions<Root, Context, Args> {
      $auth: (
        scopes: RequiredScopes | GetPreScopes<Root, Context, Args>,
        options?: RequireAuthOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostScopes<unknown, Root, Context, Args>,
        options?: RequireAuthOptions
      ) => void;
    }

    export interface SubscriptionResolveExtensions<Result, Root, Context, Args> {
      $auth: (
        scopes: RequiredScopes | GetPreScopes<Root, Context, Args>,
        options?: RequireAuthOptions
      ) => void;
      $postAuth: (
        getScopes: GetPostScopes<Result, Root, Context, Args>,
        options?: RequireAuthOptions
      ) => void;
    }

    export interface ModuleExtensions {}
  }

  export namespace AuthExtension {
    export interface Scopes {}
  }
}

export type Scopes = keyof AuthExtension.Scopes;

export interface AuthOptions {
  defaultScopes?: AuthExtension.Scopes;
}

type GetPreScopes<Root, Context, Args> = (
  params: MiddlewareParams<Root, Context, Args>
) => RequiredScopes | Promise<RequiredScopes> | true | Promise<true>;

type GetPostScopes<Result, Root, Context, Args> = (
  params: MiddlewareParams<Root, Context, Args>,
  result: Result
) => RequiredScopes | Promise<RequiredScopes> | true | Promise<true>;

export class AuthExtension<T> extends Extension {
  private defaultRule: LogicRule = '$or';
  private authMap: Record<string, Record<string, undefined | NativeMiddleware>> = {};

  constructor(readonly loadScopes: ScopesInitializer<T>, readonly options: AuthOptions = {}) {
    super();
  }

  getModuleExtensions = () => {
    return {};
  };

  getTypeExtensions = <Root, Context>(
    type: string
  ): BaetaExtensions.TypeExtensions<Root, Context> => {
    return {
      $auth: this.createPreAuthMethod(type, '*'),
      $postAuth: this.createPostAuthMethod(type, '*'),
    };
  };

  getResolverExtensions = <Result, Root, Context, Args>(
    type: string,
    field: string
  ): BaetaExtensions.ResolverExtensions<Result, Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod(type, field),
      $postAuth: this.createPostAuthMethod(type, field),
    };
  };

  getSubscriptionSubscribeExtensions = <Root, Context, Args>(
    field: string
  ): BaetaExtensions.SubscriptionSubscribeExtensions<Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod('Subscription', `${field}.subscribe`),
      $postAuth: this.createPostAuthMethod('Subscription', `${field}.subscribe`),
    };
  };

  getSubscriptionResolveExtensions = <Result, Root, Context, Args>(
    field: string
  ): BaetaExtensions.SubscriptionResolveExtensions<Result, Root, Context, Args> => {
    return {
      $auth: this.createPreAuthMethod('Subscription', `${field}.resolve`),
      $postAuth: this.createPostAuthMethod('Subscription', `${field}.resolve`),
    };
  };

  build = (mapper: ResolverMapper) => {
    const authTypes = Object.keys(this.authMap);

    for (const type of authTypes) {
      const fields = Object.keys(this.authMap[type]);

      for (const field of fields) {
        const middleware = this.authMap[type][field];

        if (middleware == null) {
          continue;
        }

        if (field !== '*') {
          mapper.addMiddleware(type, field, middleware, true);
          continue;
        }

        const remainingFields = mapper.typeFields[type].filter((field) => field.includes(field));

        for (const remainingField of remainingFields) {
          mapper.addMiddleware(type, remainingField, middleware, true);
        }
      }
    }
  };

  private async saveGrants(
    ctx: unknown,
    info: GraphQLResolveInfo,
    grants: undefined | string | string[]
  ) {
    if (!grants) {
      return;
    }

    const store = await getAuthStore(ctx);
    store.grantCache.setGrants(createResolverPath(info.path), grants);
  }

  private createMiddleware(
    getScopes: GetPreScopes<unknown, unknown, unknown>,
    options?: BaetaExtensions.RequireAuthOptions
  ): NativeMiddleware {
    return (next) => async (root, args, ctx, info) => {
      loadAuthStore(ctx as T, this.loadScopes);

      const requiredScopes = await getScopes({ root, args, ctx, info });

      if (requiredScopes === true) {
        return next(root, args, ctx, info);
      }

      const parentPath = createResolverPath(info.path.prev);

      await resolveScopes(ctx, requiredScopes, this.defaultRule, parentPath);
      await this.saveGrants(ctx, info, options?.grants);

      return next(root, args, ctx, info);
    };
  }

  private createPostMiddleware(
    getScopes: GetPostScopes<unknown, unknown, unknown, unknown>,
    options?: BaetaExtensions.RequireAuthOptions
  ): NativeMiddleware {
    return (next) => async (root, args, ctx, info) => {
      loadAuthStore(ctx as T, this.loadScopes);

      const result = await next(root, args, ctx, info);
      const requiredScopes = await getScopes({ root, args, ctx, info }, result);

      if (requiredScopes === true) {
        return result;
      }

      const parentPath = createResolverPath(info.path.prev);

      await resolveScopes(ctx, requiredScopes, this.defaultRule, parentPath);
      await this.saveGrants(ctx, info, options?.grants);

      return result;
    };
  }

  private createPreAuthMethod<Result, Root, Context, Args>(type: string, field: string) {
    return (
      scopes: RequiredScopes | GetPreScopes<Root, Context, Args>,
      options?: BaetaExtensions.RequireAuthOptions
    ) => {
      const getScopes = typeof scopes === 'function' ? scopes : () => scopes;
      const middleware = this.createMiddleware(
        getScopes as GetPreScopes<unknown, unknown, unknown>,
        options
      );
      this.registerMiddleware(type, field, middleware);
    };
  }

  private createPostAuthMethod<Result, Root, Context, Args>(type: string, field: string) {
    return (
      getScopes: GetPostScopes<Result, Root, Context, Args>,
      options?: BaetaExtensions.RequireAuthOptions
    ) => {
      const middleware = this.createPostMiddleware(
        getScopes as GetPostScopes<unknown, unknown, unknown, unknown>,
        options
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

export function authExtension<Ctx>(loadScopes: ScopesInitializer<Ctx>, options: AuthOptions = {}) {
  return () => new AuthExtension(loadScopes, options);
}
