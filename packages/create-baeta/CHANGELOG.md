# create-baeta

## 2.0.0-next.0

### Major Changes

- [#214](https://github.com/andreisergiu98/baeta/pull/214) [`31d1a50`](https://github.com/andreisergiu98/baeta/commit/31d1a509f96535b43ae85d19c770eb1a5f09dc94) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Baeta v2 – major refactor
  - **Side-effect-free type generation & resolver definitions.**
    The types generator and resolver definitions were reworked to be side-effect free, improving type safety.
  - **Stricter type safety.**
    You must now **explicitly define resolvers for every field** during development—breakages that used to surface at runtime are now caught at compile time.
  - **Removed `@baeta/compiler`.**
    Since modern runtimes can execute TypeScript natively, the separate compiler package is no longer needed. Use your runtime’s native TS support or your existing build setup.
  - **Subscriptions update.**
    `@baeta/subscriptions-pubsub` now targets **`graphql-subscriptions` v3**.

## 1.0.11

### Patch Changes

- [`d3b6040`](https://github.com/andreisergiu98/baeta/commit/d3b6040c0fe3b88297791fc68fe5904431b8739c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Add static .gitignore template

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

## 1.0.8

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- [#165](https://github.com/andreisergiu98/baeta/pull/165) [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - mark as stable

## 0.0.4

### Patch Changes

- [`770fef4`](https://github.com/andreisergiu98/baeta/commit/770fef4974fd8926886162424f326c4cda2ad21b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix package entrypoint

## 0.0.3

### Patch Changes

- [`bcbfb49`](https://github.com/andreisergiu98/baeta/commit/bcbfb49b16daf5d6f195ba273f52b1aa89602c1c) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix yoga entrypoint for bun and deno

## 0.0.2

### Patch Changes

- [#184](https://github.com/andreisergiu98/baeta/pull/184) [`bf2d1a3`](https://github.com/andreisergiu98/baeta/commit/bf2d1a326235e5f34e723a5acc81cd7b974b913b) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add runtime selector

## 0.0.1

### Patch Changes

- [#182](https://github.com/andreisergiu98/baeta/pull/182) [`9a0f100`](https://github.com/andreisergiu98/baeta/commit/9a0f1003a9579406809c80e6fe123e54fb86e5ac) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add create baeta package
