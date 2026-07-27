# @baeta/cache-cloudflare

## 2.0.0-next.17

### Patch Changes

- Add support for custom transport for logs and improve tracing by [@andreisergiu98](https://github.com/andreisergiu98) in [#616](https://github.com/andreisergiu98/baeta/pull/616)
- Updated dependencies [[`37364b1`](https://github.com/andreisergiu98/baeta/commit/37364b1eceac797cd4077e2e26fb1492c752bf6c), [`7cd558c`](https://github.com/andreisergiu98/baeta/commit/7cd558c2a2c1111df0b6de663b6db50ad881bc88)]:
  - @baeta/cache@2.0.0-next.17
  - @baeta/util-log@2.0.0-next.6

## 2.0.0-next.16

### Major Changes

- The Cloudflare adapter was renamed from `@baeta/extension-cache-cloudflare` to `@baeta/cache-cloudflare` and rebuilt for the decoupled v2 cache API. It exports `CloudflareCacheClient` (extending the `CacheClient` base class from `@baeta/cache`) plus the `BaetaCache` Durable Object, replacing the v1 `CloudflareStoreAdapter` integration. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

  ```typescript
  // v1
  import { cacheExtension } from "@baeta/extension-cache";
  import { CloudflareCacheClient } from "@baeta/extension-cache-cloudflare";

  // v2
  import { createCache } from "@baeta/cache";
  import { CloudflareCacheClient, BaetaCache } from "@baeta/cache-cloudflare";

  export const cloudflareClient = new CloudflareCacheClient(env.BAETA_CACHE);
  // pass cloudflareClient to createCache(cloudflareClient, { ... })
  ```

  `CloudflareCacheClient` is backed by the `BaetaCache` Durable Object and is intended for Cloudflare Workers deployments.

- Drop support for Node.js v23 and v25. Baeta now targets the active LTS releases — Node.js `^22.20.0`, `^24.0.0`, or `>=26.0.0`. by [@andreisergiu98](https://github.com/andreisergiu98) in [#290](https://github.com/andreisergiu98/baeta/pull/290)

### Patch Changes

- Updated dependencies [[`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c), [`046dc5c`](https://github.com/andreisergiu98/baeta/commit/046dc5c29a8ec0f613b9430caa659c08d41a678c)]:
  - @baeta/cache@2.0.0-next.16
