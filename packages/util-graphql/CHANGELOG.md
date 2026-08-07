# @baeta/util-graphql

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
