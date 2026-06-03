---
"@baeta/cache-upstash": major
---

The Upstash adapter was renamed from `@baeta/extension-cache-upstash` to `@baeta/cache-upstash` and rebuilt for the decoupled v2 cache API. It now exports an `UpstashCacheClient` (extending the `CacheClient` base class from `@baeta/cache`) that you pass directly to `createCache`, replacing the v1 `UpstashStore`/`UpstashClient` pair.

```typescript
// v1
import { cacheExtension } from '@baeta/extension-cache';
import { UpstashClient, UpstashStore } from '@baeta/extension-cache-upstash';

const store = new UpstashStore(new UpstashClient(/* ... */));
export const cacheExt = cacheExtension(store, { ttl: 3600 });

// v2
import { createCache } from '@baeta/cache';
import { UpstashCacheClient } from '@baeta/cache-upstash';

export const upstashClient = new UpstashCacheClient({
  url: 'UPSTASH_REDIS_URL',
  token: 'UPSTASH_REDIS_TOKEN',
});
// pass upstashClient to createCache(upstashClient, { ... })
```
