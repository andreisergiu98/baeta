# Interface: EnvOptions\<T, R, D\>

## Type Parameters

• **T** _extends_ `Types`

• **R** _extends_ `boolean` \| `undefined`

• **D** _extends_ `InferType`\<`T`\> \| `undefined`

## Properties

### default?

> `optional` **default**: `D`

---

### required?

> `optional` **required**: `R`

---

### resolver()?

> `optional` **resolver**: (`value`) => `InferType`\<`T`\>

#### Parameters

##### value

`string`

#### Returns

`InferType`\<`T`\>

---

### type

> **type**: `T`
