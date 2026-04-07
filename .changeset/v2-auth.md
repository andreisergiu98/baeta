---
"@baeta/auth": major
---

The auth package was renamed from `@baeta/extension-auth` to `@baeta/auth` and rewritten. The whole authorization model changed:

- Setup is now an **app plugin** (`createAuth(...)` returns `authAppPlugin`) instead of an extension registered via `createExtensions(...)`.
- Scopes and grants are **generic type parameters** on `createAuth`, not a global `declare global { namespace AuthExtension { ... } }` augmentation.
- Rules are built with a typed **`scope` accessor** and **`rule` combinators** (`rule.and` / `rule.or` / `rule.chain` / `rule.race`) instead of plain nested objects with `$or` / `$and` / `$granted` keys.
- Rules are applied by chaining `.$use(auth(...))` on the field/type/module builder instead of the side-effecting `$auth(...)` / `$postAuth(...)` methods. `$postAuth` is now `authAfter`.
- Grants now attach to the **result object's identity** (a `WeakMap`), with support for arrays and custom `target` functions, instead of being keyed by resolver path.
- New per-request scope caching with an optional `cacheKeyMap` for non-serializable scope arguments.

#### 1. Setup: extension -> app plugin

Scopes and grants used to be declared by augmenting a global `AuthExtension` namespace and the extension was created with `authExtension(...)` then registered through `createExtensions(...)`.

**v1:**

```typescript
// src/extensions/auth-extension.ts
import { authExtension } from '@baeta/extension-auth';
import { UnauthenticatedError } from '@baeta/errors';
import type { Context } from '../types/context.ts';

declare global {
  export namespace AuthExtension {
    export interface Scopes {
      isPublic: boolean;
      isLoggedIn: boolean;
      hasAccess: 'guest' | 'user' | 'admin';
    }
    export interface GrantsMap {
      readUserPhotos: boolean;
    }
  }
}

export const authExt = authExtension<Context>(
  async (ctx) => ({
    isPublic: true,
    isLoggedIn: async () => {
      if (ctx.userId == null) throw new UnauthenticatedError();
      return true;
    },
    hasAccess: (access: string) => ['guest', 'user'].includes(access),
  }),
  {
    defaultScopes: {
      Query: { isLoggedIn: true },
      Mutation: { isLoggedIn: true },
      Subscription: { subscribe: { isLoggedIn: true } },
    },
  },
);

// src/extensions/index.ts
import { createExtensions } from '@baeta/core';
import { authExt } from './auth-extension.ts';
export default createExtensions(authExt);
```

**v2:** scopes/grants are type parameters, and `createAuth` returns the building blocks directly. `defaultScopes` is now a callback that hands you the typed `scope` and `rule` builders, and the `Subscription` default is flat (no `subscribe` wrapper).

```typescript
// src/lib/auth.ts
import { createAuth } from '@baeta/auth';
import { UnauthenticatedError } from '@baeta/errors';
import type { Context } from '../types/context.ts';

export type Scopes = {
  isPublic: boolean;
  isLoggedIn: boolean;
  hasAccess: 'guest' | 'user' | 'admin';
};
export type Grants = 'readUserPhotos';

export const { auth, authAfter, authAppPlugin, rule, scope } = createAuth<
  Context,
  Scopes,
  Grants
>(
  async (ctx) => ({
    isPublic: true,
    isLoggedIn: async () => {
      if (ctx.userId == null) throw new UnauthenticatedError();
      return true;
    },
    hasAccess: (access) => ['guest', 'user'].includes(access),
  }),
  {
    defaultScopes: ({ scope }) => ({
      Query: scope.isLoggedIn,
      Mutation: scope.isLoggedIn,
      Subscription: scope.isLoggedIn,
    }),
  },
);
```

Register the returned `authAppPlugin` on the application (extensions are gone):

```typescript
// v2 — src/app.ts
import { createApplication } from '@baeta/core';
import { authAppPlugin } from './lib/auth.ts';
import modules from './modules/index.ts';

const baeta = createApplication({
  modules,
  plugins: [authAppPlugin],
});
```

If a module calls `auth(...)` / `authAfter(...)` but `authAppPlugin` isn't registered, Baeta throws at schema build time.

#### 2. Building rules: typed `scope` + `rule` instead of object literals

Scope rules were plain objects keyed by scope name, with `$and` / `$or` / `$chain` / `$race` and `$granted` as special keys. They're now constructed with the typed `scope` accessor and `rule` combinators.

- `scope.isLoggedIn` — boolean scope (read as a property)
- `scope.hasAccess('admin')` — parameterized scope (called with its typed argument)
- `scope.$granted('readUserPhotos')` — granted-permission check
- `rule.and(...)` / `rule.or(...)` / `rule.chain(...)` / `rule.race(...)` — combinators (two or more rules each)

#### 3. Applying a rule to a resolver: `$use(auth(...))` instead of `$auth(...)`

v1 called the side-effecting `$auth` (pre-resolution) / `$postAuth` (post-resolution) methods. v2 chains `.$use(auth(...))` / `.$use(authAfter(...))` on the builder. `auth` and `authAfter` take the same `(rules, options?)` shape, where `options` still carries `grants` and `skipDefaults`.

**v1:**

```typescript
import { ForbiddenError } from '@baeta/errors';
import { db } from '../../lib/db/prisma.ts';
import { getUserModule } from './typedef.ts';

const { Query, Mutation } = getUserModule();

Query.user.$auth(
  { $or: { isPublic: true, isLoggedIn: true } },
  { skipDefaults: true, grants: ['readUserPhotos'] },
);

// Admin-only
Mutation.createUser.$auth({ hasAccess: 'admin' });

// Dynamic: return true / false / a scope object
Mutation.updateUser.$auth(async (params) => {
  const user = await db.user.findFirst({ where: params.args.where });
  if (user && user.id === params.ctx.userId) return true;
  if (!user) throw new ForbiddenError();
  return { hasAccess: 'admin' };
});
```

**v2:**

```typescript
import { auth, rule, scope } from '../../lib/auth.ts';
import { db } from '../../lib/db/prisma.ts';
import { UserModule } from './typedef.ts';

const { Query, Mutation } = UserModule;

const userQuery = Query.user
  .$use(
    auth(rule.or(scope.isPublic, scope.isLoggedIn), {
      skipDefaults: true,
      grants: ['readUserPhotos'],
    }),
  )
  .resolve(({ args }) => db.user.findFirst({ where: args.where }));

// Admin-only
const createUser = Mutation.createUser
  .$use(auth(scope.hasAccess('admin')))
  .resolve(({ args }) => db.user.create({ data: args.data }));

// Dynamic: return true / false / a ScopeRules value
const updateUser = Mutation.updateUser
  .$use(
    auth(async ({ args, ctx }) => {
      const user = await db.user.findFirst({ where: args.where });
      if (user && user.id === ctx.userId) return true;
      return scope.hasAccess('admin');
    }),
  )
  .resolve(/* ... */);
```

`auth(...)` chains at the type level (`Type.$use(auth(...)).$fields({...})`) and module level (`Module.$use(auth(...)).$schema({...})`) too. For subscriptions, each `.$use(auth(...))` only protects the phase that follows it (subscribe vs resolve).

Post-resolution checks move from `$postAuth` to `authAfter` (it cannot be used on mutations, since it runs after the resolver):

```typescript
// v1
Query.user.$postAuth((params, user) =>
  user.id === params.ctx.userId ? true : { hasAccess: 'admin' },
);

// v2
const userQuery = Query.user
  .$use(
    authAfter((params, user) =>
      user && user.id === params.ctx.userId ? true : scope.hasAccess('admin'),
    ),
  )
  .resolve(({ args }) => db.user.findFirst({ where: args.where }));
```

#### 4. Grants

Grants are attached the same way (via the `grants` option) and consumed via `$granted`, but the internal model changed: v1 keyed grants by the **resolver path**; v2 keys them by the **result object's identity** (a `WeakMap`). For array results the grant attaches to each element, and you can redirect a grant to a nested value with a `GrantConfig` `{ grant, target }`.

**v1 (consume):**

```typescript
User.photos.$auth({ $granted: 'readUserPhotos' });
```

**v2 (consume):**

```typescript
const userPhotosResolver = User.photos
  .$use(auth(scope.$granted('readUserPhotos')))
  .resolve(({ source }) =>
    db.userPhoto.findMany({ where: { userId: source.id } }),
  );
```

Because grants now key off the result object, a child resolver only sees the grant when its `params.source` is the exact object the granting resolver returned. New in v2, you can target a nested object:

```typescript
auth(scope.isLoggedIn, {
  grants: { grant: 'readUserPhotos', target: (entry) => entry.user },
});
```

#### 5. Scope caching (new)

Within a single request each scope-with-argument runs at most once; the cache is per-context. Serializable arguments (primitives, plain objects, arrays of those) are auto-keyed; anything else falls back to reference identity. Provide a `cacheKeyMap` to give non-serializable arguments (class instances, `Date`, etc.) a stable key:

```typescript
createAuth<Context, Scopes, Grants>(loader, {
  cacheKeyMap: {
    canAccessProject: (project) => project.id,
  },
});
```

Error handling is unchanged in shape: `createAuth` still accepts an `errorResolver`, and `aggregateErrorResolver` / `ScopeErrorResolver` are still exported.
