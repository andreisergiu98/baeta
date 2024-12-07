# Class: CloudflareStoreAdapter\<Item\>

## Extends

- `StoreAdapter`\<`Item`\>

## Type Parameters

• **Item**

## Constructors

### new CloudflareStoreAdapter()

> **new CloudflareStoreAdapter**\<`Item`\>(`durableObject`, `options`, `type`, `hash`): [`CloudflareStoreAdapter`](CloudflareStoreAdapter.md)\<`Item`\>

#### Parameters

• **durableObject**: `DurableObjectNamespace`\<`undefined`\>

• **options**: `StoreOptions`\<`Item`\>

• **type**: `string`

• **hash**: `string`

#### Returns

[`CloudflareStoreAdapter`](CloudflareStoreAdapter.md)\<`Item`\>

#### Overrides

`StoreAdapter<Item>.constructor`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:13](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L13)

## Properties

### hash

> `protected` **hash**: `string`

#### Inherited from

`StoreAdapter.hash`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:20

***

### loader

> `protected` **loader**: `DataLoader`\<`ItemRef`, `null` \| `Item`, `ItemRef`\>

#### Inherited from

`StoreAdapter.loader`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:56

***

### options

> `protected` **options**: `StoreOptions`\<`Item`\>

#### Inherited from

`StoreAdapter.options`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:18

***

### type

> `protected` **type**: `string`

#### Inherited from

`StoreAdapter.type`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:19

## Methods

### createKey()

> `protected` **createKey**(`ref`): `string`

#### Parameters

• **ref**: `ItemRef`

#### Returns

`string`

#### Inherited from

`StoreAdapter.createKey`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:60

***

### createKeyByItem()

> `protected` **createKeyByItem**(`item`): `string`

#### Parameters

• **item**: `Item`

#### Returns

`string`

#### Inherited from

`StoreAdapter.createKeyByItem`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:64

***

### createKeyByQuery()

> `protected` **createKeyByQuery**(`queryRef`, `parentRef`?, `args`?): `string`

#### Parameters

• **queryRef**: `string`

• **parentRef?**: `ParentRef`

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Inherited from

`StoreAdapter.createKeyByQuery`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:68

***

### createMiddleware()

> **createMiddleware**\<`Result`, `Root`, `Args`\>(`queryRef`, ...`args`): `Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef**: `CacheRef`\<`Result`, `Root`, `Args`\>

• ...**args**: `Root` *extends* `RefCompatibleRoot` ? [`MiddlewareOptions`\<`Root`\<`Root`\>\>] : [`RequiredMiddlewareOptions`\<`Root`\>]

#### Returns

`Middleware`\<`Result`, `Root`, `unknown`, `Args`\>

#### Inherited from

`StoreAdapter.createMiddleware`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:187

***

### createQueryKeyGlobMatcher()

> `protected` **createQueryKeyGlobMatcher**(`queryRef`, `parentRef`, `args`): `string`

#### Parameters

• **queryRef**: `string`

• **parentRef**: `NonNullable`\<`ParentRef`\>

• **args**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Inherited from

`StoreAdapter.createQueryKeyGlobMatcher`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:264

***

### createQueryKeyHeader()

> `protected` **createQueryKeyHeader**(`parentRef`, `args`?): `string`

#### Parameters

• **parentRef**: `ParentRef`

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`string`

#### Inherited from

`StoreAdapter.createQueryKeyHeader`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:87

***

### createQueryKeyNamespace()

> `protected` **createQueryKeyNamespace**(`queryRef`): `string`

#### Parameters

• **queryRef**: `string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.createQueryKeyNamespace`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:83

***

### createQueryKeyRegExpMatcher()

> `protected` **createQueryKeyRegExpMatcher**(`queryRef`, `parentRef`, `args`): `RegExp`

#### Parameters

• **queryRef**: `string`

• **parentRef**: `NonNullable`\<`ParentRef`\>

• **args**: `Record`\<`string`, `unknown`\>

#### Returns

`RegExp`

#### Inherited from

`StoreAdapter.createQueryKeyRegExpMatcher`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:253

***

### decodeQueryItemRef()

> `protected` **decodeQueryItemRef**(`encodedRef`): `null` \| `string`

#### Parameters

• **encodedRef**: `string`

#### Returns

`null` \| `string`

#### Inherited from

`StoreAdapter.decodeQueryItemRef`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:246

***

### delete()

> **delete**(`ref`, `evictQueries`?): `Promise`\<`void`\>

#### Parameters

• **ref**: `ItemRef`

• **evictQueries?**: `boolean`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.delete`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:117

***

### deleteMany()

> **deleteMany**(`refs`, `evictQueries`): `Promise`\<`void`\>

#### Parameters

• **refs**: `ItemRef`[]

• **evictQueries**: `boolean` = `true`

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.deleteMany`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:39](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L39)

***

### deleteQueries()

> **deleteQueries**\<`Result`, `Root`, `Args`\>(`queryRef`?, `matcher`?): `Promise`\<`void`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef?**: `CacheRef`\<`Result`, `Root`, `Args`\>

• **matcher?**: `QueryMatching`\<`Args`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.deleteQueries`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:121

***

### deleteQueriesByRef()

> `protected` **deleteQueriesByRef**(`queryRef`?, `parentRef`?, `args`?): `Promise`\<`void`\>

#### Parameters

• **queryRef?**: `string`

• **parentRef?**: `ParentRef`

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.deleteQueriesByRef`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:79](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L79)

***

### encodePrimitive()

> `protected` **encodePrimitive**(`value`, `catchAll`?): `null` \| `string`

#### Parameters

• **value**: `unknown`

• **catchAll?**: `string`

#### Returns

`null` \| `string`

#### Inherited from

`StoreAdapter.encodePrimitive`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:301

***

### encodeProperty()

> `protected` **encodeProperty**(`value`): `string`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.encodeProperty`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:293

***

### encodeQueryArgs()

> `protected` **encodeQueryArgs**(`args`, `catchAll`?): `string`

#### Parameters

• **args**: `Record`\<`string`, `unknown`\> = `{}`

• **catchAll?**: `string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.encodeQueryArgs`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:274

***

### encodeQueryItemRef()

> `protected` **encodeQueryItemRef**(`item`): `string`

#### Parameters

• **item**: `null` \| `Item`

#### Returns

`string`

#### Inherited from

`StoreAdapter.encodeQueryItemRef`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:238

***

### get()

> **get**(`ref`): `Promise`\<`null` \| `Item`\>

#### Parameters

• **ref**: `ItemRef`

#### Returns

`Promise`\<`null` \| `Item`\>

#### Inherited from

`StoreAdapter.get`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:93

***

### getMany()

> **getMany**(`refs`): `Promise`\<`null` \| `Item`[]\>

#### Parameters

• **refs**: `ItemRef`[]

#### Returns

`Promise`\<`null` \| `Item`[]\>

#### Inherited from

`StoreAdapter.getMany`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:97

***

### getPartialMany()

> **getPartialMany**(`refs`): `Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Parameters

• **refs**: `ItemRef`[]

#### Returns

`Promise`\<`null` \| (`null` \| `Item`)[]\>

#### Overrides

`StoreAdapter.getPartialMany`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:23](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L23)

***

### getQueryResult()

> **getQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `matcher`?): `Promise`\<`null` \| `object`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef**: `CacheRef`\<`Result`, `Root`, `Args`\>

• **matcher?**: `QueryMatching`\<`Args`\>

#### Returns

`Promise`\<`null` \| `object`\>

#### Inherited from

`StoreAdapter.getQueryResult`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:128

***

### getRef()

> `protected` **getRef**(`root`): `ItemRef`

#### Parameters

• **root**: `Item`

#### Returns

`ItemRef`

#### Inherited from

`StoreAdapter.getRef`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:339

***

### getRefFallback()

> `protected` **getRefFallback**(`root`): `undefined` \| `string`

#### Parameters

• **root**: `unknown`

#### Returns

`undefined` \| `string`

#### Inherited from

`StoreAdapter.getRefFallback`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:356

***

### getRevision()

> `protected` **getRevision**(): `string`

#### Returns

`string`

#### Inherited from

`StoreAdapter.getRevision`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:78

***

### getTtl()

> `protected` **getTtl**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:91](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L91)

***

### loaderFn()

> `protected` **loaderFn**(`refs`): `Promise`\<`any`[]\>

#### Parameters

• **refs**: readonly `ItemRef`[]

#### Returns

`Promise`\<`any`[]\>

#### Inherited from

`StoreAdapter.loaderFn`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:48

***

### loadQueryMetadata()

> `protected` **loadQueryMetadata**(`queryRef`, `parentRef`?, `args`?): `Promise`\<`null` \| `string`[]\>

#### Parameters

• **queryRef**: `string`

• **parentRef?**: `ParentRef`

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`null` \| `string`[]\>

#### Overrides

`StoreAdapter.loadQueryMetadata`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:62](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L62)

***

### refillNullQueryItems()

> `protected` **refillNullQueryItems**(`nullableRefs`, `items`): (`null` \| `Item`)[]

#### Parameters

• **nullableRefs**: (`null` \| `ItemRef`)[]

• **items**: `Item`[]

#### Returns

(`null` \| `Item`)[]

#### Inherited from

`StoreAdapter.refillNullQueryItems`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:219

***

### save()

> **save**(`item`): `Promise`\<`void`\>

#### Parameters

• **item**: `Item`

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.save`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:113

***

### saveMany()

> **saveMany**(`items`): `Promise`\<`void`\>

#### Parameters

• **items**: `Item`[]

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.saveMany`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:32](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L32)

***

### saveQueryMetadata()

> `protected` **saveQueryMetadata**(`queryRef`, `meta`, `parentRef`?, `args`?): `Promise`\<`void`\>

#### Parameters

• **queryRef**: `string`

• **meta**: `string`[]

• **parentRef?**: `ParentRef`

• **args?**: `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<`void`\>

#### Overrides

`StoreAdapter.saveQueryMetadata`

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:52](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L52)

***

### saveQueryResult()

> **saveQueryResult**\<`Result`, `Root`, `Args`\>(`queryRef`, `data`, `matcher`?): `Promise`\<`void`\>

#### Type Parameters

• **Result**

• **Root**

• **Args**

#### Parameters

• **queryRef**: `CacheRef`\<`Result`, `Root`, `Args`\>

• **data**: `Result`

• **matcher?**: `QueryMatching`\<`Args`\>

#### Returns

`Promise`\<`void`\>

#### Inherited from

`StoreAdapter.saveQueryResult`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:160

***

### searchQueries()

> `protected` **searchQueries**(`queryRef`, `parentRef`, `args`): `Promise`\<`string`[]\>

#### Parameters

• **queryRef**: `string` = `'*'`

• **parentRef**: `NonNullable`\<`ParentRef`\> = `'*'`

• **args**: `Record`\<`string`, `unknown`\> = `{}`

#### Returns

`Promise`\<`string`[]\>

#### Defined in

[packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts:97](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-cloudflare/lib/cloudflare-store-adapter.ts#L97)

***

### shouldEncode()

> `protected` **shouldEncode**(`value`): `boolean`

#### Parameters

• **value**: `string`

#### Returns

`boolean`

#### Inherited from

`StoreAdapter.shouldEncode`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:335

***

### validateRefType()

> `protected` **validateRefType**(`ref`): asserts ref is string \| number \| bigint

#### Parameters

• **ref**: `unknown`

#### Returns

asserts ref is string \| number \| bigint

#### Inherited from

`StoreAdapter.validateRefType`

#### Defined in

.yarn/\_\_virtual\_\_/@baeta-extension-cache-virtual-9b62c84fde/1/packages/extension-cache/lib/store-adapter.ts:369
