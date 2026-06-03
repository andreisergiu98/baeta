---
"@baeta/complexity": major
---

The complexity extension has been renamed to `@baeta/complexity` and rebuilt around the v2 app-plugin and builder APIs. The `complexityExtension()` factory and the magic `.$complexity()` resolver method are gone. You now call `createComplexity()` to get back two things — a `complexity(...)` rule helper applied via the generic `.$use(...)` builder method, and a `complexityAppPlugin` registered on `createApplication`.

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
const userResolver = User
  .$use(complexity(() => ({ complexity: 2 })))
  .$fields({
    id: User.id.key("id"),
    email: User.email.key("email"),
  });
```

The settings function still receives `{ args, ctx }` and returns `{ complexity?, multiplier? }` or `false`.

**Package rename**

| v1                            | v2                  |
| ----------------------------- | ------------------- |
| `@baeta/extension-complexity` | `@baeta/complexity` |

The error exports (`ComplexityError`, `ComplexityErrorCode`, `ComplexityErrorKind`, `GetComplexityError`) and the option/type exports (`ComplexityExtensionOptions`, `ComplexityLimit`, `GetComplexityLimit`, `FieldSettings`, `GetFieldSettings`, `GetFieldSettingsArgs`) are unchanged.
