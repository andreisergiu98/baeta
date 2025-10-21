# EnvOptions\<T, R, D\>

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` _extends_ [`EnvTypes`](../type-aliases/EnvTypes.md)

</td>
</tr>
<tr>
<td>

`R` _extends_ `boolean` \| `undefined`

</td>
</tr>
<tr>
<td>

`D` _extends_ [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\> \| `undefined`

</td>
</tr>
</tbody>
</table>

## Properties

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

(`value`) => [`EnvInferType`](../type-aliases/EnvInferType.md)\<`T`\>

</td>
<td>

Custom resolver to convert the environment variable to the expected type.

</td>
</tr>
</tbody>
</table>
