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

- [`Store`](extension-cache.md#store)

#### Constructors

##### Constructor

> **new RedisStore**(`client`): [`RedisStore`](#redisstore)

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

[`RedisStore`](#redisstore)

###### Overrides

[`Store`](extension-cache.md#store).[`constructor`](extension-cache.md#store#constructor-1)

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

<a id="client"></a> `client`

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

> **createStoreAdapter**\<`T`\>(`serialzier`, `options`, `type`, `hash`): [`StoreAdapter`](extension-cache.md#storeadapter)\<`T`\>

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

`serialzier`

</td>
<td>

[`Serializer`](extension-cache.md#serializer-1)

</td>
<td>

Serializer instance

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`StoreOptions`](extension-cache.md#storeoptions)\<`T`\>

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

[`StoreAdapter`](extension-cache.md#storeadapter)\<`T`\>

###### Overrides

[`Store`](extension-cache.md#store).[`createStoreAdapter`](extension-cache.md#store#createstoreadapter)
