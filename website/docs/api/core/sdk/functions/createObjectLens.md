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
