---
"@baeta/cli": major
---

The CLI no longer compiles or bundles your app. It now does one thing — code generation — and assumes your runtime executes TypeScript directly (Node `--experimental-strip-types`/`node:type-stripping`, Bun, or Deno).

#### `baeta build` removed

The entire `build` command is gone, along with its `--generate`, `--onSuccess`, and `--onError` flags. Bundling lived in `@baeta/compiler`, which has been removed in v2. Run your app's source directly instead of building to `dist/`.

The only command is now `generate` (alias `g`), which is also implied as the default workflow. Its flags are `--watch`/`-w` and `--run`/`-r`. (The v1 `generate` command's `--skipInitial`/`-s` flag was also removed.)

`--run` already existed in v1's `generate` command, but it is now the way to run your app: Baeta launches the `--run` command once as a long-lived process and only respawns it if it exits — live reload comes from `node --watch` (or `bun --watch` / `deno --watch`) inside the `--run` command, which restarts when your source and the regenerated typedefs change.

**v1 `package.json`:**

```json
{
  "scripts": {
    "build": "baeta build --generate",
    "generate": "baeta generate",
    "start": "baeta build --watch --generate --onSuccess='node --enable-source-maps dist/app.js'"
  }
}
```

**v2 `package.json`:**

```json
{
  "scripts": {
    "build": "baeta generate",
    "start": "baeta generate --watch --run='node --watch --inspect src/app.ts'",
    "types": "tsc --noEmit"
  }
}
```

Note the `--run` target is now `src/app.ts` (source) rather than `dist/app.js` (build output).

Bun and Deno use the same shape, swapping the runtime inside `--run`:

```json
{
  "start:bun": "baeta generate --watch --run='bun --watch --inspect src/app.ts'",
  "start:deno": "baeta generate --watch --run='deno --watch --inspect --allow-net --allow-read --allow-env src/app.ts'"
}
```

#### Config loading is now a native import

In v1, a `baeta.ts` config was transpiled on the fly with esbuild via the optional `@baeta/compiler` peer dependency. In v2 the config file is loaded with a native `import()`, so it must be valid ESM your runtime can execute directly (`.ts`, `.mts`, `.js`, or `.mjs`). `@baeta/compiler` is no longer a peer dependency.

`defineConfig` is now required: it stamps a `version: 'v2'` marker that the CLI validates on load. A bare config object (or a v1-style config) is rejected.

```typescript
import { defineConfig } from "@baeta/cli";

export default defineConfig({
  graphql: {
    schemas: ["src/**/*.gql"],
  },
});
```

The `compiler` field on `BaetaOptions` has also been removed, since there is no build step to configure.

#### `./ink` export removed

The `@baeta/cli/ink` subpath export was dropped.
