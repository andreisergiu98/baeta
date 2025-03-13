# index

## Classes

### BaetaCache

#### Implements

- `DurableObject`

#### Constructors

##### new BaetaCache()

> **new BaetaCache**(`state`, `env`): [`BaetaCache`](module_index.md#baetacache)

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

`state`

</td>
<td>

`DurableObjectState`

</td>
</tr>
<tr>
<td>

`env`

</td>
<td>

\{\}

</td>
</tr>
</tbody>
</table>

###### Returns

[`BaetaCache`](module_index.md#baetacache)

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

<a id="env"></a> `env`

</td>
<td>

`public`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

<a id="state"></a> `state`

</td>
<td>

`public`

</td>
<td>

`DurableObjectState`

</td>
</tr>
</tbody>
</table>

#### Methods

##### alarm()

> **alarm**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

###### Implementation of

`DurableObject.alarm`

##### delete()

> **delete**(`keys`): `Promise`\<`null`\>

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

`keys`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null`\>

##### fetch()

> **fetch**(`request`): `Promise`\<`Response`\>

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

`request`

</td>
<td>

`Request`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`Response`\>

###### Implementation of

`DurableObject.fetch`

##### flush()

> **flush**(): `Promise`\<`null`\>

###### Returns

`Promise`\<`null`\>

##### get()

> **get**(`keys`): `Promise`\<`string`\>

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

`keys`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`string`\>

##### handleEviction()

> **handleEviction**(): `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

##### list()

> **list**(`prefix`, `startAfter`?, `limit`?): `Promise`\<`string`\>

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

`prefix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`startAfter`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`limit`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`string`\>

##### put()

> **put**(`values`, `ttl`?): `Promise`\<`null`\>

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

`values`

</td>
<td>

\[`string`, `string`\][]

</td>
</tr>
<tr>
<td>

`ttl`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null`\>

##### scheduledEviction()

> **scheduledEviction**(`at`): `Promise`\<`void`\>

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

`at`

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

---

### CloudflareCacheClient

#### Constructors

##### new CloudflareCacheClient()

> **new CloudflareCacheClient**(`durableObject`): [`CloudflareCacheClient`](module_index.md#cloudflarecacheclient)

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

`durableObject`

</td>
<td>

`DurableObjectNamespace`

</td>
</tr>
</tbody>
</table>

###### Returns

[`CloudflareCacheClient`](module_index.md#cloudflarecacheclient)

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

<a id="durableobject"></a> `durableObject`

</td>
<td>

`public`

</td>
<td>

`DurableObjectNamespace`

</td>
</tr>
</tbody>
</table>

#### Methods

##### delete()

> **delete**(`keys`): `Promise`\<`null`\>

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

`keys`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null`\>

##### deleteOne()

> **deleteOne**(`key`): `Promise`\<`null`\>

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

`key`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null`\>

##### flush()

> **flush**(): `Promise`\<`null`\>

###### Returns

`Promise`\<`null`\>

##### get()

> **get**(`keys`): `Promise`\<(`null` \| `string`)[]\>

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

`keys`

</td>
<td>

`string`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<(`null` \| `string`)[]\>

##### getOne()

> **getOne**(`key`): `Promise`\<`null` \| `string`\>

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

`key`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `string`\>

##### list()

> **list**(`prefix`, `startAfter`?, `limit`?): `Promise`\<`string`[]\>

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

`prefix`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`startAfter`?

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`limit`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`string`[]\>

##### put()

> **put**(`values`, `ttl`?): `Promise`\<`null`\>

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

`values`

</td>
<td>

\[`string`, `string`\][]

</td>
</tr>
<tr>
<td>

`ttl`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null`\>

##### putOne()

> **putOne**(`key`, `value`, `ttl`?): `Promise`\<`null`\>

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

`key`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`ttl`?

</td>
<td>

`number`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null`\>

---

### CloudflareStoreAdapter\<Item\>

#### Extends

- `StoreAdapter`\<`Item`\>

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

##### new CloudflareStoreAdapter()

> **new CloudflareStoreAdapter**\<`Item`\>(`durableObject`, `serializer`, `options`, `type`, `hash`): [`CloudflareStoreAdapter`](module_index.md#cloudflarestoreadapteritem)\<`Item`\>

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

`Serializer`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

`StoreOptions`\<`Item`\>

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

[`CloudflareStoreAdapter`](module_index.md#cloudflarestoreadapteritem)\<`Item`\>

###### Overrides

`StoreAdapter<Item>.constructor`

#### Properties

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

`StoreAdapter.hash`

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

`DataLoader`\<`ItemRef`, `null` \| `Item`, `ItemRef`\>

</td>
<td>

`StoreAdapter.loader`

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

`StoreOptions`\<`Item`\>

</td>
<td>

`StoreAdapter.options`

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

`Serializer`

</td>
<td>

`StoreAdapter.serializer`

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

`StoreAdapter.type`

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

`ItemRef`

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

###### Inherited from

`StoreAdapter.createKey`

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

###### Inherited from

`StoreAdapter.createKeyByItem`

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

`ParentRef`

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

###### Inherited from

`StoreAdapter.createKeyByQuery`

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

`CacheRef`\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`Root` _extends_ `RefCompatibleRoot` ? \[`CacheMiddlewareOptions`\<`Root`\<`Root`\>\>\] : \[`RequiredCacheMiddlewareOptions`\<`Root`\>\]

</td>
</tr>
</tbody>
</table>

###### Returns

`Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

###### Inherited from

`StoreAdapter.createMiddleware`

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

`NonNullable`\<`ParentRef`\>

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

###### Inherited from

`StoreAdapter.createQueryKeyGlobMatcher`

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

`ParentRef`

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

###### Inherited from

`StoreAdapter.createQueryKeyHeader`

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

###### Inherited from

`StoreAdapter.createQueryKeyNamespace`

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

`NonNullable`\<`ParentRef`\>

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

###### Inherited from

`StoreAdapter.createQueryKeyRegExpMatcher`

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

###### Inherited from

`StoreAdapter.decodeQueryItemRef`

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

`ItemRef`

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

###### Inherited from

`StoreAdapter.delete`

##### deleteMany()

> **deleteMany**(`refs`, `evictQueries`): `Promise`\<`void`\>

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

`refs`

</td>
<td>

`ItemRef`[]

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

###### Returns

`Promise`\<`void`\>

###### Overrides

`StoreAdapter.deleteMany`

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

`CacheRef`\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher`?

</td>
<td>

`CacheQueryMatching`\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

`StoreAdapter.deleteQueries`

##### deleteQueriesByRef()

> `protected` **deleteQueriesByRef**(`queryRef`?, `parentRef`?, `args`?): `Promise`\<`void`\>

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

`string`

</td>
</tr>
<tr>
<td>

`parentRef`?

</td>
<td>

`ParentRef`

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

`Promise`\<`void`\>

###### Overrides

`StoreAdapter.deleteQueriesByRef`

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

###### Inherited from

`StoreAdapter.encodeQueryItemRef`

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

`ItemRef`

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Item`\>

###### Inherited from

`StoreAdapter.get`

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

`ItemRef`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Item`[]\>

###### Inherited from

`StoreAdapter.getMany`

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

`T` _extends_ `ItemRef`

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

###### Inherited from

`StoreAdapter.getMany`

##### getPartialMany()

> **getPartialMany**(`refs`): `Promise`\<`null` \| (`null` \| `Item`)[]\>

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

`ItemRef`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| (`null` \| `Item`)[]\>

###### Overrides

`StoreAdapter.getPartialMany`

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

`CacheRef`\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher`?

</td>
<td>

`CacheQueryMatching`\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| \{ `query`: `Result`; \}\>

###### Inherited from

`StoreAdapter.getQueryResult`

##### getRef()

> `protected` **getRef**(`root`): `ItemRef`

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

`ItemRef`

###### Inherited from

`StoreAdapter.getRef`

##### getRevision()

> `protected` **getRevision**(): `string`

###### Returns

`string`

###### Inherited from

`StoreAdapter.getRevision`

##### getTtl()

> `protected` **getTtl**(): `undefined` \| `number`

###### Returns

`undefined` \| `number`

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

readonly `ItemRef`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`any`[]\>

###### Inherited from

`StoreAdapter.loaderFn`

##### loadQueryMetadata()

> `protected` **loadQueryMetadata**(`queryRef`, `parentRef`?, `args`?): `Promise`\<`null` \| `string`[]\>

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

`ParentRef`

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

`Promise`\<`null` \| `string`[]\>

###### Overrides

`StoreAdapter.loadQueryMetadata`

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

###### Inherited from

`StoreAdapter.parseItem`

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

###### Inherited from

`StoreAdapter.save`

##### saveMany()

> **saveMany**(`items`): `Promise`\<`void`\>

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

`items`

</td>
<td>

`Item`[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Overrides

`StoreAdapter.saveMany`

##### saveQueryMetadata()

> `protected` **saveQueryMetadata**(`queryRef`, `meta`, `parentRef`?, `args`?): `Promise`\<`void`\>

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

`meta`

</td>
<td>

`string`[]

</td>
</tr>
<tr>
<td>

`parentRef`?

</td>
<td>

`ParentRef`

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

`Promise`\<`void`\>

###### Overrides

`StoreAdapter.saveQueryMetadata`

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

`CacheRef`\<`Result`, `Root`, `Args`\>

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

`CacheQueryMatching`\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

`StoreAdapter.saveQueryResult`

##### searchQueries()

> `protected` **searchQueries**(`queryRef`, `parentRef`, `args`): `Promise`\<`string`[]\>

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

`NonNullable`\<`ParentRef`\>

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

###### Returns

`Promise`\<`string`[]\>

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

###### Inherited from

`StoreAdapter.stringifyItem`
