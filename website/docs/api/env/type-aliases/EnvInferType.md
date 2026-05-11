# EnvInferType\<T\>

> **EnvInferType**\<`T`\> = `T` *extends* `"string"` ? `string` : `T` *extends* `"number"` ? `number` : `boolean`

Maps environment variable types to their TypeScript equivalents.

## Type Parameters

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

`T` *extends* [`EnvTypes`](EnvTypes.md)

</td>
<td>

The environment variable type

</td>
</tr>
</tbody>
</table>
