# createEnvParser()

> **createEnvParser**(`getValue`): \<`T`, `R`, `D`\>(`key`, `options`) => `R` *extends* `true` ? [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : `D` *extends* `undefined` ? [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> \| `undefined` : [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

Creates an environment variable parser..
See https://baeta.io/docs/guides/environment

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`getValue`

</td>
<td>

(`key`) => `string` \| `undefined`

</td>
<td>

Function to retrieve environment variable values

</td>
</tr>
</tbody>
</table>

## Returns

A parsing function that converts environment variables to strongly-typed values

\<`T`, `R`, `D`\>(`key`, `options`) => `R` *extends* `true` ? [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> : `D` *extends* `undefined` ? [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> \| `undefined` : [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

## Example

```typescript
const parse = createEnvParser((key) => process.env[key]);

const port = parse('PORT', {
  type: 'number',
  required: true,
  default: 3000
});

const debug = parse('DEBUG', {
  type: 'boolean',
  default: false
});
```

## Throws

When:
- A required value is missing and has no default
- The value type doesn't match the specified type
- A custom resolver returns an incorrect type
