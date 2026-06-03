---
"@baeta/cache-cloudflare": major
---

The Cloudflare adapter was renamed from `@baeta/extension-cache-cloudflare` to `@baeta/cache-cloudflare` and rebuilt for the decoupled v2 cache API. It exports `CloudflareCacheClient` (extending the `CacheClient` base class from `@baeta/cache`) plus the `BaetaCache` Durable Object, replacing the v1 `CloudflareStoreAdapter` integration.

```typescript
// v1
import { cacheExtension } from '@baeta/extension-cache';
import { CloudflareCacheClient } from '@baeta/extension-cache-cloudflare';

// v2
import { createCache } from '@baeta/cache';
import { CloudflareCacheClient, BaetaCache } from '@baeta/cache-cloudflare';

export const cloudflareClient = new CloudflareCacheClient(env.BAETA_CACHE);
// pass cloudflareClient to createCache(cloudflareClient, { ... })
```

`CloudflareCacheClient` is backed by the `BaetaCache` Durable Object and is intended for Cloudflare Workers deployments.
