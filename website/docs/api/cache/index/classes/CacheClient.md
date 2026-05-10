# CacheClient

## Extended by

- [`CloudflareCacheClient`](../../../cache-cloudflare/index/classes/CloudflareCacheClient.md)
- [`RedisCacheClient`](../../../cache-ioredis/classes/RedisCacheClient.md)
- [`ValkeyCacheClient`](../../../cache-iovalkey/classes/ValkeyCacheClient.md)
- [`UpstashCacheClient`](../../../cache-upstash/classes/UpstashCacheClient.md)

## Constructors

### Constructor

> **new CacheClient**(`options?`): `CacheClient`

#### Parameters

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

`options?`

</td>
<td>

[`CacheClientOptions`](../interfaces/CacheClientOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`CacheClient`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="options"></a> `options?`

</td>
<td>

[`CacheClientOptions`](../interfaces/CacheClientOptions.md)

</td>
</tr>
</tbody>
</table>

## Methods

### deleteItems()

> `abstract` **deleteItems**\<`Item`\>(`keys`, `options`): `Promise`\<`void`\>

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

`Item`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`keys`

</td>
<td>

`` `${string}:${string}:item:rev_${string}:id:${string}` ``[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### deleteItemsWithDiff()

> `abstract` **deleteItemsWithDiff**\<`Item`\>(`keys`, `options`): `Promise`\<(`Item` \| `null`)[]\>

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

`Item`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`keys`

</td>
<td>

`` `${string}:${string}:item:rev_${string}:id:${string}` ``[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`Item` \| `null`)[]\>

***

### deleteQueries()

> `abstract` **deleteQueries**\<`QueryMetadata`\>(`indexes`, `options`): `Promise`\<`void`\>

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

`QueryMetadata`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`indexes`

</td>
<td>

`` `${string}:${string}:query:${string}:rev_${string}:idx:${string}` ``[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`QueryMetadata`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### getPartialItems()

> `abstract` **getPartialItems**\<`Item`\>(`keys`, `options`): `Promise`\<(`Item` \| `null`)[]\>

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

`Item`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`keys`

</td>
<td>

`` `${string}:${string}:item:rev_${string}:id:${string}` ``[]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`Item` \| `null`)[]\>

***

### getQuery()

> `abstract` **getQuery**\<`QueryMetadata`\>(`key`, `options`): `Promise`\<`QueryMetadata` \| `null`\>

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

`QueryMetadata`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

`` `${string}:${string}:query:${string}:rev_${string}:id:${string}` ``

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`QueryMetadata`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`QueryMetadata` \| `null`\>

***

### saveItems()

> `abstract` **saveItems**\<`Item`\>(`items`, `options`, `saveOptions?`): `Promise`\<`void`\>

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

`Item`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`items`

</td>
<td>

\[`` `${string}:${string}:item:rev_${string}:id:${string}` ``, `Item`\][]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
<tr>
<td>

`saveOptions?`

</td>
<td>

[`CacheClientSaveOptions`](../interfaces/CacheClientSaveOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### saveItemsWithDiff()

> `abstract` **saveItemsWithDiff**\<`Item`\>(`items`, `options`): `Promise`\<(`Item` \| `null`)[]\>

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

`Item`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`items`

</td>
<td>

\[`` `${string}:${string}:item:rev_${string}:id:${string}` ``, `Item`\][]

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`Item` \| `null`)[]\>

***

### saveQuery()

> `abstract` **saveQuery**\<`QueryMetadata`\>(`key`, `indexes`, `metadata`, `options`): `Promise`\<`void`\>

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

`QueryMetadata`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

`` `${string}:${string}:query:${string}:rev_${string}:id:${string}` ``

</td>
</tr>
<tr>
<td>

`indexes`

</td>
<td>

`` `${string}:${string}:query:${string}:rev_${string}:idx:${string}` ``[]

</td>
</tr>
<tr>
<td>

`metadata`

</td>
<td>

`QueryMetadata`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`CacheClientArgs`](../interfaces/CacheClientArgs.md)\<`QueryMetadata`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>
