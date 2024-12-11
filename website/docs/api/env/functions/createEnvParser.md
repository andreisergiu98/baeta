# Function: createEnvParser()

> **createEnvParser**(`getValue`): \<`T`, `R`, `D`\>(`key`, `options`) => `R` _extends_ `true` ? `InferType`\<`T`\> : `D` _extends_ `undefined` ? `undefined` \| `InferType`\<`T`\> : `InferType`\<`T`\>

## Parameters

### getValue

(`key`) => `undefined` \| `string`

## Returns

`Function`

### Type Parameters

• **T** _extends_ `Types`

• **R** _extends_ `undefined` \| `boolean`

• **D** _extends_ `undefined` \| `string` \| `number` \| `boolean`

### Parameters

#### key

`string`

#### options

[`EnvOptions`](../interfaces/EnvOptions.md)\<`T`, `R`, `D`\>

### Returns

`R` _extends_ `true` ? `InferType`\<`T`\> : `D` _extends_ `undefined` ? `undefined` \| `InferType`\<`T`\> : `InferType`\<`T`\>
