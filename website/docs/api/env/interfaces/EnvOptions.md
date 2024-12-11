# Interface: EnvOptions\<T, R, D\>

## Type Parameters

• **T** _extends_ [`EnvTypes`](../type-aliases/EnvTypes.md)

• **R** _extends_ `boolean` \| `undefined`

• **D** _extends_ [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> \| `undefined`

## Properties

### default?

> `optional` **default**: `D`

---

### required?

> `optional` **required**: `R`

---

### resolver()?

> `optional` **resolver**: (`value`) => [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

#### Parameters

##### value

`string`

#### Returns

[`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

---

### type

> **type**: `T`
