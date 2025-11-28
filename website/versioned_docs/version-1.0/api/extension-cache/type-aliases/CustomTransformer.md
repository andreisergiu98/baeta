# CustomTransformer\<Input, Output\>

> **CustomTransformer**\<`Input`, `Output`\> = `object`

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

`Input`

</td>
</tr>
<tr>
<td>

`Output` _extends_ [`SerializerValue`](SerializerValue.md)

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="deserialize"></a> `deserialize`

</td>
<td>

(`value`) => `Input`

</td>
</tr>
<tr>
<td>

<a id="isapplicable"></a> `isApplicable`

</td>
<td>

(`value`) => `value is Input`

</td>
</tr>
<tr>
<td>

<a id="kind"></a> `kind`

</td>
<td>

`"custom"`

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="serialize"></a> `serialize`

</td>
<td>

(`value`) => `Output`

</td>
</tr>
</tbody>
</table>
