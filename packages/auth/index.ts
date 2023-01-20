import { Middleware, MiddlewareParams } from '@baeta/core';
import { Extension } from '@baeta/core/sdk';

export interface AuthOptions {
  defaultScopes?: AuthExtension.Scopes;
}

declare global {
  export namespace BaetaExtensions {
    export interface ResolverExtensions<Result, Root, Context, Args> {}

    export interface TypeExtensions<Root, Context> {}

    export interface SubscriptionSubscribeExtensions<Root, Context, Args> {}

    export interface SubscriptionResolveExtensions<Result, Root, Context, Args> {}

    export interface ModuleExtensions {}
  }
}

declare global {
  export namespace AuthExtension {
    export interface Scopes {
      test: boolean;
      p: boolean;
    }
  }
}

export type Scopes = keyof AuthExtension.Scopes;

type ScopeResolver<T> = boolean | ((value: T) => boolean | Promise<boolean>);

type InitializedScopes = {
  [K in Scopes]: ScopeResolver<AuthExtension.Scopes[K]>;
};

type ScopesInitializer<Ctx> = (ctx: Ctx) => InitializedScopes | Promise<InitializedScopes>;

export function createAuthExtension<Ctx>(init: ScopesInitializer<Ctx>, options?: AuthOptions) {}

interface AuthStore {
  scopes: InitializedScopes;
  cache: Record<string, boolean>;
}

const authStoreKey = Symbol('getAuthStore');

type GetPreScopes = (
  params: MiddlewareParams<unknown, unknown, unknown>
) => Promise<Record<string, unknown>>;

type GetPostScopes = (
  params: MiddlewareParams<unknown, unknown, unknown>,
  result: unknown
) => Promise<Record<string, unknown>>;

const logicKeys = ['$and', '$or', '$chain', '$race'] as const;
type LogicRule = (typeof logicKeys)[number];

type CollectedScopes = {
  [r in LogicRule]: CollectedScopes;
} & {
  [k: string]: () => Promise<boolean>;
};

class AuthExtension extends Extension {
  constructor(readonly loadScopes: ScopesInitializer<unknown>, readonly options: AuthOptions = {}) {
    super();
  }

  forgeMiddleware(
    getRequiredScopes?: GetPreScopes
  ): Middleware<unknown, unknown, unknown, unknown> {
    return async (params, next) => {
      const [store, requiredScopes] = await Promise.all([
        this.getAuthStore(params.ctx),
        getRequiredScopes?.(params),
      ]);

      return next();
    };
  }

  forgePostMiddleware(
    getRequiredScopes?: GetPostScopes
  ): Middleware<unknown, unknown, unknown, unknown> {
    return async (params, next) => {
      const [store, result] = await Promise.all([this.getAuthStore(params.ctx), next()]);
      const requiredScopes = await getRequiredScopes?.(params, result);

      return result;
    };
  }

  async getAuthStore(_ctx: unknown) {
    const ctx = _ctx as Record<symbol, unknown>;
    if (!ctx[authStoreKey]) {
      ctx[authStoreKey] = this.loadAuthStore(ctx);
    }
    return ctx[authStoreKey] as Promise<AuthStore>;
  }

  async loadAuthStore(ctx: unknown): Promise<AuthStore> {
    return {
      scopes: await this.loadScopes(ctx),
      cache: {},
    };
  }

  async normalizeScope(ctx: unknown) {
    const scopes = await this.loadScopes(ctx);
    const remap: Record<string, (v: boolean) => boolean | Promise<boolean>> = {};

    for (const [key, value] of Object.entries(scopes)) {
      if (typeof value === 'function') {
        remap[key] = value;
      } else {
        remap[key] = () => value;
      }
    }

    return remap;
  }

  async resolveScopes(scopes: CollectedScopes, rule: LogicRule = '$or') {
    const isChain = rule === '$chain';
    const isRace = rule === '$race';

    const keys = Object.keys(scopes);
    const promises: Promise<boolean>[] = [];

    for (const key of keys) {
      const resolve = this.getResolver(scopes, key);

      if (isChain) {
        const result = await resolve();

        if (result) {
          continue;
        }

        return false;
      }

      if (isRace) {
        const result = await resolve();

        if (!result) {
          continue;
        }

        return true;
      }

      promises.push(resolve());
    }

    if (isChain) {
      return true;
    }

    if (isRace) {
      return false;
    }

    if (rule === '$or') {
      return Promise.any(promises);
    }

    if (rule === '$and') {
      return Promise.all(promises).then(() => true);
    }

    return false;
  }

  getResolver(scopes: CollectedScopes, key: string) {
    const logicKey = logicKeys.find((logicKey) => logicKey === key);

    if (logicKey) {
      return () => this.resolveScopes(scopes[logicKey], logicKey);
    }

    return scopes[key];
  }

  getModuleExtensions() {
    return {};
  }

  getTypeExtensions<Result, Context>(type: string) {
    return {};
  }

  getResolverExtensions<Result, Root, Context, Args>(type: string, field: string) {
    return {};
  }

  getSubscriptionSubscribeExtensions<Iterator, Root, Context, Args>(field: string) {
    return {};
  }

  getSubscriptionResolveExtensions<Result, Root, Context, Args>(field: string) {
    return {};
  }
}

createAuthExtension(async (ctx) => {
  return {
    p: true,
    test: async () => {
      return true;
    },
  };
});
