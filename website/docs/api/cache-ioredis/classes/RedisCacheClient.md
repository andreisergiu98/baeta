# RedisCacheClient

## Extends

- [`CacheClient`](../../cache/index/classes/CacheClient.md)

## Constructors

### Constructor

> **new RedisCacheClient**(`redis`, `options?`): `RedisCacheClient`

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

`redis`

</td>
<td>

`Redis` \| `Cluster`

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`RedisCacheClientOptions`](../interfaces/RedisCacheClientOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`RedisCacheClient`

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`constructor`](../../cache/index/classes/CacheClient.md#constructor)

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="maxcommandkeyslimit"></a> `maxCommandKeysLimit`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="maxpipelinecommandlimit"></a> `maxPipelineCommandLimit`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="maxpipelinesizelimit"></a> `maxPipelineSizeLimit`

</td>
<td>

`protected`

</td>
<td>

`number`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="redis"></a> `redis`

</td>
<td>

`public`

</td>
<td>

`Redis` \| `Cluster`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="scripts"></a> `scripts`

</td>
<td>

`protected`

</td>
<td>

[`RedisScripts`](../../cache-redis-common/type-aliases/RedisScripts.md)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="options"></a> `options?`

</td>
<td>

`public`

</td>
<td>

[`CacheClientOptions`](../../cache/index/interfaces/CacheClientOptions.md)

</td>
<td>

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`options`](../../cache/index/classes/CacheClient.md#options)

</td>
</tr>
</tbody>
</table>

## Methods

### deleteItems()

> **deleteItems**(`keys`): `Promise`\<`void`\>

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
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`deleteItems`](../../cache/index/classes/CacheClient.md#deleteitems)

***

### deleteItemsWithDiff()

> **deleteItemsWithDiff**\<`Item`\>(`keys`, `options`): `Promise`\<(`Item` \| `null`)[]\>

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

[`CacheClientArgs`](../../cache/index/interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`Item` \| `null`)[]\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`deleteItemsWithDiff`](../../cache/index/classes/CacheClient.md#deleteitemswithdiff)

***

### deleteQueries()

> **deleteQueries**(`indexes`): `Promise`\<`void`\>

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
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`deleteQueries`](../../cache/index/classes/CacheClient.md#deletequeries)

***

### getPartialItems()

> **getPartialItems**\<`Item`\>(`keys`, `options`): `Promise`\<(`Item` \| `null`)[]\>

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

[`CacheClientArgs`](../../cache/index/interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`Item` \| `null`)[]\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`getPartialItems`](../../cache/index/classes/CacheClient.md#getpartialitems)

***

### getQuery()

> **getQuery**\<`QueryMetadata`\>(`key`, `options`): `Promise`\<`QueryMetadata` \| `null`\>

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

[`CacheClientArgs`](../../cache/index/interfaces/CacheClientArgs.md)\<`QueryMetadata`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`QueryMetadata` \| `null`\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`getQuery`](../../cache/index/classes/CacheClient.md#getquery)

***

### saveItems()

> **saveItems**\<`Item`\>(`items`, `options`, `saveOptions?`): `Promise`\<`void`\>

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

[`CacheClientArgs`](../../cache/index/interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
<tr>
<td>

`saveOptions`

</td>
<td>

[`CacheClientSaveOptions`](../../cache/index/interfaces/CacheClientSaveOptions.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`saveItems`](../../cache/index/classes/CacheClient.md#saveitems)

***

### saveItemsWithDiff()

> **saveItemsWithDiff**\<`Item`\>(`items`, `options`): `Promise`\<(`Item` \| `null`)[]\>

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

[`CacheClientArgs`](../../cache/index/interfaces/CacheClientArgs.md)\<`Item`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<(`Item` \| `null`)[]\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`saveItemsWithDiff`](../../cache/index/classes/CacheClient.md#saveitemswithdiff)

***

### saveQuery()

> **saveQuery**\<`QueryMetadata`\>(`key`, `indexes`, `metadata`, `options`): `Promise`\<`void`\>

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

[`CacheClientArgs`](../../cache/index/interfaces/CacheClientArgs.md)\<`QueryMetadata`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

[`CacheClient`](../../cache/index/classes/CacheClient.md).[`saveQuery`](../../cache/index/classes/CacheClient.md#savequery)
