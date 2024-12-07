# Class: RedisStore

## Extends

- `Store`

## Constructors

### new RedisStore()

> **new RedisStore**(`client`): [`RedisStore`](RedisStore.md)

#### Parameters

• **client**: `Redis`

#### Returns

[`RedisStore`](RedisStore.md)

#### Overrides

`Store.constructor`

## Properties

### client

> `protected` **client**: `Redis`

## Methods

### createStoreAdapter()

> **createStoreAdapter**\<`T`\>(`options`, `type`, `hash`): `StoreAdapter`\<`T`\>

#### Type Parameters

• **T**

#### Parameters

• **options**: `StoreOptions`\<`T`\>

• **type**: `string`

• **hash**: `string`

#### Returns

`StoreAdapter`\<`T`\>

#### Overrides

`Store.createStoreAdapter`
