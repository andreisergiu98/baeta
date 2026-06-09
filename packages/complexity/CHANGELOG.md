# @baeta/complexity

## 2.0.0-next.16

### Major Changes

- The complexity extension has been renamed to `@baeta/complexity` and rebuilt around the v2 app-plugin and builder APIs. The `complexityExtension()` factory and the magic `.$complexity()` resolver method are gone. You now call `createComplexity()` to get back two things — a `complexity(...)` rule helper applied via the generic `.$use(...)` builder method, and a `complexityAppPlugin` registered on `createApplication`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  The scoring options (`defaultComplexity`, `defaultListMultiplier`, `limit`, `complexityError`) and the per-field settings shape (`{ complexity, multiplier }`, or `false` to disable) are unchanged.

  **Setup**

  v1 — an extension factory, registered through the extensions API:

  ```typescript
  // src/modules/extensions.ts
  import { complexityExtension } from "@baeta/extension-complexity";
  import type { Context } from "../context.ts";

  export const complexity = complexityExtension<Context>({
    defaultComplexity: 1,
    defaultListMultiplier: 10,
    limit: { depth: 10, breadth: 50, complexity: 1000 },
  });

  // createExtensions(complexity, ...)
  ```

  v2 — `createComplexity()` returns a rule helper plus an app plugin:

  ```typescript
  // src/lib/complexity.ts
  import { createComplexity } from "@baeta/complexity";
  import type { Context } from "../types/context.ts";

  export const { complexity, complexityAppPlugin } = createComplexity<Context>({
    defaultComplexity: 1,
    defaultListMultiplier: 10,
    // static limits, or a (ctx) => limits function for dynamic limits
    async limit(ctx) {
      return { depth: 10, breadth: 50, complexity: 1000 };
    },
  });
  ```

  Register the plugin on the application:

  ```typescript
  // src/app.ts
  import { createApplication } from "@baeta/core";
  import { complexityAppPlugin } from "./lib/complexity.ts";
  import modules from "./modules/index.ts";

  const baeta = createApplication({
    modules,
    plugins: [complexityAppPlugin],
  });
  ```

  Using `complexity(...)` in a module without registering `complexityAppPlugin` is now a build-time error rather than a silent no-op.

  **Applying rules to fields**

  v1 — a dedicated `.$complexity()` method on resolvers, types, and subscriptions, called for its side effect:

  ```typescript
  // Per-field override
  Query.users.$complexity(({ args }) => ({ complexity: 1, multiplier: 5 }));

  // Disable for a field
  Query.simple.$complexity(() => false);

  // Whole type
  User.$complexity(() => ({ complexity: 2, multiplier: 5 }));
  ```

  v2 — the `complexity(...)` helper is passed to the generic `.$use(...)` builder method and chained into `.resolve()` / `.$fields()`:

  ```typescript
  import { complexity } from "../../lib/complexity.ts";
  import { UserModule } from "./typedef.ts";

  const { Query, User } = UserModule;

  // Per-field override on a list field
  const usersQuery = Query.users
    .$use(complexity(({ args, ctx }) => ({ complexity: 1, multiplier: 5 })))
    .resolve(() => findUsers());

  // Disable complexity for a specific field
  const userQuery = Query.user
    .$use(complexity(() => false))
    .resolve(({ args }) => findUser(args.where));

  // Whole type — chain into $fields
  const userResolver = User.$use(complexity(() => ({ complexity: 2 }))).$fields(
    {
      id: User.id.key("id"),
      email: User.email.key("email"),
    }
  );
  ```

  The settings function still receives `{ args, ctx }` and returns `{ complexity?, multiplier? }` or `false`.

  **Package rename**

  | v1                            | v2                  |
  | ----------------------------- | ------------------- |
  | `@baeta/extension-complexity` | `@baeta/complexity` |

  The error exports (`ComplexityError`, `ComplexityErrorCode`, `ComplexityErrorKind`, `GetComplexityError`) and the option/type exports (`ComplexityExtensionOptions`, `ComplexityLimit`, `GetComplexityLimit`, `FieldSettings`, `GetFieldSettings`, `GetFieldSettingsArgs`) are unchanged.

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/core@2.0.0-next.16

## 1.0.11

### Patch Changes

- Updated dependencies [[`7f3d5ff`](https://github.com/andreisergiu98/baeta/commit/7f3d5ff7cd0871e2f017c86dd29ac7bc02647154)]:
  - @baeta/core@1.0.11

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

- Updated dependencies [[`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3)]:
  - @baeta/core@1.0.9

## 0.0.5

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- Updated dependencies [[`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228), [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc)]:
  - @baeta/core@1.0.8

## 0.0.4

### Patch Changes

- [`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add readme

- Updated dependencies [[`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820)]:
  - @baeta/core@0.1.5
  - @baeta/errors@0.1.4

## 0.0.3

### Patch Changes

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.

- [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise es target to 2024

- Updated dependencies [[`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72), [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857)]:
  - @baeta/core@0.1.4
  - @baeta/errors@0.1.3

## 0.0.2

### Patch Changes

- [`c8dea0c`](https://github.com/andreisergiu98/baeta/commit/c8dea0c6a7824039cf4de13a8d2c0b1682ea3d02) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - maintain order of prepended middlewares

- Updated dependencies [[`c8dea0c`](https://github.com/andreisergiu98/baeta/commit/c8dea0c6a7824039cf4de13a8d2c0b1682ea3d02)]:
  - @baeta/core@0.1.3

## 0.0.1

### Patch Changes

- [#176](https://github.com/andreisergiu98/baeta/pull/176) [`d77cd8a`](https://github.com/andreisergiu98/baeta/commit/d77cd8a1810fdf72cfbbb08d05c207bbc893c822) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - feat: add complexity extension

- Updated dependencies [[`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321), [`d77cd8a`](https://github.com/andreisergiu98/baeta/commit/d77cd8a1810fdf72cfbbb08d05c207bbc893c822), [`cf9f094`](https://github.com/andreisergiu98/baeta/commit/cf9f09468f84d99b069eb0f55e1fc207e2a41dd8)]:
  - @baeta/core@0.1.2
  - @baeta/errors@0.1.2
