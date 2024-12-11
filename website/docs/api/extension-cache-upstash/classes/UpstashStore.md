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

#### Type Parameters

• **T**

#### Parameters

##### options

`StoreOptions`\<`T`\>

##### type

`string`

##### hash

`string`

#### Returns

`StoreAdapter`\<`T`\>

#### Overrides

`Store.createStoreAdapter`
