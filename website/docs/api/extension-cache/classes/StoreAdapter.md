# StoreAdapter\<Item\>

## Extended by

- [`CloudflareStoreAdapter`](../../extension-cache-cloudflare/index/classes/CloudflareStoreAdapter.md)

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

> **new StoreAdapter**\<`Item`\>(`serializer`, `options`, `type`): `StoreAdapter`\<`Item`\>

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

`serializer`

</td>
<td>

[`Serializer`](../interfaces/Serializer.md)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`StoreOptions`](../interfaces/StoreOptions.md)\<`Item`\>

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
</tbody>
</table>

#### Returns

`StoreAdapter`\<`Item`\>

## Properties

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

<a id="deletemany"></a> `deleteMany`

</td>
<td>

`abstract`

</td>
<td>

(`refs`, `evictQueries?`) => `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

<a id="deletequeriesbyref"></a> `deleteQueriesByRef`

</td>
<td>

`abstract`

</td>
<td>

\<`Result`, `Root`, `Args`\>(`queryRef?`, `parentRef?`, `args?`) => `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

<a id="getpartialmany"></a> `getPartialMany`

</td>
<td>

`abstract`

</td>
<td>

(`refs`) => `Promise`\<(`Item` \| `null`)[] \| `null`\>

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

`DataLoader`\<[`ItemRef`](../type-aliases/ItemRef.md), `Item` \| `null`, [`ItemRef`](../type-aliases/ItemRef.md)\>

</td>
</tr>
<tr>
<td>

<a id="loadquerymetadata"></a> `loadQueryMetadata`

</td>
<td>

`abstract`

</td>
<td>

(`queryRef`, `parentRef?`, `args?`) => `Promise`\<`string`[] \| `null`\>

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

[`StoreOptions`](../interfaces/StoreOptions.md)\<`Item`\>

</td>
</tr>
<tr>
<td>

<a id="savemany"></a> `saveMany`

</td>
<td>

`abstract`

</td>
<td>

(`items`) => `Promise`\<`void`\>

</td>
</tr>
<tr>
<td>

<a id="savequerymetadata"></a> `saveQueryMetadata`

</td>
<td>

`abstract`

</td>
<td>

(`queryRef`, `meta`, `parentRef?`, `args?`) => `Promise`\<`void`\>

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

[`Serializer`](../interfaces/Serializer.md)

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

[`ItemRef`](../type-aliases/ItemRef.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

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

[`ParentRef`](../type-aliases/ParentRef.md)

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

---

### createMiddleware()

> **createMiddleware**\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`queryRef`, ...`optionsArray`): [`Middleware`](../../core/index/type-aliases/Middleware.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

`Source`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
<tr>
<td>

`Info`

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

[`CacheRef`](CacheRef.md)\<`Result`, `Source`, `Args`\>

</td>
</tr>
<tr>
<td>

...`optionsArray`

</td>
<td>

`Source` _extends_ [`RefCompatibleRoot`](../type-aliases/RefCompatibleRoot.md) ? \[[`CacheMiddlewareOptions`](../interfaces/CacheMiddlewareOptions.md)\<`Source`\<`Source`\>\>\] : \[[`RequiredCacheMiddlewareOptions`](../interfaces/RequiredCacheMiddlewareOptions.md)\<`Source`\>\]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Middleware`](../../core/index/type-aliases/Middleware.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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

`NonNullable`\<[`ParentRef`](../type-aliases/ParentRef.md)\>

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

[`ParentRef`](../type-aliases/ParentRef.md)

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

`NonNullable`\<[`ParentRef`](../type-aliases/ParentRef.md)\>

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

---

### decodeQueryItemRef()

> `protected` **decodeQueryItemRef**(`encodedRef`): `string` \| `null`

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

`string` \| `null`

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

[`ItemRef`](../type-aliases/ItemRef.md)

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

[`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher?`

</td>
<td>

[`CacheQueryMatching`](../type-aliases/CacheQueryMatching.md)\<`Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

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

`Item` \| `null`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

---

### get()

> **get**(`ref`): `Promise`\<`Item` \| `null`\>

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

[`ItemRef`](../type-aliases/ItemRef.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`Item` \| `null`\>

---

### getMany()

#### Call Signature

> **getMany**(`refs`): `Promise`\<`Item`[] \| `null`\>

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

[`ItemRef`](../type-aliases/ItemRef.md)[]

</td>
</tr>
</tbody>
</table>

##### Returns

`Promise`\<`Item`[] \| `null`\>

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

`T` _extends_ [`ItemRef`](../type-aliases/ItemRef.md)

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

---

### getQueryResult()

> **getQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `matcher?`): `Promise`\<\{ `query`: `Result`; \} \| `null`\>

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

[`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher?`

</td>
<td>

[`CacheQueryMatching`](../type-aliases/CacheQueryMatching.md)\<`Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<\{ `query`: `Result`; \} \| `null`\>

---

### getRef()

> `protected` **getRef**(`root`): [`ItemRef`](../type-aliases/ItemRef.md)

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

[`ItemRef`](../type-aliases/ItemRef.md)

---

### getRevision()

> `protected` **getRevision**(): `string`

#### Returns

`string`

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

readonly [`ItemRef`](../type-aliases/ItemRef.md)[]

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`any`[]\>

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

[`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

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

[`CacheQueryMatching`](../type-aliases/CacheQueryMatching.md)\<`Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

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
