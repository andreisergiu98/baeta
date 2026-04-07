---
"@baeta/generator-sdk": major
---

`@baeta/generator-sdk` provides the building blocks for authoring Baeta generator plugins (`File`, `FileManager`, `Watcher`, `createPluginV1`, options). It was reworked for v2.

- `GeneratorOptions` dropped the graphql-codegen-era fields (`baseTypesPath`, `contextType`, `extensions`, `scalars`) and added `typesDir`. Context/scalar/type configuration now lives in the generated `src/modules/types.ts` instead of generator options.
- `FileOptions` header config changed from individual opt-out flags (`disableEslintHeader`, `disableBiomeHeader`) to a single opt-in `enableLintHeaders`, which accepts `true` or an object selecting `eslint` / `oxlint` / `biomeV1` / `biomeV2` headers.
- New `FileOptions.disableOverwrite`: files written with it use an exclusive-create open and are left untouched if they already exist on disk, so generated starter files are never overwritten.
- `FileManager.createAndAdd(filename, content, tag, options?)` now accepts per-file `FileOptions` as a fourth argument, merged over the manager's defaults.
- GraphQL schema utilities (schema loading, AST registry walking) are no longer part of this SDK — they were extracted into the new `@baeta/util-graphql` package, so the SDK no longer pulls in `graphql`/`graphql-tools` for plugin authors who don't need them.
