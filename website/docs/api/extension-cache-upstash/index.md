# @baeta/extension-cache-upstash

## Classes

### UpstashStore

Upstash Redis-based cache store implementation.
Provides a serverless-optimized caching solution ideal for edge and serverless environments.

#### Remarks

This implementation uses Upstash Redis and is designed for serverless architectures.

#### Example

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

#### Extends

- `Store`

#### Constructors

##### new UpstashStore()

> **new UpstashStore**(`client`): [`UpstashStore`](index.md#upstashstore)

###### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`client`

</td>
<td>

`Redis`

</td>
</tr>
</tbody>
</table>

###### Returns

[`UpstashStore`](index.md#upstashstore)

###### Overrides

`Store.constructor`

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`client`

</td>
<td>

`protected`

</td>
<td>

`Redis`

</td>
</tr>
</tbody>
</table>

#### Methods

##### createStoreAdapter()

> **createStoreAdapter**\<`T`\>(`options`, `type`, `hash`): `StoreAdapter`\<`T`\>

Creates a new store adapter for a specific type

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

###### Parameters

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

`options`

</td>
<td>

`StoreOptions`\<`T`\>

</td>
<td>

Store configuration options

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
<td>

Type name for the cached items

</td>
</tr>
<tr>
<td>

`hash`

</td>
<td>

`string`

</td>
<td>

Unique hash for the type

</td>
</tr>
</tbody>
</table>

###### Returns

`StoreAdapter`\<`T`\>

###### Overrides

`Store.createStoreAdapter`
