# Interface: EnvOptions\<T, R, D\>

## Type Parameters

• **T** _extends_ [`EnvTypes`](../type-aliases/EnvTypes.md)

• **R** _extends_ `boolean` \| `undefined`

• **D** _extends_ [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> \| `undefined`

## Properties

### type

> **type**: `T`

The expected type of the environment variable.

---

### default?

> `optional` **default**: `D`

Default value if the environment variable is not provided.

---

### required?

> `optional` **required**: `R`

Whether the environment variable is required.

---

### resolver()?

> `optional` **resolver**: (`value`) => [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

Custom resolver to convert the environment variable to the expected type.

#### Parameters

##### value

`string`

#### Returns

[`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>
