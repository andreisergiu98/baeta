# Class: `abstract` Store

## Constructors

### new Store()

> **new Store**(): [`Store`](Store.md)

#### Returns

[`Store`](Store.md)

## Methods

### createStoreAdapter()

> `abstract` **createStoreAdapter**\<`T`\>(`options`, `type`, `hash`): [`StoreAdapter`](StoreAdapter.md)\<`T`\>

#### Type Parameters

• **T**

#### Parameters

• **options**: [`StoreOptions`](../interfaces/StoreOptions.md)\<`T`\>

• **type**: `string`

• **hash**: `string`

#### Returns

[`StoreAdapter`](StoreAdapter.md)\<`T`\>

#### Defined in

[packages/extension-cache/lib/store.ts:5](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-cache/lib/store.ts#L5)
