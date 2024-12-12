# Class: UpstashStore

Upstash Redis-based cache store implementation.
Provides a serverless-optimized caching solution ideal for edge and serverless environments.

## Remarks

This implementation uses Upstash Redis and is designed for serverless architectures.

## Example

```typescript
import { UpstashStore } from "@baeta/extension-cache-upstash";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "UPSTASH_REDIS_URL",
  token: "UPSTASH_REDIS_TOKEN",
});
const store = new UpstashStore(redis);

// Use with cache extension
const cacheExt = cacheExtension(store, {
  ttl: 3600,
});
```

## Extends

- `Store`

## Constructors

### new UpstashStore()

> **new UpstashStore**(`client`): [`UpstashStore`](UpstashStore.md)

#### Parameters

##### client

`Redis`

#### Returns

[`UpstashStore`](UpstashStore.md)

#### Overrides

`Store.constructor`

## Properties

### client

> `protected` **client**: `Redis`

## Methods

### createStoreAdapter()

> **createStoreAdapter**\<`T`\>(`options`, `type`, `hash`): `StoreAdapter`\<`T`\>

Creates a new store adapter for a specific type

#### Type Parameters

• **T**

#### Parameters

##### options

`StoreOptions`\<`T`\>

Store configuration options

##### type

`string`

Type name for the cached items

##### hash

`string`

Unique hash for the type

#### Returns

`StoreAdapter`\<`T`\>

#### Overrides

`Store.createStoreAdapter`
