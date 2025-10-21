# CloudflareStoreAdapter\<Item\>

## Extends

- [`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md)\<`Item`\>

## Type Parameters

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

## Constructors

### Constructor

> **new CloudflareStoreAdapter**\<`Item`\>(`durableObject`, `serializer`, `options`, `type`, `hash`): `CloudflareStoreAdapter`\<`Item`\>

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

`durableObject`

</td>
<td>

`DurableObjectNamespace`

</td>
</tr>
<tr>
<td>

`serializer`

</td>
<td>

[`Serializer`](../../../extension-cache/interfaces/Serializer.md)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`StoreOptions`](../../../extension-cache/interfaces/StoreOptions.md)\<`Item`\>

</td>
</tr>
<tr>
<td>

`type`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`hash`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`CloudflareStoreAdapter`\<`Item`\>

#### Overrides

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`constructor`](../../../extension-cache/classes/StoreAdapter.md#constructor)

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

<a id="hash"></a> `hash`

</td>
<td>

`protected`

</td>
<td>

`string`

</td>
<td>

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`hash`](../../../extension-cache/classes/StoreAdapter.md#hash)

</td>
</tr>
<tr>
<td>

<a id="loader"></a> `loader`

</td>
<td>

`protected`

</td>
<td>

`DataLoader`\<[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md), `null` \| `Item`, [`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)\>

</td>
<td>

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`loader`](../../../extension-cache/classes/StoreAdapter.md#loader)

</td>
</tr>
<tr>
<td>

<a id="options"></a> `options`

</td>
<td>

`protected`

</td>
<td>

[`StoreOptions`](../../../extension-cache/interfaces/StoreOptions.md)\<`Item`\>

</td>
<td>

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`options`](../../../extension-cache/classes/StoreAdapter.md#options)

</td>
</tr>
<tr>
<td>

<a id="serializer"></a> `serializer`

</td>
<td>

`protected`

</td>
<td>

[`Serializer`](../../../extension-cache/interfaces/Serializer.md)

</td>
<td>

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`serializer`](../../../extension-cache/classes/StoreAdapter.md#serializer)

</td>
</tr>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`protected`

</td>
<td>

`string`

</td>
<td>

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`type`](../../../extension-cache/classes/StoreAdapter.md#type)

</td>
</tr>
</tbody>
</table>

## Methods

### createKey()

> `protected` **createKey**(`ref`): `string`

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

`ref`

</td>
<td>

[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createKey`](../../../extension-cache/classes/StoreAdapter.md#createkey)

---

### createKeyByItem()

> `protected` **createKeyByItem**(`item`): `string`

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

`item`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createKeyByItem`](../../../extension-cache/classes/StoreAdapter.md#createkeybyitem)

---

### createKeyByQuery()

> `protected` **createKeyByQuery**(`queryRef`, `parentRef?`, `args?`): `string`

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parentRef?`

</td>
<td>

[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createKeyByQuery`](../../../extension-cache/classes/StoreAdapter.md#createkeybyquery)

---

### createMiddleware()

> **createMiddleware**\<`Result`, `Root`, `Args`\>(`queryRef`, ...`args`): [`Middleware`](../../../core/index/type-aliases/Middleware.md)\<`Result`, `Root`, `unknown`, `Args`\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Args`

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

`queryRef`

</td>
<td>

[`CacheRef`](../../../extension-cache/classes/CacheRef.md)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`Root` _extends_ [`RefCompatibleRoot`](../../../extension-cache/type-aliases/RefCompatibleRoot.md) ? \[[`CacheMiddlewareOptions`](../../../extension-cache/interfaces/CacheMiddlewareOptions.md)\<`Root`\<`Root`\>\>\] : \[[`RequiredCacheMiddlewareOptions`](../../../extension-cache/interfaces/RequiredCacheMiddlewareOptions.md)\<`Root`\>\]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Middleware`](../../../core/index/type-aliases/Middleware.md)\<`Result`, `Root`, `unknown`, `Args`\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createMiddleware`](../../../extension-cache/classes/StoreAdapter.md#createmiddleware)

---

### createQueryKeyGlobMatcher()

> `protected` **createQueryKeyGlobMatcher**(`queryRef`, `parentRef`, `args`): `string`

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parentRef`

</td>
<td>

`NonNullable`\<[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)\>

</td>
</tr>
<tr>
<td>

`args`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createQueryKeyGlobMatcher`](../../../extension-cache/classes/StoreAdapter.md#createquerykeyglobmatcher)

---

### createQueryKeyHeader()

> `protected` **createQueryKeyHeader**(`parentRef`, `args?`): `string`

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

`parentRef`

</td>
<td>

[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createQueryKeyHeader`](../../../extension-cache/classes/StoreAdapter.md#createquerykeyheader)

---

### createQueryKeyNamespace()

> `protected` **createQueryKeyNamespace**(`queryRef`): `string`

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createQueryKeyNamespace`](../../../extension-cache/classes/StoreAdapter.md#createquerykeynamespace)

---

### createQueryKeyRegExpMatcher()

> `protected` **createQueryKeyRegExpMatcher**(`queryRef`, `parentRef`, `args`): `RegExp`

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parentRef`

</td>
<td>

`NonNullable`\<[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)\>

</td>
</tr>
<tr>
<td>

`args`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`RegExp`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`createQueryKeyRegExpMatcher`](../../../extension-cache/classes/StoreAdapter.md#createquerykeyregexpmatcher)

---

### decodeQueryItemRef()

> `protected` **decodeQueryItemRef**(`encodedRef`): `null` \| `string`

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

`encodedRef`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`null` \| `string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`decodeQueryItemRef`](../../../extension-cache/classes/StoreAdapter.md#decodequeryitemref)

---

### delete()

> **delete**(`ref`, `evictQueries?`): `Promise`\<`void`\>

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

`ref`

</td>
<td>

[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)

</td>
</tr>
<tr>
<td>

`evictQueries?`

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`delete`](../../../extension-cache/classes/StoreAdapter.md#delete)

---

### deleteMany()

> **deleteMany**(`refs`, `evictQueries`): `Promise`\<`void`\>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`refs`

</td>
<td>

[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`evictQueries`

</td>
<td>

`boolean`

</td>
<td>

`true`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.deleteMany`

---

### deleteQueries()

> **deleteQueries**\<`Result`, `Root`, `Args`\>(`queryRef?`, `matcher?`): `Promise`\<`void`\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Args`

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

`queryRef?`

</td>
<td>

[`CacheRef`](../../../extension-cache/classes/CacheRef.md)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher?`

</td>
<td>

[`CacheQueryMatching`](../../../extension-cache/type-aliases/CacheQueryMatching.md)\<`Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`deleteQueries`](../../../extension-cache/classes/StoreAdapter.md#deletequeries)

---

### deleteQueriesByRef()

> `protected` **deleteQueriesByRef**(`queryRef?`, `parentRef?`, `args?`): `Promise`\<`void`\>

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

`queryRef?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parentRef?`

</td>
<td>

[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.deleteQueriesByRef`

---

### encodeQueryItemRef()

> `protected` **encodeQueryItemRef**(`item`): `string`

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

`item`

</td>
<td>

`null` \| `Item`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`encodeQueryItemRef`](../../../extension-cache/classes/StoreAdapter.md#encodequeryitemref)

---

### get()

> **get**(`ref`): `Promise`\<`null` \| `Item`\>

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

`ref`

</td>
<td>

[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null` \| `Item`\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`get`](../../../extension-cache/classes/StoreAdapter.md#get)

---

### getMany()

#### Call Signature

> **getMany**(`refs`): `Promise`\<`null` \| `Item`[]\>

##### Parameters

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

`refs`

</td>
<td>

[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)[]

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`\<`null` \| `Item`[]\>

##### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`getMany`](../../../extension-cache/classes/StoreAdapter.md#getmany)

#### Call Signature

> **getMany**\<`T`\>(`refs`, `fallback`): `Promise`\<`Item`[]\>

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)

</td>
</tr>
</tbody>
</table>

##### Parameters

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

`refs`

</td>
<td>

`T`[]

</td>
</tr>
<tr>
<td>

`fallback`

</td>
<td>

(`refs`) => `Promise`\<`Item`[]\>

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`\<`Item`[]\>

##### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`getMany`](../../../extension-cache/classes/StoreAdapter.md#getmany)

---

### getPartialMany()

> **getPartialMany**(`refs`): `Promise`\<`null` \| (`null` \| `Item`)[]\>

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

`refs`

</td>
<td>

[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Overrides

`StoreAdapter.getPartialMany`

---

### getQueryResult()

> **getQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `matcher?`): `Promise`\<`null` \| \{ `query`: `Result`; \}\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Args`

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

`queryRef`

</td>
<td>

[`CacheRef`](../../../extension-cache/classes/CacheRef.md)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher?`

</td>
<td>

[`CacheQueryMatching`](../../../extension-cache/type-aliases/CacheQueryMatching.md)\<`Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null` \| \{ `query`: `Result`; \}\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`getQueryResult`](../../../extension-cache/classes/StoreAdapter.md#getqueryresult)

---

### getRef()

> `protected` **getRef**(`root`): [`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)

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

`root`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

#### Returns

[`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`getRef`](../../../extension-cache/classes/StoreAdapter.md#getref)

---

### getRevision()

> `protected` **getRevision**(): `string`

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`getRevision`](../../../extension-cache/classes/StoreAdapter.md#getrevision)

---

### getTtl()

> `protected` **getTtl**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

---

### loaderFn()

> `protected` **loaderFn**(`refs`): `Promise`\<`any`[]\>

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

`refs`

</td>
<td>

readonly [`ItemRef`](../../../extension-cache/type-aliases/ItemRef.md)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`loaderFn`](../../../extension-cache/classes/StoreAdapter.md#loaderfn)

---

### loadQueryMetadata()

> `protected` **loadQueryMetadata**(`queryRef`, `parentRef?`, `args?`): `Promise`\<`null` \| `string`[]\>

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parentRef?`

</td>
<td>

[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`null` \| `string`[]\>

#### Overrides

`StoreAdapter.loadQueryMetadata`

---

### parseItem()

> `protected` **parseItem**(`value`): `Item`

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

`value`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Item`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`parseItem`](../../../extension-cache/classes/StoreAdapter.md#parseitem)

---

### save()

> **save**(`item`): `Promise`\<`void`\>

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

`item`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`save`](../../../extension-cache/classes/StoreAdapter.md#save)

---

### saveMany()

> **saveMany**(`items`): `Promise`\<`void`\>

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

`Item`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.saveMany`

---

### saveQueryMetadata()

> `protected` **saveQueryMetadata**(`queryRef`, `meta`, `parentRef?`, `args?`): `Promise`\<`void`\>

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`meta`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`parentRef?`

</td>
<td>

[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)

</td>
</tr>
<tr>
<td>

`args?`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.saveQueryMetadata`

---

### saveQueryResult()

> **saveQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `data`, `matcher?`): `Promise`\<`void`\>

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

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Args`

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

`queryRef`

</td>
<td>

[`CacheRef`](../../../extension-cache/classes/CacheRef.md)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`data`

</td>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`matcher?`

</td>
<td>

[`CacheQueryMatching`](../../../extension-cache/type-aliases/CacheQueryMatching.md)\<`Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`saveQueryResult`](../../../extension-cache/classes/StoreAdapter.md#savequeryresult)

---

### searchQueries()

> `protected` **searchQueries**(`queryRef`, `parentRef`, `args`): `Promise`\<`string`[]\>

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`queryRef`

</td>
<td>

`string`

</td>
<td>

`'*'`

</td>
</tr>
<tr>
<td>

`parentRef`

</td>
<td>

`NonNullable`\<[`ParentRef`](../../../extension-cache/type-aliases/ParentRef.md)\>

</td>
<td>

`'*'`

</td>
</tr>
<tr>
<td>

`args`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
<td>

`{}`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`string`[]\>

---

### stringifyItem()

> `protected` **stringifyItem**(`item`): `string`

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

`item`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

#### Inherited from

[`StoreAdapter`](../../../extension-cache/classes/StoreAdapter.md).[`stringifyItem`](../../../extension-cache/classes/StoreAdapter.md#stringifyitem)
