# createSerializer()

> **createSerializer**\<`Input`, `Output`\>(`serializers?`): [`Serializer`](../interfaces/Serializer.md)

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Input`

</td>
<td>

`any`

</td>
</tr>
<tr>
<td>

`Output` _extends_ [`SerializerValue`](../type-aliases/SerializerValue.md)

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

## Parameters

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

`serializers?`

</td>
<td>

[`SerializerTransformer`](../type-aliases/SerializerTransformer.md)\<`Input`, `Output`\>[]

</td>
</tr>
</tbody>
</table>

## Returns

[`Serializer`](../interfaces/Serializer.md)
