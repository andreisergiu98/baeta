---
"@baeta/plugin-graphql": major
"@baeta/util-graphql": major
"@baeta/core": major
---

`createApplication` takes `sources`, the default export of the generated `modules/index.ts`: `{ sdl, modules }`. The generator merges and validates the whole schema and writes it to `sdl.ts` in the types directory. Core builds it once with graphql-js instead of merging per-module typedefs with `@graphql-tools/schema`, and validates it at startup unless `assumeValid: true` is passed.

Removed: `$directive`, `SchemaTransformer`, the `executableSchemaOptions` and `buildSchema` options, `ModuleCompiler.typedef`, and the typedef argument of `createModuleBuilder`. App plugins receive the schema document as the second argument of `mutate`. `@baeta/util-graphql` adds `buildSdl`.
