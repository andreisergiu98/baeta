# Function: createEnvParser()

> **createEnvParser**(`getValue`): \<`T`, `R`, `D`\>(`key`, `options`) => `R` _extends_ `true` ? [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : `D` _extends_ `undefined` ? `undefined` \| [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

## Parameters

### getValue

(`key`) => `undefined` \| `string`

## Returns

`Function`

### Type Parameters

• **T** _extends_ [`EnvTypes`](../type-aliases/EnvTypes.md)

• **R** _extends_ `undefined` \| `boolean`

• **D** _extends_ `undefined` \| `string` \| `number` \| `boolean`

### Parameters

#### key

`string`

#### options

[`EnvOptions`](../interfaces/EnvOptions.md)\<`T`, `R`, `D`\>

### Returns

`R` _extends_ `true` ? [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : `D` _extends_ `undefined` ? `undefined` \| [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>
