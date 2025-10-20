# @baeta/extension-cache-upstash

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

## 1.0.11

### Patch Changes

- Updated dependencies []:
  - @baeta/extension-cache@1.0.11

## 1.0.10

### Patch Changes

- Updated dependencies [[`18cfc12`](https://github.com/andreisergiu98/baeta/commit/18cfc120afe44fda1313893cf93bc7d31afd3785)]:
  - @baeta/extension-cache@1.0.10

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

- [#200](https://github.com/andreisergiu98/baeta/pull/200) [`399ae6c`](https://github.com/andreisergiu98/baeta/commit/399ae6c285d679c6886ab5181cd72461ee646019) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Add serializer to be able to serialize/deserialize some custom scalars

- Updated dependencies [[`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3), [`399ae6c`](https://github.com/andreisergiu98/baeta/commit/399ae6c285d679c6886ab5181cd72461ee646019), [`c2e5623`](https://github.com/andreisergiu98/baeta/commit/c2e5623819c1b2b6069ab0663b5c5ad4e09e81b5)]:
  - @baeta/extension-cache@1.0.9

## 0.0.6

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- Updated dependencies [[`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228)]:
  - @baeta/extension-cache@0.0.6

## 0.0.5

### Patch Changes

- [`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add readme

- Updated dependencies [[`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820)]:
  - @baeta/extension-cache@0.0.5

## 0.0.4

### Patch Changes

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.

- [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise es target to 2024

- Updated dependencies [[`3f2befb`](https://github.com/andreisergiu98/baeta/commit/3f2befbb4b645e2970727482e970c4e78f0ed598), [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72), [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857)]:
  - @baeta/extension-cache@0.0.4

## 0.0.3

### Patch Changes

- Updated dependencies []:
  - @baeta/extension-cache@0.0.3

## 0.0.2

### Patch Changes

- [#170](https://github.com/andreisergiu98/baeta/pull/170) [`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - update dependencies

- Updated dependencies [[`14d936b`](https://github.com/andreisergiu98/baeta/commit/14d936b50b606ed748c9414faf1365824c0cc10f), [`519f5b6`](https://github.com/andreisergiu98/baeta/commit/519f5b675309cf9d111979cc0bc4e80cc3b9f455)]:
  - @baeta/extension-cache@0.0.2

## 0.0.1

### Patch Changes

- [`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - fix exports order in package.json

- Updated dependencies [[`a3f0e5d`](https://github.com/andreisergiu98/baeta/commit/a3f0e5d03fc9ef21a87d3ec6bf264d0e9707636a)]:
  - @baeta/extension-cache@0.0.1
