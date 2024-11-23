# Interface: EnvOptions\<T, R, D\>

## Type Parameters

• **T** *extends* `Types`

• **R** *extends* `boolean` \| `undefined`

• **D** *extends* `InferType`\<`T`\> \| `undefined`

## Properties

### default?

> `optional` **default**: `D`

#### Defined in

[index.ts:25](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/env/index.ts#L25)

***

### required?

> `optional` **required**: `R`

#### Defined in

[index.ts:24](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/env/index.ts#L24)

***

### resolver()?

> `optional` **resolver**: (`value`) => `InferType`\<`T`\>

#### Parameters

• **value**: `string`

#### Returns

`InferType`\<`T`\>

#### Defined in

[index.ts:27](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/env/index.ts#L27)

***

### type

> **type**: `T`

#### Defined in

[index.ts:26](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/env/index.ts#L26)
