# EnvInferType\<T\>

> **EnvInferType**\<`T`\> = `T` _extends_ `"string"` ? `string` : `T` _extends_ `"number"` ? `number` : `boolean`

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

`T` _extends_ [`EnvTypes`](EnvTypes.md)

</td>
<td>

The environment variable type

</td>
</tr>
</tbody>
</table>
