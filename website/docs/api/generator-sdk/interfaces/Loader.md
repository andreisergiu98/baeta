# Interface: Loader\<TOptions\>

Interface for custom schema loaders.

## Type Parameters

• **TOptions** = `any`

## Methods

### load()

> **load**(`pointer`, `options`?): `Promise`\<`null` \| `any`[]\>

#### Parameters

##### pointer

`string`

##### options?

`TOptions`

#### Returns

`Promise`\<`null` \| `any`[]\>

---

### loadSync()?

> `optional` **loadSync**(`pointer`, `options`?): `null` \| `any`[]

#### Parameters

##### pointer

`string`

##### options?

`TOptions`

#### Returns

`null` \| `any`[]
