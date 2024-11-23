# Function: createEnvParser()

> **createEnvParser**(`getValue`): \<`T`, `R`, `D`\>(`key`, `options`) => `R` *extends* `true` ? `InferType`\<`T`\> : `D` *extends* `undefined` ? `undefined` \| `InferType`\<`T`\> : `InferType`\<`T`\>

## Parameters

• **getValue**

## Returns

`Function`

### Type Parameters

• **T** *extends* `Types`

• **R** *extends* `undefined` \| `boolean`

• **D** *extends* `undefined` \| `string` \| `number` \| `boolean`

### Parameters

• **key**: `string`

• **options**: [`EnvOptions`](../interfaces/EnvOptions.md)\<`T`, `R`, `D`\>

### Returns

`R` *extends* `true` ? `InferType`\<`T`\> : `D` *extends* `undefined` ? `undefined` \| `InferType`\<`T`\> : `InferType`\<`T`\>

## Defined in

[index.ts:104](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/env/index.ts#L104)
