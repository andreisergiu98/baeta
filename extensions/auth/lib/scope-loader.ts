import { Scopes } from './scope';
import { getAuthStore } from './store';

export type ScopesInitializer<Ctx> = (ctx: Ctx) => ScopeMap | Promise<ScopeMap>;

type ScopeLoader<T> = boolean | ((value: T) => boolean | Promise<boolean>);

type ScopeResolver = (value: unknown) => Promise<true>;

type ScopeMap = {
  [K in Scopes]: ScopeLoader<AuthExtension.Scopes[K]>;
};

export type ScopeResolverMap = {
  [k: string]: ScopeResolver;
};

function resolveBoolean(param: boolean) {
  if (param !== true) {
    throw new Error('');
  }
  return true as const;
}

function createScopeResolver(ctx: unknown, name: string, value: ScopeLoader<any>): ScopeResolver {
  const isFunction = typeof value === 'function';

  if (!isFunction) {
    return async () => resolveBoolean(value);
  }

  return async (param: unknown) => {
    const store = await getAuthStore(ctx);
    const key = store.scopeCache.createKey(name, param);
    const cached = await store.scopeCache.getScopeValue(key);

    if (cached != null) {
      return resolveBoolean(cached);
    }

    const promise = value(param);
    store.scopeCache.setScopeValue(key, promise);
    const result = await promise;

    return resolveBoolean(result);
  };
}

export function createScopeResolverMap(ctx: unknown, scopes: ScopeMap): ScopeResolverMap {
  const map: ScopeResolverMap = {};

  for (const [key, value] of Object.entries(scopes)) {
    map[key] = createScopeResolver(ctx, key, value as ScopeLoader<any>);
  }

  return map;
}
