# Class: `abstract` StoreAdapter\<Item\>

## Type Parameters

• **Item**

## Constructors

### new StoreAdapter()

> **new StoreAdapter**\<`Item`\>(`options`, `type`, `hash`): [`StoreAdapter`](StoreAdapter.md)\<`Item`\>

#### Parameters

• **options**: [`StoreOptions`](../interfaces/StoreOptions.md)\<`Item`\>

• **type**: `string`

• **hash**: `string`

#### Returns

[`StoreAdapter`](StoreAdapter.md)\<`Item`\>

## Properties

### deleteMany()

> `abstract` **deleteMany**: (`refs`, `evictQueries`?) => `Promise`\<`void`\>

#### Parameters

• **refs**: [`ItemRef`](../type-aliases/ItemRef.md)[]

• **evictQueries?**: `boolean`

#### Returns

`Promise`\<`void`\>

***

### deleteQueriesByRef()

> `abstract` `protected` **deleteQueriesByRef**: \<`Result`, `Root`, `Args`\>(`queryRef`?, `parentRef`?, `args`?) => `Promise`\<`void`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef?**: `string`

• **parentRef?**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`void`\>

***

### getPartialMany()

> `abstract` **getPartialMany**: (`refs`) => `Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Parameters

• **refs**: [`ItemRef`](../type-aliases/ItemRef.md)[]

#### Returns

`Promise`\<`null` \| (`null` \| `Item`)[]\>

***

### hash

> `protected` **hash**: `string`

***

### loader

> `protected` **loader**: `DataLoader`\<[`ItemRef`](../type-aliases/ItemRef.md), `null` \| `Item`, [`ItemRef`](../type-aliases/ItemRef.md)\>

***

### loadQueryMetadata()

> `abstract` `protected` **loadQueryMetadata**: (`queryRef`, `parentRef`?, `args`?) => `Promise`\<`null` \| `string`[]\>

#### Parameters

• **queryRef**: `string`

• **parentRef?**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`null` \| `string`[]\>

***

### options

> `protected` **options**: [`StoreOptions`](../interfaces/StoreOptions.md)\<`Item`\>

***

### saveMany()

> `abstract` **saveMany**: (`items`) => `Promise`\<`void`\>

#### Parameters

• **items**: `Item`[]

#### Returns

`Promise`\<`void`\>

***

### saveQueryMetadata()

> `abstract` `protected` **saveQueryMetadata**: (`queryRef`, `meta`, `parentRef`?, `args`?) => `Promise`\<`void`\>

#### Parameters

• **queryRef**: `string`

• **meta**: `string`[]

• **parentRef?**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`void`\>

***

### type

> `protected` **type**: `string`

## Methods

### createKey()

> `protected` **createKey**(`ref`): `string`

#### Parameters

• **ref**: [`ItemRef`](../type-aliases/ItemRef.md)

#### Returns

`string`

***

### createKeyByItem()

> `protected` **createKeyByItem**(`item`): `string`

#### Parameters

• **item**: `Item`

#### Returns

`string`

***

### createKeyByQuery()

> `protected` **createKeyByQuery**(`queryRef`, `parentRef`?, `args`?): `string`

#### Parameters

• **queryRef**: `string`

• **parentRef?**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

***

### createMiddleware()

> **createMiddleware**\<`Result`, `Root`, `Args`\>(`queryRef`, ...`args`): `Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef**: [`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

• ...**args**: `Root` *extends* `RefCompatibleRoot` ? [`MiddlewareOptions`\<`Root`\<`Root`\>\>] : [`RequiredMiddlewareOptions`\<`Root`\>]

#### Returns

`Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

***

### createQueryKeyGlobMatcher()

> `protected` **createQueryKeyGlobMatcher**(`queryRef`, `parentRef`, `args`): `string`

#### Parameters

• **queryRef**: `string`

• **parentRef**: `NonNullable`\<[`ParentRef`](../type-aliases/ParentRef.md)\>

• **args**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

***

### createQueryKeyHeader()

> `protected` **createQueryKeyHeader**(`parentRef`, `args`?): `string`

#### Parameters

• **parentRef**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

***

### createQueryKeyNamespace()

> `protected` **createQueryKeyNamespace**(`queryRef`): `string`

#### Parameters

• **queryRef**: `string`

#### Returns

`string`

***

### createQueryKeyRegExpMatcher()

> `protected` **createQueryKeyRegExpMatcher**(`queryRef`, `parentRef`, `args`): `RegExp`

#### Parameters

• **queryRef**: `string`

• **parentRef**: `NonNullable`\<[`ParentRef`](../type-aliases/ParentRef.md)\>

• **args**: `Record`\<`string`, `unknown`\>

#### Returns

`RegExp`

***

### decodeQueryItemRef()

> `protected` **decodeQueryItemRef**(`encodedRef`): `null` \| `string`

#### Parameters

• **encodedRef**: `string`

#### Returns

`null` \| `string`

***

### delete()

> **delete**(`ref`, `evictQueries`?): `Promise`\<`void`\>

#### Parameters

• **ref**: [`ItemRef`](../type-aliases/ItemRef.md)

• **evictQueries?**: `boolean`

#### Returns

`Promise`\<`void`\>

***

### deleteQueries()

> **deleteQueries**\<`Result`, `Root`, `Args`\>(`queryRef`?, `matcher`?): `Promise`\<`void`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef?**: [`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

• **matcher?**: `QueryMatching`\<`Args`\>

#### Returns

`Promise`\<`void`\>

***

### encodePrimitive()

> `protected` **encodePrimitive**(`value`, `catchAll`?): `null` \| `string`

#### Parameters

• **value**: `unknown`

• **catchAll?**: `string`

#### Returns

`null` \| `string`

***

### encodeProperty()

> `protected` **encodeProperty**(`value`): `string`

#### Parameters

• **value**: `string`

#### Returns

`string`

***

### encodeQueryArgs()

> `protected` **encodeQueryArgs**(`args`, `catchAll`?): `string`

#### Parameters

• **args**: `Record`\<`string`, `unknown`\> = `{}`

• **catchAll?**: `string`

#### Returns

`string`

***

### encodeQueryItemRef()

> `protected` **encodeQueryItemRef**(`item`): `string`

#### Parameters

• **item**: `null` \| `Item`

#### Returns

`string`

***

### get()

> **get**(`ref`): `Promise`\<`null` \| `Item`\>

#### Parameters

• **ref**: [`ItemRef`](../type-aliases/ItemRef.md)

#### Returns

`Promise`\<`null` \| `Item`\>

***

### getMany()

> **getMany**(`refs`): `Promise`\<`null` \| `Item`[]\>

#### Parameters

• **refs**: [`ItemRef`](../type-aliases/ItemRef.md)[]

#### Returns

`Promise`\<`null` \| `Item`[]\>

***

### getQueryResult()

> **getQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `matcher`?): `Promise`\<`null` \| `object`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef**: [`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

• **matcher?**: `QueryMatching`\<`Args`\>

#### Returns

`Promise`\<`null` \| `object`\>

***

### getRef()

> `protected` **getRef**(`root`): [`ItemRef`](../type-aliases/ItemRef.md)

#### Parameters

• **root**: `Item`

#### Returns

[`ItemRef`](../type-aliases/ItemRef.md)

***

### getRefFallback()

> `protected` **getRefFallback**(`root`): `undefined` \| `string`

#### Parameters

• **root**: `unknown`

#### Returns

`undefined` \| `string`

***

### getRevision()

> `protected` **getRevision**(): `string`

#### Returns

`string`

***

### loaderFn()

> `protected` **loaderFn**(`refs`): `Promise`\<`any`[]\>

#### Parameters

• **refs**: readonly [`ItemRef`](../type-aliases/ItemRef.md)[]

#### Returns

`Promise`\<`any`[]\>

***

### refillNullQueryItems()

> `protected` **refillNullQueryItems**(`nullableRefs`, `items`): (`null` \| `Item`)[]

#### Parameters

• **nullableRefs**: (`null` \| [`ItemRef`](../type-aliases/ItemRef.md))[]

• **items**: `Item`[]

#### Returns

(`null` \| `Item`)[]

***

### save()

> **save**(`item`): `Promise`\<`void`\>

#### Parameters

• **item**: `Item`

#### Returns

`Promise`\<`void`\>

***

### saveQueryResult()

> **saveQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `data`, `matcher`?): `Promise`\<`void`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef**: [`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

• **data**: `Result`

• **matcher?**: `QueryMatching`\<`Args`\>

#### Returns

`Promise`\<`void`\>

***

### shouldEncode()

> `protected` **shouldEncode**(`value`): `boolean`

#### Parameters

• **value**: `string`

#### Returns

`boolean`

***

### validateRefType()

> `protected` **validateRefType**(`ref`): asserts ref is string \| number \| bigint

#### Parameters

• **ref**: `unknown`

#### Returns

asserts ref is string \| number \| bigint
