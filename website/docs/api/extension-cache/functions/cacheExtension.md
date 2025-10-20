# cacheExtension()

> **cacheExtension**(`store`, `options?`, `transformers?`): `CacheExtension`

Creates a cache extension

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`store`

</td>
<td>

[`Store`](../classes/Store.md)

</td>
<td>

Storage adapter implementation

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`DefaultStoreOptions`](../interfaces/DefaultStoreOptions.md)

</td>
<td>

Default caching options

</td>
</tr>
<tr>
<td>

`transformers?`

</td>
<td>

[`SerializerTransformer`](../type-aliases/SerializerTransformer.md)[]

</td>
<td>

Serializer transformers for custom scalars that are not serializable by default

</td>
</tr>
</tbody>
</table>

## Returns

`CacheExtension`

Extension factory function

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
