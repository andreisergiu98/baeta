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

[packages/extension-cache/lib/store.ts:5](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-cache/lib/store.ts#L5)
