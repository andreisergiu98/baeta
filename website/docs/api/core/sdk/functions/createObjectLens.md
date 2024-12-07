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

[utils/object.ts:35](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/utils/object.ts#L35)