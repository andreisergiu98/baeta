# @baeta/subscriptions-pubsub

## 2.0.0-next.16

### Major Changes

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

- `TypedPubSub` is now a concrete class you instantiate with `new`, the `createTypedPubSub()` factory has been removed, and the package targets `graphql-subscriptions` v3 only. Support for `graphql-subscriptions` v2 (and its runtime engine detection) is gone. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  #### Creating the PubSub

  In v1, `TypedPubSub` was a _type_ and you built the instance with the `createTypedPubSub()` factory, which detected the engine version (`asyncIterator` for v2, `asyncIterableIterator` for v3) at runtime. In v2, `TypedPubSub` is the class itself.

  **v1:**

  ```typescript
  import { createTypedPubSub } from "@baeta/subscriptions-pubsub";
  import { PubSub } from "graphql-subscriptions";

  export const pubsub = createTypedPubSub<PubSub, PubSubMap>(new PubSub());
  ```

  **v2:**

  ```typescript
  import { TypedPubSub } from "@baeta/subscriptions-pubsub";
  import { PubSub } from "graphql-subscriptions";

  export const pubsub = new TypedPubSub<PubSub, PubSubMap>(new PubSub());
  ```

  The optional `{ prefix }` options object is unchanged and still passed as the second argument.

  #### Removed and changed exports

  - `createTypedPubSub()` — removed; use `new TypedPubSub(...)`.
  - `PubSubEngineV2` / `PubSubEngineV3` — removed. The package now targets a single `graphql-subscriptions` v3 engine.
  - `TypedPubSub` — was a type alias in v1; is now the exported class.
  - `TypedPubSubOptions` — unchanged.

  Because v2 support is dropped, the `asyncIterator` method (the v2-only iterator) is no longer available — use `asyncIterableIterator(channel)` for the async iterable. `publish`, `subscribe`, and `unsubscribe` are unchanged.

## 1.0.9

### Patch Changes

- [`583014f`](https://github.com/andreisergiu98/baeta/commit/583014f0bac810b25d9a8226bda2df4c9039f5e3) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Update dependencies

## 1.0.8

### Patch Changes

- [#189](https://github.com/andreisergiu98/baeta/pull/189) [`d500378`](https://github.com/andreisergiu98/baeta/commit/d500378198e0a9c48298c4242913bca8ad348228) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add jsdocs

- [#165](https://github.com/andreisergiu98/baeta/pull/165) [`1334c2a`](https://github.com/andreisergiu98/baeta/commit/1334c2a866676c88f0f3d380b22133d81c4e98bc) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - mark as stable

## 0.0.2

### Patch Changes

- [`b59db50`](https://github.com/andreisergiu98/baeta/commit/b59db501a83275ab2d964933080e688a3a5d8820) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - add readme

## 0.0.1

### Patch Changes

- [#180](https://github.com/andreisergiu98/baeta/pull/180) [`483c709`](https://github.com/andreisergiu98/baeta/commit/483c70932f815fd114732c00b74f9488d7924c72) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - Raise minimum required NodeJS version to 22.12.0. Drop CommonJS builds in favor of the require_esm feature from NodeJS 22.12.0 onwards.

- [`de6e89c`](https://github.com/andreisergiu98/baeta/commit/de6e89c1b592e280967c73a4137d24ee56ef1857) Thanks [@andreisergiu98](https://github.com/andreisergiu98)! - raise es target to 2024
