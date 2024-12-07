# Interface: EnvOptions\<T, R, D\>

## Type Parameters

• **T** *extends* `Types`

• **R** *extends* `boolean` \| `undefined`

• **D** *extends* `InferType`\<`T`\> \| `undefined`

## Properties

### default?

> `optional` **default**: `D`

#### Defined in

[index.ts:25](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/env/index.ts#L25)

***

### required?

> `optional` **required**: `R`

#### Defined in

[index.ts:24](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/env/index.ts#L24)

***

### resolver()?

> `optional` **resolver**: (`value`) => `InferType`\<`T`\>

#### Parameters

• **value**: `string`

#### Returns

`InferType`\<`T`\>

#### Defined in

[index.ts:27](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/env/index.ts#L27)

***

### type

> **type**: `T`

#### Defined in

[index.ts:26](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/env/index.ts#L26)
