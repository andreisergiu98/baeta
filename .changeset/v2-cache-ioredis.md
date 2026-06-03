---
"@baeta/cache-ioredis": major
---

The ioredis adapter was renamed from `@baeta/extension-cache-redis` to `@baeta/cache-ioredis` and rebuilt for the decoupled v2 cache API. Instead of the old `RedisStore` (a Baeta `Store`), it now exports a `RedisCacheClient` that extends the `CacheClient` base class from `@baeta/cache` and is passed directly to `createCache`.

```typescript
// v1
import { cacheExtension } from '@baeta/extension-cache';
import { RedisStore } from '@baeta/extension-cache-redis';
import Redis from 'ioredis';

const redisStore = new RedisStore(new Redis('redis://localhost:6379'));
export const cacheExt = cacheExtension(redisStore, { ttl: 3600 });

// v2
import { createCache } from '@baeta/cache';
import { RedisCacheClient } from '@baeta/cache-ioredis';
import Redis from 'ioredis';

export const redisClient = new RedisCacheClient(new Redis('redis://localhost:6379'));
// pass redisClient to createCache(redisClient, { ... })
```

`RedisCacheClient` accepts both a standalone `Redis` and a `Cluster` connection, and exposes pipeline-batching tuning options (`maxPipelineSizeLimit`, `maxPipelineCommandLimit`, `maxCommandKeysLimit`) plus the shared `CacheClientOptions` (`ttlMs`, `revision`, `namespace`).
