---
"@baeta/generator": major
---

`@baeta/generator` drives the generate/watch pipeline that runs Baeta's codegen plugins. It was reworked for the v2 side-effect-free generation flow.

- `GeneratorOptions` no longer carries the GraphQL-specific knobs that the old graphql-codegen pipeline needed: `baseTypesPath`, `contextType`, `extensions`, and `scalars` are gone. Type/context/scalar configuration now lives in the generated `src/modules/types.ts`. A new `typesDir` option controls where shared `__generated__` types are emitted (default `${modulesDir}/../__generated__/`).
- Plugins can now mark individual generated files as non-overwriting. The runner respects `disableOverwrite` so generator-authored starter files (e.g. a module's `index.ts` or `types.ts`) are written once and never clobbered on regeneration.

Generation remains plugin-driven via `generate(options, plugins, hooks)` / `generateAndWatch(...)`, with the GraphQL codegen supplied by `@baeta/plugin-graphql`.
