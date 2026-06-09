# @baeta/core

## 2.0.0-next.16

### Major Changes

- `@baeta/core` was rewritten around a composable, side-effect-free builder API. The old functional approach — where calling `Query.user(fn)` registered a resolver as a side effect and you imported resolver files for their side effects — is gone. You now build each field with chainable helpers, collect them with `$fields`, and export a module schema with `$schema`. Type generation no longer mutates anything at import time, so a missing resolver is a compile-time error instead of a runtime surprise. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  #### Resolver API: side-effect functions -> composable builders

  Every field is now declared with chainable helpers off the generated module and assembled with `$fields`/`$schema`. You must explicitly define a resolver for every field; an unresolved field fails type-checking when you pass the field map into `$fields({…})`.

  **v1:**

  ```typescript
  // src/modules/user/resolvers.ts
  import { getUserModule } from "./typedef";

  const { Query, User } = getUserModule();

  // Calling the field registers the resolver as a side effect
  User.name((params) => `${params.root.firstName} ${params.root.lastName}`);

  Query.user(async (params) => {
    return db.user.findUnique({ where: params.args.where });
  });

  // src/modules/user/index.ts
  import "./resolvers"; // imported for its side effects
  import { getUserModule } from "./typedef";

  export const userModule = getUserModule();
  ```

  **v2:**

  ```typescript
  // src/modules/user/user.type.ts
  import { UserModule } from "./typedef.ts";

  const { User } = UserModule;

  export default User.$fields({
    id: User.id.key("id"),
    email: User.email.key("email"),
    name: User.name.resolve(
      ({ source }) => `${source.firstName} ${source.lastName}`
    ),
  });

  // src/modules/user/user.queries.ts
  import { UserModule } from "./typedef.ts";

  const { Query } = UserModule;

  export default Query.$fields({
    user: Query.user.resolve(({ args }) =>
      db.user.findFirst({ where: args.where })
    ),
  });

  // src/modules/user/index.ts
  import { UserModule } from "./typedef.ts";
  import queryResolver from "./user.queries.ts";
  import userResolver from "./user.type.ts";

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
    ctx.pubsub.publish("user-updated", user);
    return user;
  });

  Mutation.updateUser((params) => db.user.update(/* … */));
  ```

  **v2:**

  ```typescript
  const updateUser = Mutation.updateUser
    .$use(async (next, { ctx }) => {
      const user = await next();
      if (user) ctx.pubsub.publish("user-updated", user);
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
  import { createApplication } from "@baeta/core";
  import { userModule } from "./modules/user";
  import { postModule } from "./modules/post";

  const baeta = createApplication({
    modules: [userModule, postModule],
  });
  ```

  **v2:**

  ```typescript
  import { createApplication } from "@baeta/core";
  import modules from "./modules/index.ts"; // auto-generated

  const baeta = createApplication({ modules });
  ```

  `createApplication` options also changed: the `pruneSchema` option was removed (the schema is now built from explicit per-field resolvers), and two new options were added — `plugins` (app plugins, see below) and `buildSchema` (override how the executable schema is built).

  #### Context and custom types moved to a generated `src/modules/types.ts`

  The `graphql.contextType` setting in `baeta.ts` is gone. Source types, scalar mappings, the context type, and the `info` type are now configured in one generated file, `src/modules/types.ts`, via the `ObjectTypes`, `Scalars`, `Ctx`, and `Info` exports.

  **v1 (`baeta.ts`):**

  ```typescript
  export default defineConfig({
    graphql: {
      schemas: ["src/**/*.gql"],
      contextType: "src/context#Context",
    },
  });
  ```

  **v2 (`src/modules/types.ts`):**

  ```typescript
  import type { GraphQLResolveInfo } from "graphql";
  import type {
    BaseObjectTypes,
    BaseScalars,
  } from "../__generated__/utility.ts";
  import type { User } from "../lib/db/prisma.ts";
  import type { Context } from "../types/context.ts";

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
  import { createExtensions } from "@baeta/core";
  import { authExt } from "./auth-extension.ts";
  import { cacheExt } from "./cache-extension.ts";

  export default createExtensions(authExt, cacheExt);
  ```

  **v2:**

  ```typescript
  // src/lib/auth.ts
  import { createAuth } from "@baeta/auth";

  export const { auth, authAppPlugin, rule, scope } = createAuth<
    Context,
    Scopes,
    Grants
  >(/* … */);

  // src/app.ts
  import { createApplication } from "@baeta/core";
  import { authAppPlugin } from "./lib/auth.ts";
  import modules from "./modules/index.ts";

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

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/errors@2.0.0-next.16

## 1.0.11

### Patch Changes

- [`7f3d5ff`](https://github.com/andreisergiu98/baeta/commit/7f3d5ff7cd0871e2f017c86dd29ac7bc02647154) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Prevent uncaught promise rejection if store loader throws

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

- Updated dependencies [[`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3), [`b5b53d3`](https://github.com/andreisergiu98/baeta/commit/b5b53d35d950b2b18014b02d472c401ed4721334)]:
  - @baeta/errors@1.0.9

## 1.0.8

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- [#165](https://github.com/andreisergiu98/baeta/pull/165) [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - mark as stable

- Updated dependencies [[`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228), [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc)]:
  - @baeta/errors@1.0.8

## 0.1.5

### Patch Changes

- [`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add readme

- Updated dependencies [[`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820)]:
  - @baeta/errors@0.1.4

## 0.1.4

### Patch Changes

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.

- [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise es target to 2024

- Updated dependencies [[`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72), [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857)]:
  - @baeta/errors@0.1.3

## 0.1.3

### Patch Changes

- [`c8dea0c`](https://github.com/andreisergiu98/baeta/commit/c8dea0c6a7824039cf4de13a8d2c0b1682ea3d02) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - maintain order of prepended middlewares

## 0.1.2

### Patch Changes

- [#170](https://github.com/andreisergiu98/baeta/pull/170) [`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [`cf9f094`](https://github.com/andreisergiu98/baeta/commit/cf9f09468f84d99b069eb0f55e1fc207e2a41dd8) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - remove unused imports

- Updated dependencies [[`d77cd8a`](https://github.com/andreisergiu98/baeta/commit/d77cd8a1810fdf72cfbbb08d05c207bbc893c822)]:
  - @baeta/errors@0.1.2

## 0.1.1

### Patch Changes

- [`594e47e`](https://github.com/andreisergiu98/baeta/commit/594e47e9ddb0ba7fdb975c48cd8df3af130b5c9e) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - prevent prototype pollution through object lens

- [#157](https://github.com/andreisergiu98/baeta/pull/157) [`b9638eb`](https://github.com/andreisergiu98/baeta/commit/b9638eb9fb713507efa9821b4f04cc7896a997b1) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - stricter linting, better type safety

- [`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix exports order in package.json

- [#161](https://github.com/andreisergiu98/baeta/pull/161) [`cca37dd`](https://github.com/andreisergiu98/baeta/commit/cca37dd7135a2852f1f6e287c46911306bdc8da0) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [`44a7975`](https://github.com/andreisergiu98/baeta/commit/44a7975a65a1903d2e1aec27d55fed23f193187b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - make subscription resolver always required

- [#107](https://github.com/andreisergiu98/baeta/pull/107) [`b6e87ce`](https://github.com/andreisergiu98/baeta/commit/b6e87ce347406164a9c0fca49172f1d5d4f50f74) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add type hashes

- Updated dependencies [[`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a), [`cca37dd`](https://github.com/andreisergiu98/baeta/commit/cca37dd7135a2852f1f6e287c46911306bdc8da0)]:
  - @baeta/errors@0.1.1

## 0.1.0

### Minor Changes

- [#156](https://github.com/andreisergiu98/baeta/pull/156) [`01f3c20`](https://github.com/andreisergiu98/baeta/commit/01f3c20365539fad6e8a8694c59a8e86c95784e8) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise engine requirement to node >= 22

### Patch Changes

- [#152](https://github.com/andreisergiu98/baeta/pull/152) [`d538c79`](https://github.com/andreisergiu98/baeta/commit/d538c7905e6ba96d9f294e2d528f9252e83acbe7) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update formatter

- [`4ee6550`](https://github.com/andreisergiu98/baeta/commit/4ee65501cbd7ca8b679b72d034d50c50dd5b2ca1) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - allow extensions to access module

- [#145](https://github.com/andreisergiu98/baeta/pull/145) [`08428d4`](https://github.com/andreisergiu98/baeta/commit/08428d4f03b79cab9c116ff7b3a3cf9a0b2620f2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`01f3c20`](https://github.com/andreisergiu98/baeta/commit/01f3c20365539fad6e8a8694c59a8e86c95784e8), [`d538c79`](https://github.com/andreisergiu98/baeta/commit/d538c7905e6ba96d9f294e2d528f9252e83acbe7), [`08428d4`](https://github.com/andreisergiu98/baeta/commit/08428d4f03b79cab9c116ff7b3a3cf9a0b2620f2)]:
  - @baeta/errors@0.1.0

## 0.0.36

### Patch Changes

- [#139](https://github.com/andreisergiu98/baeta/pull/139) [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#139](https://github.com/andreisergiu98/baeta/pull/139) [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update typescript

- Updated dependencies [[`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4), [`00dbc8f`](https://github.com/andreisergiu98/baeta/commit/00dbc8f35839aaa6524a6c0125ff38a766e45be4)]:
  - @baeta/errors@0.0.7

## 0.0.35

### Patch Changes

- [#133](https://github.com/andreisergiu98/baeta/pull/133) [`325f623`](https://github.com/andreisergiu98/baeta/commit/325f623caa9aab2d6ae45258f214be1d7518396a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add support for type resolver for interfaces and unions

## 0.0.34

### Patch Changes

- [`7313d92`](https://github.com/andreisergiu98/baeta/commit/7313d92b06e164663e4c6164a79f7c1ba4762d7e) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - allow promise asynciterator on subscribe

## 0.0.33

### Patch Changes

- [#128](https://github.com/andreisergiu98/baeta/pull/128) [`534917a`](https://github.com/andreisergiu98/baeta/commit/534917a18e7ed5d788a90a0335a5370d6af8f4a4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`534917a`](https://github.com/andreisergiu98/baeta/commit/534917a18e7ed5d788a90a0335a5370d6af8f4a4)]:
  - @baeta/errors@0.0.6

## 0.0.32

### Patch Changes

- [#121](https://github.com/andreisergiu98/baeta/pull/121) [`ceae50d`](https://github.com/andreisergiu98/baeta/commit/ceae50d88e4e59b22c603637620f4fc6b28b2454) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update Node to v20

- [`5ab9740`](https://github.com/andreisergiu98/baeta/commit/5ab97405bbdeac3d9baa59cfe9502cdbff101163) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix return type of store->get

- [#51](https://github.com/andreisergiu98/baeta/pull/51) [`d94ee47`](https://github.com/andreisergiu98/baeta/commit/d94ee47bc485c541ff011290c4ac6ef0c145c83f) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - remove subscription filter option

- Updated dependencies [[`ceae50d`](https://github.com/andreisergiu98/baeta/commit/ceae50d88e4e59b22c603637620f4fc6b28b2454)]:
  - @baeta/errors@0.0.5

## 0.0.31

### Patch Changes

- [#119](https://github.com/andreisergiu98/baeta/pull/119) [`643a2eb`](https://github.com/andreisergiu98/baeta/commit/643a2eb17c2789cd25361ddeede149a0e459e68a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`643a2eb`](https://github.com/andreisergiu98/baeta/commit/643a2eb17c2789cd25361ddeede149a0e459e68a)]:
  - @baeta/errors@0.0.4

## 0.0.30

### Patch Changes

- [#102](https://github.com/andreisergiu98/baeta/pull/102) [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#102](https://github.com/andreisergiu98/baeta/pull/102) [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies and builder

- [#106](https://github.com/andreisergiu98/baeta/pull/106) [`01788ab`](https://github.com/andreisergiu98/baeta/commit/01788ab04ff6956b2b50186af5bec8ed7ebbe76e) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add compatibility with windows

- Updated dependencies [[`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c), [`4b88400`](https://github.com/andreisergiu98/baeta/commit/4b88400a314c341e5d75d161c83afa582cea16d3), [`c9e37fd`](https://github.com/andreisergiu98/baeta/commit/c9e37fd1d64588fd8eb63facd7eda08c0009470c), [`01788ab`](https://github.com/andreisergiu98/baeta/commit/01788ab04ff6956b2b50186af5bec8ed7ebbe76e)]:
  - @baeta/errors@0.0.3

## 0.0.29

### Patch Changes

- [#69](https://github.com/andreisergiu98/baeta/pull/69) [`3cdd9b3`](https://github.com/andreisergiu98/baeta/commit/3cdd9b30369d21179769a4b8d5f76e326ae6db37) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#91](https://github.com/andreisergiu98/baeta/pull/91) [`e0944f6`](https://github.com/andreisergiu98/baeta/commit/e0944f6320e6cf2f0a3d2c9f51edd282bdce0546) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`3cdd9b3`](https://github.com/andreisergiu98/baeta/commit/3cdd9b30369d21179769a4b8d5f76e326ae6db37), [`e0944f6`](https://github.com/andreisergiu98/baeta/commit/e0944f6320e6cf2f0a3d2c9f51edd282bdce0546)]:
  - @baeta/errors@0.0.2

## 0.0.28

### Patch Changes

- [#62](https://github.com/andreisergiu98/baeta/pull/62) [`a197f81`](https://github.com/andreisergiu98/baeta/commit/a197f8136b12010ec554123dbfa23574c2c2e0f3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix middleware composition with null resolver

## 0.0.27

### Patch Changes

- [#52](https://github.com/andreisergiu98/baeta/pull/52) [`d88cca7`](https://github.com/andreisergiu98/baeta/commit/d88cca7c271ce99e6296396e2ada5e3a905f886a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix lazy loading of ctx store

- [#52](https://github.com/andreisergiu98/baeta/pull/52) [`d88cca7`](https://github.com/andreisergiu98/baeta/commit/d88cca7c271ce99e6296396e2ada5e3a905f886a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#52](https://github.com/andreisergiu98/baeta/pull/52) [`d88cca7`](https://github.com/andreisergiu98/baeta/commit/d88cca7c271ce99e6296396e2ada5e3a905f886a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - simplify middleware glob

## 0.0.26

### Patch Changes

- [#43](https://github.com/andreisergiu98/baeta/pull/43) [`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix compatibility with non node runtimes

- [#47](https://github.com/andreisergiu98/baeta/pull/47) [`eb7096d`](https://github.com/andreisergiu98/baeta/commit/eb7096d42a53b17bae0a8365eccb795e7ded02e9) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- [#43](https://github.com/andreisergiu98/baeta/pull/43) [`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - bump dependencies

- Updated dependencies [[`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2), [`eb7096d`](https://github.com/andreisergiu98/baeta/commit/eb7096d42a53b17bae0a8365eccb795e7ded02e9), [`670501b`](https://github.com/andreisergiu98/baeta/commit/670501b2b1cfb1126be3421293b8ccd597c6ffc2)]:
  - @baeta/errors@0.0.1

## 0.0.25

### Patch Changes

- [#31](https://github.com/andreisergiu98/baeta/pull/31) [`f122a1e`](https://github.com/andreisergiu98/baeta/commit/f122a1e2970d915ce3c24931d4309db26665c739) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add context store utility

## 0.0.24

### Patch Changes

- [`d1190c1`](https://github.com/andreisergiu98/baeta/commit/d1190c10e3c259c73ddeeb73a4bd312b22bf2ea4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - create cli sdk
  release prisma plugin
  update dependencies
  refactor generator plugins

## 0.0.23

### Patch Changes

- [`02936ae`](https://github.com/andreisergiu98/baeta/commit/02936aeb606c75a2a79b6ce4524851c6c62afb82) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - bump packages

## 0.0.22

### Patch Changes

- [`c034d77`](https://github.com/andreisergiu98/baeta/commit/c034d77a1e3c75871ed768ab8bf3594635b02c0a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - drop support for baeta.ts

- [`11031eb`](https://github.com/andreisergiu98/baeta/commit/11031ebf71808e1c20e8f8e98259359ceb50cd77) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add a more reliable publishing method

## 0.0.21

### Patch Changes

- [`dfaf0dc`](https://github.com/andreisergiu98/baeta/commit/dfaf0dc108244b0ada332ab978aa7f39fbfe7e7d) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add generator support for runtime extensions

## 0.0.20

### Patch Changes

- [`528794c`](https://github.com/andreisergiu98/baeta/commit/528794cea68558efb0e468f4812c0e992a36345b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - republish core

## 0.0.19

### Patch Changes

- [`a4a64a3`](https://github.com/andreisergiu98/baeta/commit/a4a64a35a75e66ca4077a86a9fd5d3ffad481b55) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix broken publishing

## 0.0.18

### Patch Changes

- [#15](https://github.com/andreisergiu98/baeta/pull/15) [`af4859a`](https://github.com/andreisergiu98/baeta/commit/af4859ae2aee4768d5710189d094059d50647e59) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - support for runtime extensions part 1

## 0.0.17

### Patch Changes

- [`f2429cd`](https://github.com/andreisergiu98/baeta/commit/f2429cdec7fe4522f7df0a90d582a06fcf792ef7) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix build, remove turborepo

## 0.0.16

### Patch Changes

- [`a262a56`](https://github.com/andreisergiu98/baeta/commit/a262a56db0f5b08a9b256e0a8402e60cd1be7b51) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix type declarations

## 0.0.15

### Patch Changes

- [`f87d828`](https://github.com/andreisergiu98/baeta/commit/f87d828a87a6a12326a3bfcb5846b4390431f0c4) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - change export dir

## 0.0.14

### Patch Changes

- [#7](https://github.com/andreisergiu98/baeta/pull/7) [`913c1cf`](https://github.com/andreisergiu98/baeta/commit/913c1cf803a1a1058729d9a6eabcd0d9b1208321) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Drop graphql-modules
  Fix circular dependencies
  Switch to rome and pnpm

## 0.0.13

### Patch Changes

- [`9358a06`](https://github.com/andreisergiu98/baeta/commit/9358a06f23665d6f920538cf1ee636b489d93b3e) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix changeset release

## 0.0.12

### Patch Changes

- [`ffa2fe8`](https://github.com/andreisergiu98/baeta/commit/ffa2fe83df6798375252a01ad14bbd37ffd07d50) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add repository information to package.json
