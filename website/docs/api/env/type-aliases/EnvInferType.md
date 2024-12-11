# Type Alias: EnvInferType\<T\>

> **EnvInferType**\<`T`\>: `T` _extends_ `"string"` ? `string` : `T` _extends_ `"number"` ? `number` : `boolean`

Maps environment variable types to their TypeScript equivalents.

## Type Parameters

• **T** _extends_ [`EnvTypes`](EnvTypes.md)

The environment variable type
