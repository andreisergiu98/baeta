import { isGrantedRule, isLogicRule, LogicRule } from './rule';
import { getAuthStore } from './store';

export type Scopes = keyof AuthExtension.Scopes;

type RequireScope<T> = T extends boolean ? true : T;

export type RequiredScopes = {
  [K in Scopes]?: RequireScope<AuthExtension.Scopes[K]>;
} & {
  [r in LogicRule]?: RequiredScopes;
} & {
  $granted?: string;
};

function getResolver(ctx: unknown, scopes: RequiredScopes, key: string, parentPath: string) {
  if (isLogicRule(key)) {
    return async () => resolveScopes(ctx, scopes[key], key, parentPath);
  }

  if (isGrantedRule(key)) {
    return async () => resolveGrant(ctx, scopes[key], parentPath);
  }

  return async () => {
    const value = scopes[key as Scopes];
    const store = await getAuthStore(ctx);
    const resolve = store.scopes[key];
    return resolve(value);
  };
}

async function resolveGrant(
  ctx: unknown,
  grant: string | undefined,
  parentPath: string
): Promise<true> {
  if (grant == null) {
    throw new Error();
  }

  const store = await getAuthStore(ctx);
  const granted = store.grantCache.getGrants(parentPath);

  if (granted?.includes(grant)) {
    return true;
  }

  throw new Error('');
}

async function resolveChainScopes(
  ctx: unknown,
  scopes: RequiredScopes,
  keys: string[],
  parentPath: string
): Promise<true> {
  for (const key of keys) {
    const resolve = getResolver(ctx, scopes, key, parentPath);
    await resolve();
  }

  return true;
}

async function resolveRaceScopes(
  ctx: unknown,
  scopes: RequiredScopes,
  keys: string[],
  parentPath: string
): Promise<true> {
  for (const key of keys) {
    const resolve = getResolver(ctx, scopes, key, parentPath);
    const result = await resolve().catch((err) => err);

    if (result === true) {
      return true;
    }
  }

  throw new Error('');
}

async function resolveOrScopes(
  ctx: unknown,
  scopes: RequiredScopes,
  keys: string[],
  parentPath: string
): Promise<true> {
  const promises: Promise<true>[] = [];

  for (const key of keys) {
    const resolve = getResolver(ctx, scopes, key, parentPath);
    promises.push(resolve());
  }

  return Promise.any(promises);
}

async function resolveAndScopes(
  ctx: unknown,
  scopes: RequiredScopes,
  keys: string[],
  parentPath: string
): Promise<true> {
  const promises: Promise<true>[] = [];

  for (const key of keys) {
    const resolve = getResolver(ctx, scopes, key, parentPath);
    promises.push(resolve());
  }

  return Promise.all(promises).then(() => true);
}

export async function resolveScopes(
  ctx: unknown,
  scopes: RequiredScopes | undefined,
  rule: LogicRule = '$or',
  parentPath: string
): Promise<true> {
  if (scopes == null) {
    throw new Error('');
  }

  const keys = Object.keys(scopes);

  if (keys.length === 0) {
    throw new Error('');
  }

  if (rule === '$chain') {
    return resolveChainScopes(ctx, scopes, keys, parentPath);
  }

  if (rule === '$race') {
    return resolveRaceScopes(ctx, scopes, keys, parentPath);
  }

  if (rule === '$or') {
    return resolveOrScopes(ctx, scopes, keys, parentPath);
  }

  if (rule === '$and') {
    return resolveAndScopes(ctx, scopes, keys, parentPath);
  }

  throw new Error("This line shouldn't be reached.");
}
