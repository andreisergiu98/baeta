# Class: CacheRef\<Result, Root, Args\>

## Type Parameters

• **Result**

• **Root**

• **Args**

## Constructors

### new CacheRef()

> **new CacheRef**\<`Result`, `Root`, `Args`\>(`type`, `field`, `hash`, `revision`): [`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

#### Parameters

• **type**: `string`

• **field**: `string`

• **hash**: `string`

• **revision**: `number` = `1`

#### Returns

[`CacheRef`](CacheRef.md)\<`Result`, `Root`, `Args`\>

#### Defined in

[packages/extension-cache/lib/ref.ts:7](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache/lib/ref.ts#L7)

## Methods

### getHash()

> **getHash**(): `string`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/ref.ts:26](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache/lib/ref.ts#L26)

***

### getRevision()

> **getRevision**(): `number`

#### Returns

`number`

#### Defined in

[packages/extension-cache/lib/ref.ts:18](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache/lib/ref.ts#L18)

***

### setRevision()

> **setRevision**(`revision`): `void`

#### Parameters

• **revision**: `number`

#### Returns

`void`

#### Defined in

[packages/extension-cache/lib/ref.ts:22](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache/lib/ref.ts#L22)

***

### toString()

> **toString**(): `string`

#### Returns

`string`

#### Defined in

[packages/extension-cache/lib/ref.ts:14](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-cache/lib/ref.ts#L14)
