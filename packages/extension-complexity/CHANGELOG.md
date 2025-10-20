# @baeta/extension-complexity

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
  - @baeta/core@2.0.0-next.0

## 1.0.11

### Patch Changes

- Updated dependencies [[`7f3d5ff`](https://github.com/andreisergiu98/baeta/commit/7f3d5ff7cd0871e2f017c86dd29ac7bc02647154)]:
  - @baeta/core@1.0.11

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

- Updated dependencies [[`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3)]:
  - @baeta/core@1.0.9

## 0.0.5

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- Updated dependencies [[`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228), [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc)]:
  - @baeta/core@1.0.8

## 0.0.4

### Patch Changes

- [`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add readme

- Updated dependencies [[`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820)]:
  - @baeta/core@0.1.5
  - @baeta/errors@0.1.4

## 0.0.3

### Patch Changes

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.

- [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise es target to 2024

- Updated dependencies [[`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72), [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857)]:
  - @baeta/core@0.1.4
  - @baeta/errors@0.1.3

## 0.0.2

### Patch Changes

- [`c8dea0c`](https://github.com/andreisergiu98/baeta/commit/c8dea0c6a7824039cf4de13a8d2c0b1682ea3d02) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - maintain order of prepended middlewares

- Updated dependencies [[`c8dea0c`](https://github.com/andreisergiu98/baeta/commit/c8dea0c6a7824039cf4de13a8d2c0b1682ea3d02)]:
  - @baeta/core@0.1.3

## 0.0.1

### Patch Changes

- [#176](https://github.com/andreisergiu98/baeta/pull/176) [`d77cd8a`](https://github.com/andreisergiu98/baeta/commit/d77cd8a1810fdf72cfbbb08d05c207bbc893c822) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - feat: add complexity extension

- Updated dependencies [[`59bbb9c`](https://github.com/andreisergiu98/baeta/commit/59bbb9c4baaf716f27dc251fe7aeb0231e6c5321), [`d77cd8a`](https://github.com/andreisergiu98/baeta/commit/d77cd8a1810fdf72cfbbb08d05c207bbc893c822), [`cf9f094`](https://github.com/andreisergiu98/baeta/commit/cf9f09468f84d99b069eb0f55e1fc207e2a41dd8)]:
  - @baeta/core@0.1.2
  - @baeta/errors@0.1.2
