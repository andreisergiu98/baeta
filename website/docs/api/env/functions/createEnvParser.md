# Function: createEnvParser()

> **createEnvParser**(`getValue`): \<`T`, `R`, `D`\>(`key`, `options`) => `R` _extends_ `true` ? [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : `D` _extends_ `undefined` ? `undefined` \| [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

Creates an environment variable parser..
See https://baeta.io/docs/guides/environment

## Parameters

### getValue

(`key`) => `undefined` \| `string`

Function to retrieve environment variable values

## Returns

`Function`

A parsing function that converts environment variables to strongly-typed values

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

## Example

```typescript
const parse = createEnvParser((key) => process.env[key]);

const port = parse("PORT", {
  type: "number",
  required: true,
  default: 3000,
});

const debug = parse("DEBUG", {
  type: "boolean",
  default: false,
});
```

## Throws

When:

- A required value is missing and has no default
- The value type doesn't match the specified type
- A custom resolver returns an incorrect type
