# Class: `abstract` Store

Base class for cache storage implementations

## Constructors

### new Store()

> **new Store**(): [`Store`](Store.md)

#### Returns

[`Store`](Store.md)

## Methods

### createStoreAdapter()

> `abstract` **createStoreAdapter**\<`T`\>(`options`, `type`, `hash`): [`StoreAdapter`](StoreAdapter.md)\<`T`\>

Creates a new store adapter for a specific type

#### Type Parameters

• **T**

#### Parameters

##### options

[`StoreOptions`](../interfaces/StoreOptions.md)\<`T`\>

Store configuration options

##### type

`string`

Type name for the cached items

##### hash

`string`

Unique hash for the type

#### Returns

[`StoreAdapter`](StoreAdapter.md)\<`T`\>
