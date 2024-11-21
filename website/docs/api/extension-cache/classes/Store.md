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

[packages/extension-cache/lib/store.ts:5](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache/lib/store.ts#L5)
