# @baeta/extension-cache

## Classes

### CacheRef\<Result, Root, Args\>

Cache reference for a type field or query

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

#### Constructors

##### new CacheRef()

> **new CacheRef**\<`Result`, `Root`, `Args`\>(`type`, `field`, `hash`, `revision`): [`CacheRef`](index.md#cacherefresult-root-args)\<`Result`, `Root`, `Args`\>

###### Parameters

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

`type`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`field`

</td>
<td>

`string`

</td>
<td>

`undefined`

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

`undefined`

</td>
</tr>
<tr>
<td>

`revision`

</td>
<td>

`number`

</td>
<td>

`1`

</td>
</tr>
</tbody>
</table>

###### Returns

[`CacheRef`](index.md#cacherefresult-root-args)\<`Result`, `Root`, `Args`\>

#### Methods

##### getHash()

> **getHash**(): `string`

###### Returns

`string`

##### getRevision()

> **getRevision**(): `number`

###### Returns

`number`

##### setRevision()

> **setRevision**(`revision`): `void`

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

`revision`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`void`

##### toString()

> **toString**(): `string`

###### Returns

`string`

---

### `abstract` Store

Base class for cache storage implementations

#### Constructors

##### new Store()

> **new Store**(): [`Store`](index.md#store)

###### Returns

[`Store`](index.md#store)

#### Methods

##### createStoreAdapter()

> `abstract` **createStoreAdapter**\<`T`\>(`serializer`, `options`, `type`, `hash`): [`StoreAdapter`](index.md#storeadapteritem)\<`T`\>

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

`serializer`

</td>
<td>

[`Serializer`](index.md#serializer-1)

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

[`StoreOptions`](index.md#storeoptionsroot)\<`T`\>

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

[`StoreAdapter`](index.md#storeadapteritem)\<`T`\>

---

### `abstract` StoreAdapter\<Item\>

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

#### Constructors

##### new StoreAdapter()

> **new StoreAdapter**\<`Item`\>(`serializer`, `options`, `type`, `hash`): [`StoreAdapter`](index.md#storeadapteritem)\<`Item`\>

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

`serializer`

</td>
<td>

[`Serializer`](index.md#serializer-1)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`StoreOptions`](index.md#storeoptionsroot)\<`Item`\>

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

###### Returns

[`StoreAdapter`](index.md#storeadapteritem)\<`Item`\>

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

<a id="deletemany"></a> `deleteMany`

</td>
<td>

`abstract`

</td>
<td>

(`refs`: [`ItemRef`](index.md#itemref)[], `evictQueries`?: `boolean`) => `Promise`\<`void`\>

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

\<`Result`, `Root`, `Args`\>(`queryRef`?: `string`, `parentRef`?: [`ParentRef`](index.md#parentref-1), `args`?: `Record`\<`string`, `unknown`\>) => `Promise`\<`void`\>

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

(`refs`: [`ItemRef`](index.md#itemref)[]) => `Promise`\<`null` \| (`null` \| `Item`)[]\>

</td>
</tr>
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
</tr>
<tr>
<td>

<a id="loader"></a> `loader`

</td>
<td>

`protected`

</td>
<td>

`DataLoader`\<[`ItemRef`](index.md#itemref), `null` \| `Item`, [`ItemRef`](index.md#itemref)\>

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

(`queryRef`: `string`, `parentRef`?: [`ParentRef`](index.md#parentref-1), `args`?: `Record`\<`string`, `unknown`\>) => `Promise`\<`null` \| `string`[]\>

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

[`StoreOptions`](index.md#storeoptionsroot)\<`Item`\>

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

(`items`: `Item`[]) => `Promise`\<`void`\>

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

(`queryRef`: `string`, `meta`: `string`[], `parentRef`?: [`ParentRef`](index.md#parentref-1), `args`?: `Record`\<`string`, `unknown`\>) => `Promise`\<`void`\>

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

[`Serializer`](index.md#serializer-1)

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

#### Methods

##### createKey()

> `protected` **createKey**(`ref`): `string`

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

`ref`

</td>
<td>

[`ItemRef`](index.md#itemref)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### createKeyByItem()

> `protected` **createKeyByItem**(`item`): `string`

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

`item`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### createKeyByQuery()

> `protected` **createKeyByQuery**(`queryRef`, `parentRef`?, `args`?): `string`

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`parentRef`?

</td>
<td>

[`ParentRef`](index.md#parentref-1)

</td>
</tr>
<tr>
<td>

`args`?

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### createMiddleware()

> **createMiddleware**\<`Result`, `Root`, `Args`\>(`queryRef`, ...`args`): `Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

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

`queryRef`

</td>
<td>

[`CacheRef`](index.md#cacherefresult-root-args)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`Root` _extends_ [`RefCompatibleRoot`](index.md#refcompatibleroot) ? \[[`CacheMiddlewareOptions`](index.md#cachemiddlewareoptionsroot)\<`Root`\<`Root`\>\>\] : \[[`RequiredCacheMiddlewareOptions`](index.md#requiredcachemiddlewareoptionsroot)\<`Root`\>\]

</td>
</tr>
</tbody>
</table>

###### Returns

`Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

##### createQueryKeyGlobMatcher()

> `protected` **createQueryKeyGlobMatcher**(`queryRef`, `parentRef`, `args`): `string`

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

`NonNullable`\<[`ParentRef`](index.md#parentref-1)\>

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

###### Returns

`string`

##### createQueryKeyHeader()

> `protected` **createQueryKeyHeader**(`parentRef`, `args`?): `string`

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

`parentRef`

</td>
<td>

[`ParentRef`](index.md#parentref-1)

</td>
</tr>
<tr>
<td>

`args`?

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### createQueryKeyNamespace()

> `protected` **createQueryKeyNamespace**(`queryRef`): `string`

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

`queryRef`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### createQueryKeyRegExpMatcher()

> `protected` **createQueryKeyRegExpMatcher**(`queryRef`, `parentRef`, `args`): `RegExp`

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

`NonNullable`\<[`ParentRef`](index.md#parentref-1)\>

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

###### Returns

`RegExp`

##### decodeQueryItemRef()

> `protected` **decodeQueryItemRef**(`encodedRef`): `null` \| `string`

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

`encodedRef`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`null` \| `string`

##### delete()

> **delete**(`ref`, `evictQueries`?): `Promise`\<`void`\>

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

`ref`

</td>
<td>

[`ItemRef`](index.md#itemref)

</td>
</tr>
<tr>
<td>

`evictQueries`?

</td>
<td>

`boolean`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### deleteQueries()

> **deleteQueries**\<`Result`, `Root`, `Args`\>(`queryRef`?, `matcher`?): `Promise`\<`void`\>

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

`queryRef`?

</td>
<td>

[`CacheRef`](index.md#cacherefresult-root-args)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher`?

</td>
<td>

[`CacheQueryMatching`](index.md#cachequerymatchingargs)\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### encodeQueryItemRef()

> `protected` **encodeQueryItemRef**(`item`): `string`

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

`item`

</td>
<td>

`null` \| `Item`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

##### get()

> **get**(`ref`): `Promise`\<`null` \| `Item`\>

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

`ref`

</td>
<td>

[`ItemRef`](index.md#itemref)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Item`\>

##### getMany()

###### Call Signature

> **getMany**(`refs`): `Promise`\<`null` \| `Item`[]\>

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

`refs`

</td>
<td>

[`ItemRef`](index.md#itemref)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Item`[]\>

###### Call Signature

> **getMany**\<`T`\>(`refs`, `fallback`): `Promise`\<`Item`[]\>

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

`T` _extends_ [`ItemRef`](index.md#itemref)

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

###### Returns

`Promise`\<`Item`[]\>

##### getQueryResult()

> **getQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `matcher`?): `Promise`\<`null` \| \{ `query`: `Result`; \}\>

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

`queryRef`

</td>
<td>

[`CacheRef`](index.md#cacherefresult-root-args)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher`?

</td>
<td>

[`CacheQueryMatching`](index.md#cachequerymatchingargs)\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| \{ `query`: `Result`; \}\>

##### getRef()

> `protected` **getRef**(`root`): [`ItemRef`](index.md#itemref)

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

`root`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

###### Returns

[`ItemRef`](index.md#itemref)

##### getRevision()

> `protected` **getRevision**(): `string`

###### Returns

`string`

##### loaderFn()

> `protected` **loaderFn**(`refs`): `Promise`\<`any`[]\>

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

`refs`

</td>
<td>

readonly [`ItemRef`](index.md#itemref)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`any`[]\>

##### parseItem()

> `protected` **parseItem**(`value`): `Item`

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

`value`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Item`

##### save()

> **save**(`item`): `Promise`\<`void`\>

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

`item`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### saveQueryResult()

> **saveQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `data`, `matcher`?): `Promise`\<`void`\>

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

`queryRef`

</td>
<td>

[`CacheRef`](index.md#cacherefresult-root-args)\<`Result`, `Root`, `Args`\>

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

`matcher`?

</td>
<td>

[`CacheQueryMatching`](index.md#cachequerymatchingargs)\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### stringifyItem()

> `protected` **stringifyItem**(`item`): `string`

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

`item`

</td>
<td>

`Item`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

## Interfaces

### CacheMiddlewareOptions\<Root\>

Options for cache middleware

#### Extended by

- [`RequiredCacheMiddlewareOptions`](index.md#requiredcachemiddlewareoptionsroot)

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

`Root`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="getrootref"></a> `getRootRef?`

</td>
<td>

(`root`: `Root`) => [`ItemRef`](index.md#itemref)

</td>
<td>

Function to extract object reference id

</td>
</tr>
</tbody>
</table>

---

### DefaultStoreOptions

Default options for cache stores

#### Extended by

- [`StoreOptions`](index.md#storeoptionsroot)

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="ttl"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

```ts
3600;
```

</td>
<td>

Time-to-live in seconds

</td>
</tr>
</tbody>
</table>

---

### RequiredCacheMiddlewareOptions\<Root\>

Required options for cache middleware

#### Extends

- [`CacheMiddlewareOptions`](index.md#cachemiddlewareoptionsroot)\<`Root`\>

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

`Root`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
<th>Overrides</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="getrootref-1"></a> `getRootRef`

</td>
<td>

(`root`: `Root`) => [`ItemRef`](index.md#itemref)

</td>
<td>

Function to extract object reference id

</td>
<td>

[`CacheMiddlewareOptions`](index.md#cachemiddlewareoptionsroot).[`getRootRef`](index.md#getrootref)

</td>
</tr>
</tbody>
</table>

---

### RequiredStoreOptions\<Root\>

Required configuration options for cache stores

#### Extends

- [`StoreOptions`](index.md#storeoptionsroot)\<`Root`\>

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

`Root`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
<th>Overrides</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="getref-1"></a> `getRef`

</td>
<td>

(`root`: `Root`) => [`ItemRef`](index.md#itemref)

</td>
<td>

`undefined`

</td>
<td>

Function to extract object reference id

</td>
<td>

[`StoreOptions`](index.md#storeoptionsroot).[`getRef`](index.md#getref-2)

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="revision"></a> `revision?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Manual cache version for invalidation

</td>
<td>

&hyphen;

</td>
<td>

[`StoreOptions`](index.md#storeoptionsroot).[`revision`](index.md#revision-1)

</td>
</tr>
<tr>
<td>

<a id="ttl-1"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

```ts
3600;
```

</td>
<td>

Time-to-live in seconds

</td>
<td>

&hyphen;

</td>
<td>

[`StoreOptions`](index.md#storeoptionsroot).[`ttl`](index.md#ttl-2)

</td>
</tr>
</tbody>
</table>

---

### Serializer

#### Methods

##### deserialize()

> **deserialize**\<`T`\>(`payload`): `T`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`unknown`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`payload`

</td>
<td>

[`SerializerResult`](index.md#serializerresult)

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### parse()

> **parse**\<`T`\>(`string`): `T`

###### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

`unknown`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`T`

##### serialize()

> **serialize**(`object`): [`SerializerResult`](index.md#serializerresult)

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

`object`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

[`SerializerResult`](index.md#serializerresult)

##### stringify()

> **stringify**(`object`): `string`

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

`object`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

---

### SerializerResult

#### Properties

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

<a id="json"></a> `json`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

<a id="meta"></a> `meta?`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`meta.referentialEqualities?`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`meta.values?`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

---

### StoreOptions\<Root\>

Configuration options for cache stores

#### Extends

- [`DefaultStoreOptions`](index.md#defaultstoreoptions)

#### Extended by

- [`RequiredStoreOptions`](index.md#requiredstoreoptionsroot)

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

`Root`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
<th>Inherited from</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="getref-2"></a> `getRef?`

</td>
<td>

(`root`: `Root`) => [`ItemRef`](index.md#itemref)

</td>
<td>

`undefined`

</td>
<td>

Function to extract object reference id

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="revision-1"></a> `revision?`

</td>
<td>

`number`

</td>
<td>

`undefined`

</td>
<td>

Manual cache version for invalidation

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="ttl-2"></a> `ttl?`

</td>
<td>

`number`

</td>
<td>

```ts
3600;
```

</td>
<td>

Time-to-live in seconds

</td>
<td>

[`DefaultStoreOptions`](index.md#defaultstoreoptions).[`ttl`](index.md#ttl)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### CacheArgs\<T\>

> **CacheArgs**\<`T`\>: `{ [P in keyof T]?: T[P] extends object ? CacheArgs<T[P]> : T[P] }`

Optional query arguments

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

---

### CacheQueryMatching\<Args\>

> **CacheQueryMatching**\<`Args`\>: `object`

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

`Args`

</td>
</tr>
</tbody>
</table>

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="args"></a> `args`?

</td>
<td>

[`CacheArgs`](index.md#cacheargst)\<`Args`\>

</td>
</tr>
<tr>
<td>

<a id="parentref"></a> `parentRef`?

</td>
<td>

[`ParentRef`](index.md#parentref-1)

</td>
</tr>
</tbody>
</table>

---

### ClassTransformer

> **ClassTransformer**: `object`

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="class"></a> `class`

</td>
<td>

[`SerializerClass`](index.md#serializerclass)

</td>
</tr>
<tr>
<td>

<a id="kind"></a> `kind`

</td>
<td>

`"class"`

</td>
</tr>
<tr>
<td>

<a id="allowprops"></a> `allowProps`?

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

<a id="identifier"></a> `identifier`?

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### CustomTransformer\<Input, Output\>

> **CustomTransformer**\<`Input`, `Output`\>: `object`

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

`Input`

</td>
</tr>
<tr>
<td>

`Output` _extends_ [`SerializerValue`](index.md#serializervalue)

</td>
</tr>
</tbody>
</table>

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize-1"></a> `deserialize`

</td>
<td>

(`value`) => `Input`

</td>
</tr>
<tr>
<td>

<a id="isapplicable"></a> `isApplicable`

</td>
<td>

(`value`) => `value is Input`

</td>
</tr>
<tr>
<td>

<a id="kind-1"></a> `kind`

</td>
<td>

`"custom"`

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="serialize-1"></a> `serialize`

</td>
<td>

(`value`) => `Output`

</td>
</tr>
</tbody>
</table>

---

### ItemRef

> **ItemRef**: `string` \| `number` \| `bigint`

Reference type for cached items

---

### ParentRef

> **ParentRef**: [`ItemRef`](index.md#itemref) \| `null` \| `undefined`

Reference type for query parent

---

### RefCompatibleRoot

> **RefCompatibleRoot**: \{ `id`: `string` \| `number` \| `bigint`; \} \| \{\}

Type constraint for objects that are compatible with default cache ref

---

### SerializerAny

> **SerializerAny**: `any`

---

### SerializerClass()

> **SerializerClass**: (...`args`) => `any`

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

...`args`

</td>
<td>

`any`[]

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

---

### SerializerTransformer\<Input, Output\>

> **SerializerTransformer**\<`Input`, `Output`\>: [`CustomTransformer`](index.md#customtransformerinput-output)\<`Input`, `Output`\> \| [`ClassTransformer`](index.md#classtransformer) \| [`SymbolTransformer`](index.md#symboltransformer)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Input`

</td>
<td>

[`SerializerAny`](index.md#serializerany)

</td>
</tr>
<tr>
<td>

`Output` _extends_ [`SerializerValue`](index.md#serializervalue)

</td>
<td>

[`SerializerAny`](index.md#serializerany)

</td>
</tr>
</tbody>
</table>

---

### SerializerValue

> **SerializerValue**: `string` \| `number` \| `boolean` \| `undefined` \| `null` \| [`SerializerValue`](index.md#serializervalue)[] \| \{\}

---

### SymbolTransformer

> **SymbolTransformer**: `object`

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="kind-2"></a> `kind`

</td>
<td>

`"symbol"`

</td>
</tr>
<tr>
<td>

<a id="symbol"></a> `symbol`

</td>
<td>

`symbol`

</td>
</tr>
<tr>
<td>

<a id="identifier-1"></a> `identifier`?

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Functions

### cacheExtension()

> **cacheExtension**(`store`, `options`?, `transformers`?): () => `Extension`

Creates a cache extension

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

`store`

</td>
<td>

[`Store`](index.md#store)

</td>
<td>

Storage adapter implementation

</td>
</tr>
<tr>
<td>

`options`?

</td>
<td>

[`DefaultStoreOptions`](index.md#defaultstoreoptions)

</td>
<td>

Default caching options

</td>
</tr>
<tr>
<td>

`transformers`?

</td>
<td>

[`SerializerTransformer`](index.md#serializertransformerinput-output)[]

</td>
<td>

Serializer transformers for custom scalars that are not serializable by default

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

Extension factory function

##### Returns

`Extension`

#### Example

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

---

### createSerializer()

> **createSerializer**\<`Input`, `Output`\>(`serializers`?): [`Serializer`](index.md#serializer-1)

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Input`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`Output` _extends_ [`SerializerValue`](index.md#serializervalue)

</td>
<td>

`any`

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

`serializers`?

</td>
<td>

[`SerializerTransformer`](index.md#serializertransformerinput-output)\<`Input`, `Output`\>[]

</td>
</tr>
</tbody>
</table>

#### Returns

[`Serializer`](index.md#serializer-1)
