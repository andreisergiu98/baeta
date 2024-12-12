# Class: UpstashStore

## Extends

- `Store`

## Constructors

### new UpstashStore()

> **new UpstashStore**(`client`): [`UpstashStore`](UpstashStore.md)

#### Parameters

##### client

`Redis`

#### Returns

[`UpstashStore`](UpstashStore.md)

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
