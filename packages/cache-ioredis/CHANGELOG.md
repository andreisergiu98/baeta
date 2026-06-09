# @baeta/cache-ioredis

## 2.0.0-next.16

### Major Changes

- The ioredis adapter was renamed from `@baeta/extension-cache-redis` to `@baeta/cache-ioredis` and rebuilt for the decoupled v2 cache API. Instead of the old `RedisStore` (a Baeta `Store`), it now exports a `RedisCacheClient` that extends the `CacheClient` base class from `@baeta/cache` and is passed directly to `createCache`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  ```typescript
  // v1
  import { cacheExtension } from "@baeta/extension-cache";
  import { RedisStore } from "@baeta/extension-cache-redis";
  import Redis from "ioredis";

  const redisStore = new RedisStore(new Redis("redis://localhost:6379"));
  export const cacheExt = cacheExtension(redisStore, { ttl: 3600 });

  // v2
  import { createCache } from "@baeta/cache";
  import { RedisCacheClient } from "@baeta/cache-ioredis";
  import Redis from "ioredis";

  export const redisClient = new RedisCacheClient(
    new Redis("redis://localhost:6379")
  );
  // pass redisClient to createCache(redisClient, { ... })
  ```

  `RedisCacheClient` accepts both a standalone `Redis` and a `Cluster` connection, and exposes pipeline-batching tuning options (`maxPipelineSizeLimit`, `maxPipelineCommandLimit`, `maxCommandKeysLimit`) plus the shared `CacheClientOptions` (`ttlMs`, `revision`, `namespace`).

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/cache-redis-common@2.0.0-next.14
  - @baeta/cache@2.0.0-next.16
