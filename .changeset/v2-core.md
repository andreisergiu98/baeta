---
"@baeta/core": major
---

`@baeta/core` was rewritten around a composable, side-effect-free builder API. The old functional approach — where calling `Query.user(fn)` registered a resolver as a side effect and you imported resolver files for their side effects — is gone. You now build each field with chainable helpers, collect them with `$fields`, and export a module schema with `$schema`. Type generation no longer mutates anything at import time, so a missing resolver is a compile-time error instead of a runtime surprise.

#### Resolver API: side-effect functions -> composable builders

Every field is now declared with chainable helpers off the generated module and assembled with `$fields`/`$schema`. You must explicitly define a resolver for every field; an unresolved field fails type-checking when you pass the field map into `$fields({…})`.

**v1:**

```typescript
// src/modules/user/resolvers.ts
import { getUserModule } from './typedef';

const { Query, User } = getUserModule();

// Calling the field registers the resolver as a side effect
User.name((params) => `${params.root.firstName} ${params.root.lastName}`);

Query.user(async (params) => {
  return db.user.findUnique({ where: params.args.where });
});

// src/modules/user/index.ts
import './resolvers'; // imported for its side effects
import { getUserModule } from './typedef';

export const userModule = getUserModule();
```

**v2:**

```typescript
// src/modules/user/user.type.ts
import { UserModule } from './typedef.ts';

const { User } = UserModule;

export default User.$fields({
  id: User.id.key('id'),
  email: User.email.key('email'),
  name: User.name.resolve(({ source }) => `${source.firstName} ${source.lastName}`),
});

// src/modules/user/user.queries.ts
import { UserModule } from './typedef.ts';

const { Query } = UserModule;

export default Query.$fields({
  user: Query.user.resolve(({ args }) => db.user.findFirst({ where: args.where })),
});

// src/modules/user/index.ts
import { UserModule } from './typedef.ts';
import queryResolver from './user.queries.ts';
import userResolver from './user.type.ts';

export default UserModule.$schema({
  User: userResolver,
  Query: queryResolver,
});
```

Field helpers (pick the strictest one that fits):

- `.key("field")` — read the value straight off the source object
- `.resolve(fn)` — custom resolver; return type must match the schema field
- `.map(fn)` — same shape as `.resolve` but accepts any return type (for chained transforms)
- `.to(fn)` — transform whatever the previous step produced
- `.withDefault(value)` — substitute `value` when the result is `null`/`undefined`
- `.undefinedAsNull()` — map `undefined` to `null` for nullable fields

Helpers compose, e.g. `User.birthDate.key('birthDate').to(toDate)` or `User.friends.map(loadFriends).withDefault([])`.

The resolver/middleware `params` object also renamed `root` to `source` (`{ source, args, ctx, info }`).

#### Middleware API: parameter order flipped, chained before `.resolve()`

Middlewares are attached by chaining `.$use(...)` on a field and finishing with `.resolve()` (or `.map()`), then passing the result into `$fields`. The parameter order changed from `(params, next)` to `(next, params)`.

**v1:**

```typescript
Mutation.updateUser.$use(async ({ args, ctx }, next) => {
  const user = await next();
  ctx.pubsub.publish('user-updated', user);
  return user;
});

Mutation.updateUser((params) => db.user.update(/* … */));
```

**v2:**

```typescript
const updateUser = Mutation.updateUser
  .$use(async (next, { ctx }) => {
    const user = await next();
    if (user) ctx.pubsub.publish('user-updated', user);
    return user;
  })
  .resolve(({ args }) => db.user.update(/* … */));

export default Mutation.$fields({ updateUser });
```

Middlewares can also be applied at the type level (`Type.$use(...).$fields(...)`) and at the module level (`Module.$use(...).$schema(...)`). Execution order is module -> type -> field, outside-in.

#### Module registration and auto-import are now built-in

Baeta auto-generates `src/modules/index.ts`, which collects every module (each module default-exports its schema via `$schema()`). You import that aggregate and hand it to `createApplication`. There is no more manual array of modules and no `@baeta/plugin-autoload`.

**v1:**

```typescript
import { createApplication } from '@baeta/core';
import { userModule } from './modules/user';
import { postModule } from './modules/post';

const baeta = createApplication({
  modules: [userModule, postModule],
});
```

**v2:**

```typescript
import { createApplication } from '@baeta/core';
import modules from './modules/index.ts'; // auto-generated

const baeta = createApplication({ modules });
```

`createApplication` options also changed: the `pruneSchema` option was removed (the schema is now built from explicit per-field resolvers), and two new options were added — `plugins` (app plugins, see below) and `buildSchema` (override how the executable schema is built).

#### Context and custom types moved to a generated `src/modules/types.ts`

The `graphql.contextType` setting in `baeta.ts` is gone. Source types, scalar mappings, the context type, and the `info` type are now configured in one generated file, `src/modules/types.ts`, via the `ObjectTypes`, `Scalars`, `Ctx`, and `Info` exports.

**v1 (`baeta.ts`):**

```typescript
export default defineConfig({
  graphql: {
    schemas: ['src/**/*.gql'],
    contextType: 'src/context#Context',
  },
});
```

**v2 (`src/modules/types.ts`):**

```typescript
import type { GraphQLResolveInfo } from 'graphql';
import type { BaseObjectTypes, BaseScalars } from '../__generated__/utility.ts';
import type { User } from '../lib/db/prisma.ts';
import type { Context } from '../types/context.ts';

export interface Scalars extends BaseScalars {
  DateTime: Date;
}

export interface ObjectTypes extends BaseObjectTypes {
  User: User; // override the source type for the GraphQL `User` type
}

export type Ctx = Context;
export type Info = GraphQLResolveInfo;
```

#### App plugins replace extensions

The `extensions` concept and `createExtensions({...})` were removed entirely. Cross-cutting features (auth, cache, etc.) now ship as **app plugins** that you pass to `createApplication` through the new `plugins` option. A plugin is created by its feature package (for example `createAuth(...)` returns an `authAppPlugin`) and registered once on the application — it mutates the relevant modules at build time, and the app throws if a module relies on a plugin that was not registered.

**v1:**

```typescript
// src/modules/extensions.ts — discovered via baeta.ts
import { createExtensions } from '@baeta/core';
import { authExt } from './auth-extension.ts';
import { cacheExt } from './cache-extension.ts';

export default createExtensions(authExt, cacheExt);
```

**v2:**

```typescript
// src/lib/auth.ts
import { createAuth } from '@baeta/auth';

export const { auth, authAppPlugin, rule, scope } = createAuth<Context, Scopes, Grants>(/* … */);

// src/app.ts
import { createApplication } from '@baeta/core';
import { authAppPlugin } from './lib/auth.ts';
import modules from './modules/index.ts';

const baeta = createApplication({
  modules,
  plugins: [authAppPlugin],
});
```

#### Removed packages relevant to core users

- `@baeta/compiler` — modern runtimes (Node, Bun, Deno) execute TypeScript natively, so there is no separate compile/build step. `baeta build` is gone; run your TS entry point directly or use your own bundler.
- `@baeta/plugin-autoload` — module auto-importing is now built in via the generated `src/modules/index.ts`.

#### Other notes

- `createContextStoreWithLoader` was added alongside `createContextStore` for context stores that resolve a value lazily.
