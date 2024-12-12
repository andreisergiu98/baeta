# Class: RedisStore

## Extends

- `Store`

## Constructors

### new RedisStore()

> **new RedisStore**(`client`): [`RedisStore`](RedisStore.md)

#### Parameters

##### client

`Redis`

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

Creates a new store adapter for a specific type

#### Type Parameters

• **T**

#### Parameters

##### options

`StoreOptions`\<`T`\>

Store configuration options

##### type

`string`

Type name for the cached items

##### hash

`string`

Unique hash for the type

#### Returns

`StoreAdapter`\<`T`\>

#### Overrides

`Store.createStoreAdapter`
