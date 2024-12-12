# Class: KeyvStore

## Extends

- `Store`

## Constructors

### new KeyvStore()

> **new KeyvStore**(`keyv`): [`KeyvStore`](KeyvStore.md)

#### Parameters

##### keyv

`Keyv`\<`any`\>

#### Returns

[`KeyvStore`](KeyvStore.md)

#### Overrides

`Store.constructor`

## Properties

### keyv

> `protected` **keyv**: `Keyv`\<`any`\>

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
