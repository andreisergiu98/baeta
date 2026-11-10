# @baeta/util-graphql

## 2.0.0-next.7

### Major Changes

- `createApplication` takes `sources`, the default export of the generated `modules/index.ts`: `{ sdl, modules }`. The generator merges and validates the whole schema and writes it to `sdl.ts` in the types directory. Core builds it once with graphql-js instead of merging per-module typedefs with `@graphql-tools/schema`, and validates it at startup unless `assumeValid: true` is passed. by [@andreisergiu98](https://github.com/andreisergiu98) in [#682](https://github.com/andreisergiu98/baeta/pull/682)

  Removed: `$directive`, `SchemaTransformer`, the `executableSchemaOptions` and `buildSchema` options, `ModuleCompiler.typedef`, and the typedef argument of `createModuleBuilder`. App plugins receive the schema document as the second argument of `mutate`. `@baeta/util-graphql` adds `buildSdl`.

### Patch Changes

- Updated dependencies [[`2ee2b3c`](https://github.com/andreisergiu98/baeta/commit/2ee2b3c51c055f8d66404404d0c752d511bb6158)]:
  - @baeta/util-path@2.0.0-next.7

## 2.0.0-next.6

### Patch Changes

- Update @graphql-tools/utils to 13.1.3 by [@andreisergiu98](https://github.com/andreisergiu98) in [#663](https://github.com/andreisergiu98/baeta/pull/663)

- fix(deps): update all non-major dependencies by [@baeta-bot](https://github.com/apps/baeta-bot) in [#645](https://github.com/andreisergiu98/baeta/pull/645)

## 2.0.0-next.5

### Minor Changes

- Add support for GraphQL 17 by [@andreisergiu98](https://github.com/andreisergiu98) in [#572](https://github.com/andreisergiu98/baeta/pull/572)

## 2.0.0-next.4

### Major Changes

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

- `@baeta/util-graphql` is a new package. It collects the GraphQL schema utilities that the v1 codegen kept buried inside `@baeta/plugin-graphql` into a standalone, reusable module shared by the generator and federation packages. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/util-path@2.0.0-next.6
