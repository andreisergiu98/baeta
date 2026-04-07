---
"@baeta/cache-iovalkey": major
---

`@baeta/cache-iovalkey` is a new cache adapter for the [Valkey](https://valkey.io) key-value store (the open-source Redis fork), using the [iovalkey](https://github.com/valkey-io/iovalkey) client. It extends the `CacheClient` base class from `@baeta/cache` and is a drop-in alternative to the ioredis adapter.

```typescript
import { createCache } from '@baeta/cache';
import { ValkeyCacheClient } from '@baeta/cache-iovalkey';
import Valkey from 'iovalkey';

export const valkeyClient = new ValkeyCacheClient(new Valkey('valkey://localhost:6379'));
// pass valkeyClient to createCache(valkeyClient, { ... })
```

`ValkeyCacheClient` accepts both standalone and cluster connections and shares the same pipeline-batching tuning options and `CacheClientOptions` as the ioredis adapter.
