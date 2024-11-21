# Function: createObjectLens()

> **createObjectLens**\<`T`\>(`input`, `path`): `object`

A lens to get and set values in an object, that fails silently if the path does not exist.

## Type Parameters

• **T** = `unknown`

## Parameters

• **input**: `Record`\<`string`, `unknown`\>

• **path**: (`string` \| `number`)[]

## Returns

`object`

### get()

> **get**: () => `null` \| `T`

#### Returns

`null` \| `T`

### set()

> **set**: (`value`) => `boolean`

#### Parameters

• **value**: `T`

#### Returns

`boolean`

## Defined in

[utils/object.ts:35](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/utils/object.ts#L35)
