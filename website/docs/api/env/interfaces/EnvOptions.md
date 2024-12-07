# Interface: EnvOptions\<T, R, D\>

## Type Parameters

• **T** *extends* `Types`

• **R** *extends* `boolean` \| `undefined`

• **D** *extends* `InferType`\<`T`\> \| `undefined`

## Properties

### default?

> `optional` **default**: `D`

***

### required?

> `optional` **required**: `R`

***

### resolver()?

> `optional` **resolver**: (`value`) => `InferType`\<`T`\>

#### Parameters

• **value**: `string`

#### Returns

`InferType`\<`T`\>

***

### type

> **type**: `T`
