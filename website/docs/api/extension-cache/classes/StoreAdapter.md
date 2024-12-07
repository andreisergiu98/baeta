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

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:17](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L17)

## Properties

### deleteMany()

> `abstract` **deleteMany**: (`refs`, `evictQueries`?) => `Promise`\<`void`\>

#### Parameters

• **refs**: [`ItemRef`](../type-aliases/ItemRef.md)[]

• **evictQueries?**: `boolean`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:27](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L27)

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

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:42](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L42)

***

### getPartialMany()

> `abstract` **getPartialMany**: (`refs`) => `Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Parameters

• **refs**: [`ItemRef`](../type-aliases/ItemRef.md)[]

#### Returns

`Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:23](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L23)

***

### hash

> `protected` **hash**: `string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:20](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L20)

***

### loader

> `protected` **loader**: `DataLoader`\<[`ItemRef`](../type-aliases/ItemRef.md), `null` \| `Item`, [`ItemRef`](../type-aliases/ItemRef.md)\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:56](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L56)

***

### loadQueryMetadata()

> `abstract` `protected` **loadQueryMetadata**: (`queryRef`, `parentRef`?, `args`?) => `Promise`\<`null` \| `string`[]\>

#### Parameters

• **queryRef**: `string`

• **parentRef?**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`null` \| `string`[]\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:36](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L36)

***

### options

> `protected` **options**: [`StoreOptions`](../interfaces/StoreOptions.md)\<`Item`\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:18](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L18)

***

### saveMany()

> `abstract` **saveMany**: (`items`) => `Promise`\<`void`\>

#### Parameters

• **items**: `Item`[]

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:25](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L25)

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

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:29](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L29)

***

### type

> `protected` **type**: `string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:19](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L19)

## Methods

### createKey()

> `protected` **createKey**(`ref`): `string`

#### Parameters

• **ref**: [`ItemRef`](../type-aliases/ItemRef.md)

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:60](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L60)

***

### createKeyByItem()

> `protected` **createKeyByItem**(`item`): `string`

#### Parameters

• **item**: `Item`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:64](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L64)

***

### createKeyByQuery()

> `protected` **createKeyByQuery**(`queryRef`, `parentRef`?, `args`?): `string`

#### Parameters

• **queryRef**: `string`

• **parentRef?**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:68](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L68)

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

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:187](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L187)

***

### createQueryKeyGlobMatcher()

> `protected` **createQueryKeyGlobMatcher**(`queryRef`, `parentRef`, `args`): `string`

#### Parameters

• **queryRef**: `string`

• **parentRef**: `NonNullable`\<[`ParentRef`](../type-aliases/ParentRef.md)\>

• **args**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:264](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L264)

***

### createQueryKeyHeader()

> `protected` **createQueryKeyHeader**(`parentRef`, `args`?): `string`

#### Parameters

• **parentRef**: [`ParentRef`](../type-aliases/ParentRef.md)

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:87](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L87)

***

### createQueryKeyNamespace()

> `protected` **createQueryKeyNamespace**(`queryRef`): `string`

#### Parameters

• **queryRef**: `string`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:83](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L83)

***

### createQueryKeyRegExpMatcher()

> `protected` **createQueryKeyRegExpMatcher**(`queryRef`, `parentRef`, `args`): `RegExp`

#### Parameters

• **queryRef**: `string`

• **parentRef**: `NonNullable`\<[`ParentRef`](../type-aliases/ParentRef.md)\>

• **args**: `Record`\<`string`, `unknown`\>

#### Returns

`RegExp`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:253](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L253)

***

### decodeQueryItemRef()

> `protected` **decodeQueryItemRef**(`encodedRef`): `null` \| `string`

#### Parameters

• **encodedRef**: `string`

#### Returns

`null` \| `string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:246](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L246)

***

### delete()

> **delete**(`ref`, `evictQueries`?): `Promise`\<`void`\>

#### Parameters

• **ref**: [`ItemRef`](../type-aliases/ItemRef.md)

• **evictQueries?**: `boolean`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:117](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L117)

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

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:121](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L121)

***

### encodePrimitive()

> `protected` **encodePrimitive**(`value`, `catchAll`?): `null` \| `string`

#### Parameters

• **value**: `unknown`

• **catchAll?**: `string`

#### Returns

`null` \| `string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:301](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L301)

***

### encodeProperty()

> `protected` **encodeProperty**(`value`): `string`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:293](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L293)

***

### encodeQueryArgs()

> `protected` **encodeQueryArgs**(`args`, `catchAll`?): `string`

#### Parameters

• **args**: `Record`\<`string`, `unknown`\> = `{}`

• **catchAll?**: `string`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:274](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L274)

***

### encodeQueryItemRef()

> `protected` **encodeQueryItemRef**(`item`): `string`

#### Parameters

• **item**: `null` \| `Item`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:238](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L238)

***

### get()

> **get**(`ref`): `Promise`\<`null` \| `Item`\>

#### Parameters

• **ref**: [`ItemRef`](../type-aliases/ItemRef.md)

#### Returns

`Promise`\<`null` \| `Item`\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:93](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L93)

***

### getMany()

> **getMany**(`refs`): `Promise`\<`null` \| `Item`[]\>

#### Parameters

• **refs**: [`ItemRef`](../type-aliases/ItemRef.md)[]

#### Returns

`Promise`\<`null` \| `Item`[]\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:97](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L97)

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

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:128](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L128)

***

### getRef()

> `protected` **getRef**(`root`): [`ItemRef`](../type-aliases/ItemRef.md)

#### Parameters

• **root**: `Item`

#### Returns

[`ItemRef`](../type-aliases/ItemRef.md)

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:339](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L339)

***

### getRefFallback()

> `protected` **getRefFallback**(`root`): `undefined` \| `string`

#### Parameters

• **root**: `unknown`

#### Returns

`undefined` \| `string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:356](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L356)

***

### getRevision()

> `protected` **getRevision**(): `string`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:78](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L78)

***

### loaderFn()

> `protected` **loaderFn**(`refs`): `Promise`\<`any`[]\>

#### Parameters

• **refs**: readonly [`ItemRef`](../type-aliases/ItemRef.md)[]

#### Returns

`Promise`\<`any`[]\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:48](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L48)

***

### refillNullQueryItems()

> `protected` **refillNullQueryItems**(`nullableRefs`, `items`): (`null` \| `Item`)[]

#### Parameters

• **nullableRefs**: (`null` \| [`ItemRef`](../type-aliases/ItemRef.md))[]

• **items**: `Item`[]

#### Returns

(`null` \| `Item`)[]

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:219](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L219)

***

### save()

> **save**(`item`): `Promise`\<`void`\>

#### Parameters

• **item**: `Item`

#### Returns

`Promise`\<`void`\>

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:113](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L113)

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

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:160](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L160)

***

### shouldEncode()

> `protected` **shouldEncode**(`value`): `boolean`

#### Parameters

• **value**: `string`

#### Returns

`boolean`

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:335](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L335)

***

### validateRefType()

> `protected` **validateRefType**(`ref`): asserts ref is string \| number \| bigint

#### Parameters

• **ref**: `unknown`

#### Returns

asserts ref is string \| number \| bigint

#### Defined in

[packages/extension-cache/lib/store-adapter.ts:369](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store-adapter.ts#L369)
