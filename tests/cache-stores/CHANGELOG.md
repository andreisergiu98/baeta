# @baeta/tests-cache-stores

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

### Patch Changes

- Updated dependencies [[`31d1a50`](https://github.com/andreisergiu98/baeta/commit/31d1a509f96535b43ae85d19c770eb1a5f09dc94)]:
  - @baeta/extension-cache@2.0.0-next.0

## 1.0.3

### Patch Changes

- Updated dependencies []:
  - @baeta/extension-cache@1.0.11

## 1.0.2

### Patch Changes

- Updated dependencies [[`18cfc12`](https://github.com/andreisergiu98/baeta/commit/18cfc120afe44fda1313893cf93bc7d31afd3785)]:
  - @baeta/extension-cache@1.0.10

## 1.0.1

### Patch Changes

- Updated dependencies [[`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3), [`399ae6c`](https://github.com/andreisergiu98/baeta/commit/399ae6c285d679c6886ab5181cd72461ee646019), [`c2e5623`](https://github.com/andreisergiu98/baeta/commit/c2e5623819c1b2b6069ab0663b5c5ad4e09e81b5)]:
  - @baeta/extension-cache@1.0.9
