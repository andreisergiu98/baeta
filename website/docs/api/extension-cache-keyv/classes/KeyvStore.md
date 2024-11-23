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

[store.ts:6](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-keyv/lib/store.ts#L6)

## Properties

### keyv

> `protected` **keyv**: `Keyv`\<`any`\>

#### Defined in

[store.ts:6](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-keyv/lib/store.ts#L6)

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

[store.ts:10](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache-keyv/lib/store.ts#L10)