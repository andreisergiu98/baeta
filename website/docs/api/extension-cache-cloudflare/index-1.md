# index

## Classes

### BaetaCache

#### Implements

- `DurableObject`

#### Constructors

##### Constructor

> **new BaetaCache**(`state`, `env`): [`BaetaCache`](#baetacache)

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

\{[`key`: `string`]: `never`; \}

</td>
</tr>
</tbody>
</table>

###### Returns

[`BaetaCache`](#baetacache)

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

> **list**(`prefix`, `startAfter?`, `limit?`): `Promise`\<`string`\>

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

`startAfter?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`limit?`

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

> **put**(`values`, `ttl?`): `Promise`\<`null`\>

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

`ttl?`

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

##### Constructor

> **new CloudflareCacheClient**(`durableObject`): [`CloudflareCacheClient`](#cloudflarecacheclient)

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

[`CloudflareCacheClient`](#cloudflarecacheclient)

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

> **list**(`prefix`, `startAfter?`, `limit?`): `Promise`\<`string`[]\>

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

`startAfter?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`limit?`

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

> **put**(`values`, `ttl?`): `Promise`\<`null`\>

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

`ttl?`

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

> **putOne**(`key`, `value`, `ttl?`): `Promise`\<`null`\>

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

`ttl?`

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

- [`StoreAdapter`](../extension-cache.md#storeadapter)\<`Item`\>

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

##### Constructor

> **new CloudflareStoreAdapter**\<`Item`\>(`durableObject`, `serializer`, `options`, `type`, `hash`): [`CloudflareStoreAdapter`](#cloudflarestoreadapter)\<`Item`\>

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

[`Serializer`](../extension-cache.md#serializer-1)

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`StoreOptions`](../extension-cache.md#storeoptions)\<`Item`\>

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

[`CloudflareStoreAdapter`](#cloudflarestoreadapter)\<`Item`\>

###### Overrides

[`StoreAdapter`](../extension-cache.md#storeadapter).[`constructor`](../extension-cache.md#storeadapter#constructor-2)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`hash`](../extension-cache.md#storeadapter#hash)

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

`DataLoader`\<[`ItemRef`](../extension-cache.md#itemref), `null` \| `Item`, [`ItemRef`](../extension-cache.md#itemref)\>

</td>
<td>

[`StoreAdapter`](../extension-cache.md#storeadapter).[`loader`](../extension-cache.md#storeadapter#loader)

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

[`StoreOptions`](../extension-cache.md#storeoptions)\<`Item`\>

</td>
<td>

[`StoreAdapter`](../extension-cache.md#storeadapter).[`options`](../extension-cache.md#storeadapter#options)

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

[`Serializer`](../extension-cache.md#serializer-1)

</td>
<td>

[`StoreAdapter`](../extension-cache.md#storeadapter).[`serializer`](../extension-cache.md#storeadapter#serializer)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`type`](../extension-cache.md#storeadapter#type)

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

[`ItemRef`](../extension-cache.md#itemref)

</td>
</tr>
</tbody>
</table>

###### Returns

`string`

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createKey`](../extension-cache.md#storeadapter#createkey)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createKeyByItem`](../extension-cache.md#storeadapter#createkeybyitem)

##### createKeyByQuery()

> `protected` **createKeyByQuery**(`queryRef`, `parentRef?`, `args?`): `string`

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

`parentRef?`

</td>
<td>

[`ParentRef`](../extension-cache.md#parentref-1)

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

###### Returns

`string`

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createKeyByQuery`](../extension-cache.md#storeadapter#createkeybyquery)

##### createMiddleware()

> **createMiddleware**\<`Result`, `Root`, `Args`\>(`queryRef`, ...`args`): [`Middleware`](../core/index-1.md#middleware)\<`Result`, `Root`, `unknown`, `Args`\>

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

[`CacheRef`](../extension-cache.md#cacheref)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

...`args`

</td>
<td>

`Root` _extends_ [`RefCompatibleRoot`](../extension-cache.md#refcompatibleroot) ? \[[`CacheMiddlewareOptions`](../extension-cache.md#cachemiddlewareoptions)\<`Root`\<`Root`\>\>\] : \[[`RequiredCacheMiddlewareOptions`](../extension-cache.md#requiredcachemiddlewareoptions)\<`Root`\>\]

</td>
</tr>
</tbody>
</table>

###### Returns

[`Middleware`](../core/index-1.md#middleware)\<`Result`, `Root`, `unknown`, `Args`\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createMiddleware`](../extension-cache.md#storeadapter#createmiddleware)

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

`NonNullable`\<[`ParentRef`](../extension-cache.md#parentref-1)\>

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createQueryKeyGlobMatcher`](../extension-cache.md#storeadapter#createquerykeyglobmatcher)

##### createQueryKeyHeader()

> `protected` **createQueryKeyHeader**(`parentRef`, `args?`): `string`

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

[`ParentRef`](../extension-cache.md#parentref-1)

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

###### Returns

`string`

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createQueryKeyHeader`](../extension-cache.md#storeadapter#createquerykeyheader)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createQueryKeyNamespace`](../extension-cache.md#storeadapter#createquerykeynamespace)

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

`NonNullable`\<[`ParentRef`](../extension-cache.md#parentref-1)\>

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`createQueryKeyRegExpMatcher`](../extension-cache.md#storeadapter#createquerykeyregexpmatcher)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`decodeQueryItemRef`](../extension-cache.md#storeadapter#decodequeryitemref)

##### delete()

> **delete**(`ref`, `evictQueries?`): `Promise`\<`void`\>

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

[`ItemRef`](../extension-cache.md#itemref)

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

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`delete`](../extension-cache.md#storeadapter#delete)

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

[`ItemRef`](../extension-cache.md#itemref)[]

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

> **deleteQueries**\<`Result`, `Root`, `Args`\>(`queryRef?`, `matcher?`): `Promise`\<`void`\>

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

`queryRef?`

</td>
<td>

[`CacheRef`](../extension-cache.md#cacheref)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher?`

</td>
<td>

[`CacheQueryMatching`](../extension-cache.md#cachequerymatching)\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`deleteQueries`](../extension-cache.md#storeadapter#deletequeries)

##### deleteQueriesByRef()

> `protected` **deleteQueriesByRef**(`queryRef?`, `parentRef?`, `args?`): `Promise`\<`void`\>

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

[`ParentRef`](../extension-cache.md#parentref-1)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`encodeQueryItemRef`](../extension-cache.md#storeadapter#encodequeryitemref)

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

[`ItemRef`](../extension-cache.md#itemref)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Item`\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`get`](../extension-cache.md#storeadapter#get)

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

[`ItemRef`](../extension-cache.md#itemref)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| `Item`[]\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`getMany`](../extension-cache.md#storeadapter#getmany)

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

`T` _extends_ [`ItemRef`](../extension-cache.md#itemref)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`getMany`](../extension-cache.md#storeadapter#getmany)

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

[`ItemRef`](../extension-cache.md#itemref)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| (`null` \| `Item`)[]\>

###### Overrides

`StoreAdapter.getPartialMany`

##### getQueryResult()

> **getQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `matcher?`): `Promise`\<`null` \| \{ `query`: `Result`; \}\>

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

[`CacheRef`](../extension-cache.md#cacheref)\<`Result`, `Root`, `Args`\>

</td>
</tr>
<tr>
<td>

`matcher?`

</td>
<td>

[`CacheQueryMatching`](../extension-cache.md#cachequerymatching)\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`null` \| \{ `query`: `Result`; \}\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`getQueryResult`](../extension-cache.md#storeadapter#getqueryresult)

##### getRef()

> `protected` **getRef**(`root`): [`ItemRef`](../extension-cache.md#itemref)

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

[`ItemRef`](../extension-cache.md#itemref)

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`getRef`](../extension-cache.md#storeadapter#getref)

##### getRevision()

> `protected` **getRevision**(): `string`

###### Returns

`string`

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`getRevision`](../extension-cache.md#storeadapter#getrevision-2)

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

readonly [`ItemRef`](../extension-cache.md#itemref)[]

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`any`[]\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`loaderFn`](../extension-cache.md#storeadapter#loaderfn)

##### loadQueryMetadata()

> `protected` **loadQueryMetadata**(`queryRef`, `parentRef?`, `args?`): `Promise`\<`null` \| `string`[]\>

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

`parentRef?`

</td>
<td>

[`ParentRef`](../extension-cache.md#parentref-1)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`parseItem`](../extension-cache.md#storeadapter#parseitem)

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`save`](../extension-cache.md#storeadapter#save)

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

> `protected` **saveQueryMetadata**(`queryRef`, `meta`, `parentRef?`, `args?`): `Promise`\<`void`\>

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

`parentRef?`

</td>
<td>

[`ParentRef`](../extension-cache.md#parentref-1)

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

###### Returns

`Promise`\<`void`\>

###### Overrides

`StoreAdapter.saveQueryMetadata`

##### saveQueryResult()

> **saveQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `data`, `matcher?`): `Promise`\<`void`\>

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

[`CacheRef`](../extension-cache.md#cacheref)\<`Result`, `Root`, `Args`\>

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

[`CacheQueryMatching`](../extension-cache.md#cachequerymatching)\<`Args`\>

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Inherited from

[`StoreAdapter`](../extension-cache.md#storeadapter).[`saveQueryResult`](../extension-cache.md#storeadapter#savequeryresult)

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

`NonNullable`\<[`ParentRef`](../extension-cache.md#parentref-1)\>

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

[`StoreAdapter`](../extension-cache.md#storeadapter).[`stringifyItem`](../extension-cache.md#storeadapter#stringifyitem)
