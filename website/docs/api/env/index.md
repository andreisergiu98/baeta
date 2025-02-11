# @baeta/env

## Interfaces

### EnvOptions\<T, R, D\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`EnvTypes`](index.md#envtypes)

</td>
</tr>
<tr>
<td>

`R` _extends_ `boolean` \| `undefined`

</td>
</tr>
<tr>
<td>

`D` _extends_ [`EnvInferType`](index.md#envinfertypet)\<`T`\> \| `undefined`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="type"></a> `type`

</td>
<td>

`T`

</td>
<td>

The expected type of the environment variable.

</td>
</tr>
<tr>
<td>

<a id="default"></a> `default?`

</td>
<td>

`D`

</td>
<td>

Default value if the environment variable is not provided.

</td>
</tr>
<tr>
<td>

<a id="required"></a> `required?`

</td>
<td>

`R`

</td>
<td>

Whether the environment variable is required.

</td>
</tr>
<tr>
<td>

<a id="resolver"></a> `resolver?`

</td>
<td>

(`value`: `string`) => [`EnvInferType`](index.md#envinfertypet)\<`T`\>

</td>
<td>

Custom resolver to convert the environment variable to the expected type.

</td>
</tr>
</tbody>
</table>

## Type Aliases

### EnvInferType\<T\>

> **EnvInferType**\<`T`\>: `T` _extends_ `"string"` ? `string` : `T` _extends_ `"number"` ? `number` : `boolean`

Maps environment variable types to their TypeScript equivalents.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`EnvTypes`](index.md#envtypes)

</td>
<td>

The environment variable type

</td>
</tr>
</tbody>
</table>

---

### EnvTypes

> **EnvTypes**: `"string"` \| `"number"` \| `"boolean"`

Supported environment variable types.

## Functions

### createEnvParser()

> **createEnvParser**(`getValue`): \<`T`, `R`, `D`\>(`key`, `options`) => `R` _extends_ `true` ? [`EnvInferType`](index.md#envinfertypet)\<`T`\> : `D` _extends_ `undefined` ? `undefined` \| [`EnvInferType`](index.md#envinfertypet)\<`T`\> : [`EnvInferType`](index.md#envinfertypet)\<`T`\>

Creates an environment variable parser..
See https://baeta.io/docs/guides/environment

#### Parameters

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

(`key`) => `undefined` \| `string`

</td>
<td>

Function to retrieve environment variable values

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

A parsing function that converts environment variables to strongly-typed values

##### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`EnvTypes`](index.md#envtypes)

</td>
</tr>
<tr>
<td>

`R` _extends_ `undefined` \| `boolean`

</td>
</tr>
<tr>
<td>

`D` _extends_ `undefined` \| `string` \| `number` \| `boolean`

</td>
</tr>
</tbody>
</table>

##### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`key`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`EnvOptions`](index.md#envoptionst-r-d)\<`T`, `R`, `D`\>

</td>
</tr>
</tbody>
</table>

##### Returns

`R` _extends_ `true` ? [`EnvInferType`](index.md#envinfertypet)\<`T`\> : `D` _extends_ `undefined` ? `undefined` \| [`EnvInferType`](index.md#envinfertypet)\<`T`\> : [`EnvInferType`](index.md#envinfertypet)\<`T`\>

#### Example

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

#### Throws

When:

- A required value is missing and has no default
- The value type doesn't match the specified type
- A custom resolver returns an incorrect type
