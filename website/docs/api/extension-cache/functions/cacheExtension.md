# Function: cacheExtension()

> **cacheExtension**(`store`, `options`?): () => `Extension`

Creates a cache extension

## Parameters

### store

[`Store`](../classes/Store.md)

Storage adapter implementation

### options?

[`DefaultStoreOptions`](../interfaces/DefaultStoreOptions.md)

Default caching options

## Returns

`Function`

Extension factory function

### Returns

`Extension`

## Example

```typescript
import { cacheExtension } from "@baeta/extension-cache";
import { RedisStore } from "@baeta/extension-cache-redis";
import Redis from "ioredis";

const redis = new Redis("redis://localhost:6379");
const redisStore = new RedisStore(redis);

export const cacheExt = cacheExtension(redisStore, {
  ttl: 3600, // TTL in seconds (defaults to 1 hour)
});
```
