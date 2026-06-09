# @baeta/cache-upstash

## 2.0.0-next.16

### Major Changes

- The Upstash adapter was renamed from `@baeta/extension-cache-upstash` to `@baeta/cache-upstash` and rebuilt for the decoupled v2 cache API. It now exports an `UpstashCacheClient` (extending the `CacheClient` base class from `@baeta/cache`) that you pass directly to `createCache`, replacing the v1 `UpstashStore`/`UpstashClient` pair. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  ```typescript
  // v1
  import { cacheExtension } from "@baeta/extension-cache";
  import { UpstashClient, UpstashStore } from "@baeta/extension-cache-upstash";

  const store = new UpstashStore(new UpstashClient(/* ... */));
  export const cacheExt = cacheExtension(store, { ttl: 3600 });

  // v2
  import { createCache } from "@baeta/cache";
  import { UpstashCacheClient } from "@baeta/cache-upstash";

  export const upstashClient = new UpstashCacheClient({
    url: "UPSTASH_REDIS_URL",
    token: "UPSTASH_REDIS_TOKEN",
  });
  // pass upstashClient to createCache(upstashClient, { ... })
  ```

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/cache-redis-common@2.0.0-next.14
  - @baeta/cache@2.0.0-next.16
