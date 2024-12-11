# Class: CloudflareStoreAdapter\<Item\>

## Extends

- `StoreAdapter`\<`Item`\>

## Type Parameters

• **Item**

## Constructors

### new CloudflareStoreAdapter()

> **new CloudflareStoreAdapter**\<`Item`\>(`durableObject`, `options`, `type`, `hash`): [`CloudflareStoreAdapter`](CloudflareStoreAdapter.md)\<`Item`\>

#### Parameters

##### durableObject

`DurableObjectNamespace`\<`undefined`\>

##### options

`StoreOptions`\<`Item`\>

##### type

`string`

##### hash

`string`

#### Returns

[`CloudflareStoreAdapter`](CloudflareStoreAdapter.md)\<`Item`\>

#### Overrides

`StoreAdapter<Item>.constructor`

## Properties

### hash

> `protected` **hash**: `string`

#### Inherited from

`StoreAdapter.hash`

---

### loader

> `protected` **loader**: `DataLoader`\<`ItemRef`, `null` \| `Item`, `ItemRef`\>

#### Inherited from

`StoreAdapter.loader`

---

### options

> `protected` **options**: `StoreOptions`\<`Item`\>

#### Inherited from

`StoreAdapter.options`

---

### type

> `protected` **type**: `string`

#### Inherited from

`StoreAdapter.type`

## Methods

### createKey()

> `protected` **createKey**(`ref`): `string`

#### Parameters

##### ref

`ItemRef`

#### Returns

`string`

#### Inherited from

`StoreAdapter.createKey`

---

### createKeyByItem()

> `protected` **createKeyByItem**(`item`): `string`

#### Parameters

##### item

`Item`

#### Returns

`string`

#### Inherited from

`StoreAdapter.createKeyByItem`

---

### createKeyByQuery()

> `protected` **createKeyByQuery**(`queryRef`, `parentRef`?, `args`?): `string`

#### Parameters

##### queryRef

`string`

##### parentRef?

`ParentRef`

##### args?

`Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Inherited from

`StoreAdapter.createKeyByQuery`

---

### createMiddleware()

> **createMiddleware**\<`Result`, `Root`, `Args`\>(`queryRef`, ...`args`): `Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

##### queryRef

`CacheRef`\<`Result`, `Root`, `Args`\>

##### args

...`Root` _extends_ `RefCompatibleRoot` ? [`CacheMiddlewareOptions`\<`Root`\<`Root`\>\>] : [`RequiredCacheMiddlewareOptions`\<`Root`\>]

#### Returns

`Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

#### Inherited from

`StoreAdapter.createMiddleware`

---

### createQueryKeyGlobMatcher()

> `protected` **createQueryKeyGlobMatcher**(`queryRef`, `parentRef`, `args`): `string`

#### Parameters

##### queryRef

`string`

##### parentRef

`NonNullable`\<`ParentRef`\>

##### args

`Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Inherited from

`StoreAdapter.createQueryKeyGlobMatcher`

---

### createQueryKeyHeader()

> `protected` **createQueryKeyHeader**(`parentRef`, `args`?): `string`

#### Parameters

##### parentRef

`ParentRef`

##### args?

`Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Inherited from

`StoreAdapter.createQueryKeyHeader`

---

### createQueryKeyNamespace()

> `protected` **createQueryKeyNamespace**(`queryRef`): `string`

#### Parameters

##### queryRef

`string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.createQueryKeyNamespace`

---

### createQueryKeyRegExpMatcher()

> `protected` **createQueryKeyRegExpMatcher**(`queryRef`, `parentRef`, `args`): `RegExp`

#### Parameters

##### queryRef

`string`

##### parentRef

`NonNullable`\<`ParentRef`\>

##### args

`Record`\<`string`, `unknown`\>

#### Returns

`RegExp`

#### Inherited from

`StoreAdapter.createQueryKeyRegExpMatcher`

---

### decodeQueryItemRef()

> `protected` **decodeQueryItemRef**(`encodedRef`): `null` \| `string`

#### Parameters

##### encodedRef

`string`

#### Returns

`null` \| `string`

#### Inherited from

`StoreAdapter.decodeQueryItemRef`

---

### delete()

> **delete**(`ref`, `evictQueries`?): `Promise`\<`void`\>

#### Parameters

##### ref

`ItemRef`

##### evictQueries?

`boolean`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.delete`

---

### deleteMany()

> **deleteMany**(`refs`, `evictQueries`): `Promise`\<`void`\>

#### Parameters

##### refs

`ItemRef`[]

##### evictQueries

`boolean` = `true`

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.deleteMany`

---

### deleteQueries()

> **deleteQueries**\<`Result`, `Root`, `Args`\>(`queryRef`?, `matcher`?): `Promise`\<`void`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

##### queryRef?

`CacheRef`\<`Result`, `Root`, `Args`\>

##### matcher?

`CacheQueryMatching`\<`Args`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.deleteQueries`

---

### deleteQueriesByRef()

> `protected` **deleteQueriesByRef**(`queryRef`?, `parentRef`?, `args`?): `Promise`\<`void`\>

#### Parameters

##### queryRef?

`string`

##### parentRef?

`ParentRef`

##### args?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.deleteQueriesByRef`

---

### encodePrimitive()

> `protected` **encodePrimitive**(`value`, `catchAll`?): `null` \| `string`

#### Parameters

##### value

`unknown`

##### catchAll?

`string`

#### Returns

`null` \| `string`

#### Inherited from

`StoreAdapter.encodePrimitive`

---

### encodeProperty()

> `protected` **encodeProperty**(`value`): `string`

#### Parameters

##### value

`string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.encodeProperty`

---

### encodeQueryArgs()

> `protected` **encodeQueryArgs**(`args`, `catchAll`?): `string`

#### Parameters

##### args

`Record`\<`string`, `unknown`\> = `{}`

##### catchAll?

`string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.encodeQueryArgs`

---

### encodeQueryItemRef()

> `protected` **encodeQueryItemRef**(`item`): `string`

#### Parameters

##### item

`null` | `Item`

#### Returns

`string`

#### Inherited from

`StoreAdapter.encodeQueryItemRef`

---

### get()

> **get**(`ref`): `Promise`\<`null` \| `Item`\>

#### Parameters

##### ref

`ItemRef`

#### Returns

`Promise`\<`null` \| `Item`\>

#### Inherited from

`StoreAdapter.get`

---

### getMany()

> **getMany**(`refs`): `Promise`\<`null` \| `Item`[]\>

#### Parameters

##### refs

`ItemRef`[]

#### Returns

`Promise`\<`null` \| `Item`[]\>

#### Inherited from

`StoreAdapter.getMany`

---

### getPartialMany()

> **getPartialMany**(`refs`): `Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Parameters

##### refs

`ItemRef`[]

#### Returns

`Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Overrides

`StoreAdapter.getPartialMany`

---

### getQueryResult()

> **getQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `matcher`?): `Promise`\<`null` \| \{ `query`: `Result`; \}\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

##### queryRef

`CacheRef`\<`Result`, `Root`, `Args`\>

##### matcher?

`CacheQueryMatching`\<`Args`\>

#### Returns

`Promise`\<`null` \| \{ `query`: `Result`; \}\>

#### Inherited from

`StoreAdapter.getQueryResult`

---

### getRef()

> `protected` **getRef**(`root`): `ItemRef`

#### Parameters

##### root

`Item`

#### Returns

`ItemRef`

#### Inherited from

`StoreAdapter.getRef`

---

### getRefFallback()

> `protected` **getRefFallback**(`root`): `undefined` \| `string`

#### Parameters

##### root

`unknown`

#### Returns

`undefined` \| `string`

#### Inherited from

`StoreAdapter.getRefFallback`

---

### getRevision()

> `protected` **getRevision**(): `string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.getRevision`

---

### getTtl()

> `protected` **getTtl**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

---

### loaderFn()

> `protected` **loaderFn**(`refs`): `Promise`\<`any`[]\>

#### Parameters

##### refs

readonly `ItemRef`[]

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

`StoreAdapter.loaderFn`

---

### loadQueryMetadata()

> `protected` **loadQueryMetadata**(`queryRef`, `parentRef`?, `args`?): `Promise`\<`null` \| `string`[]\>

#### Parameters

##### queryRef

`string`

##### parentRef?

`ParentRef`

##### args?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`null` \| `string`[]\>

#### Overrides

`StoreAdapter.loadQueryMetadata`

---

### refillNullQueryItems()

> `protected` **refillNullQueryItems**(`nullableRefs`, `items`): (`null` \| `Item`)[]

#### Parameters

##### nullableRefs

(`null` \| `ItemRef`)[]

##### items

`Item`[]

#### Returns

(`null` \| `Item`)[]

#### Inherited from

`StoreAdapter.refillNullQueryItems`

---

### save()

> **save**(`item`): `Promise`\<`void`\>

#### Parameters

##### item

`Item`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.save`

---

### saveMany()

> **saveMany**(`items`): `Promise`\<`void`\>

#### Parameters

##### items

`Item`[]

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.saveMany`

---

### saveQueryMetadata()

> `protected` **saveQueryMetadata**(`queryRef`, `meta`, `parentRef`?, `args`?): `Promise`\<`void`\>

#### Parameters

##### queryRef

`string`

##### meta

`string`[]

##### parentRef?

`ParentRef`

##### args?

`Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.saveQueryMetadata`

---

### saveQueryResult()

> **saveQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `data`, `matcher`?): `Promise`\<`void`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

##### queryRef

`CacheRef`\<`Result`, `Root`, `Args`\>

##### data

`Result`

##### matcher?

`CacheQueryMatching`\<`Args`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.saveQueryResult`

---

### searchQueries()

> `protected` **searchQueries**(`queryRef`, `parentRef`, `args`): `Promise`\<`string`[]\>

#### Parameters

##### queryRef

`string` = `'*'`

##### parentRef

`NonNullable`\<`ParentRef`\> = `'*'`

##### args

`Record`\<`string`, `unknown`\> = `{}`

#### Returns

`Promise`\<`string`[]\>

---

### shouldEncode()

> `protected` **shouldEncode**(`value`): `boolean`

#### Parameters

##### value

`string`

#### Returns

`boolean`

#### Inherited from

`StoreAdapter.shouldEncode`

---

### validateRefType()

> `protected` **validateRefType**(`ref`): asserts ref is string \| number \| bigint

#### Parameters

##### ref

`unknown`

#### Returns

asserts ref is string \| number \| bigint

#### Inherited from

`StoreAdapter.validateRefType`
