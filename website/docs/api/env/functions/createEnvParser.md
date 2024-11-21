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

[index.ts:104](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/env/index.ts#L104)
