# @baeta/extension-cache-redis

## Classes

### RedisStore

Redis-based cache store implementation.
Provides a high-performance caching solution recommended for production environments.

#### Example

```typescript
import { RedisStore } from "@baeta/extension-cache-redis";
import Redis from "ioredis";

const redis = new Redis("redis://localhost:6379");
const store = new RedisStore(redis);

// Use with cache extension
const cacheExt = cacheExtension(store, {
  ttl: 3600,
});
```

#### Extends

- `Store`

#### Constructors

##### new RedisStore()

> **new RedisStore**(`client`): [`RedisStore`](index.md#redisstore)

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

[`RedisStore`](index.md#redisstore)

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
