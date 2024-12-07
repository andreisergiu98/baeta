# Class: KeyvStore

## Extends

- `Store`

## Constructors

### new KeyvStore()

> **new KeyvStore**(`keyv`): [`KeyvStore`](KeyvStore.md)

#### Parameters

• **keyv**: `Keyv`\<`any`\>

#### Returns

[`KeyvStore`](KeyvStore.md)

#### Overrides

`Store.constructor`

#### Defined in

[store.ts:6](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-keyv/lib/store.ts#L6)

## Properties

### keyv

> `protected` **keyv**: `Keyv`\<`any`\>

#### Defined in

[store.ts:6](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-keyv/lib/store.ts#L6)

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

#### Defined in

[store.ts:10](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache-keyv/lib/store.ts#L10)