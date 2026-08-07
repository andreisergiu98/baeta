# @baeta/cache-iovalkey

## 2.0.0-next.17

### Patch Changes

- Updated dependencies [[`37364b1`](https://github.com/andreisergiu98/baeta/commit/37364b1eceac797cd4077e2e26fb1492c752bf6c), [`7cd558c`](https://github.com/andreisergiu98/baeta/commit/7cd558c2a2c1111df0b6de663b6db50ad881bc88)]:
  - @baeta/cache@2.0.0-next.17

## 2.0.0-next.16

### Major Changes

- `@baeta/cache-iovalkey` is a new cache adapter for the [Valkey](https://valkey.io) key-value store (the open-source Redis fork), using the [iovalkey](https://github.com/valkey-io/iovalkey) client. It extends the `CacheClient` base class from `@baeta/cache` and is a drop-in alternative to the ioredis adapter. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  ```typescript
  import { createCache } from "@baeta/cache";
  import { ValkeyCacheClient } from "@baeta/cache-iovalkey";
  import Valkey from "iovalkey";

  export const valkeyClient = new ValkeyCacheClient(
    new Valkey("valkey://localhost:6379")
  );
  // pass valkeyClient to createCache(valkeyClient, { ... })
  ```

  `ValkeyCacheClient` accepts both standalone and cluster connections and shares the same pipeline-batching tuning options and `CacheClientOptions` as the ioredis adapter.

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/cache-redis-common@2.0.0-next.14
  - @baeta/cache@2.0.0-next.16
