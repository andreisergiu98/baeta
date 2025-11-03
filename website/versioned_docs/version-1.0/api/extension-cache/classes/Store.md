# `abstract` Store

Base class for cache storage implementations

## Extended by

- [`KeyvStore`](../../extension-cache-keyv/classes/KeyvStore.md)
- [`RedisStore`](../../extension-cache-redis/classes/RedisStore.md)
- [`UpstashStore`](../../extension-cache-upstash/classes/UpstashStore.md)

## Constructors

### Constructor

> **new Store**(): `Store`

#### Returns

`Store`

## Methods

### createStoreAdapter()

> `abstract` **createStoreAdapter**\<`T`\>(`serializer`, `options`, `type`, `hash`): [`StoreAdapter`](StoreAdapter.md)\<`T`\>

Creates a new store adapter for a specific type

#### Type Parameters

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

#### Parameters

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

`serializer`

</td>
<td>

[`Serializer`](../interfaces/Serializer.md)

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

[`StoreOptions`](../interfaces/StoreOptions.md)\<`T`\>

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

#### Returns

[`StoreAdapter`](StoreAdapter.md)\<`T`\>
