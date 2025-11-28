# Serializer

## Methods

### deserialize()

> **deserialize**\<`T`\>(`payload`): `T`

#### Type Parameters

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

`T`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Parameters

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

`payload`

</td>
<td>

[`SerializerResult`](SerializerResult.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

---

### parse()

> **parse**\<`T`\>(`string`): `T`

#### Type Parameters

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

`T`

</td>
<td>

`unknown`

</td>
</tr>
</tbody>
</table>

#### Parameters

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

`string`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

---

### serialize()

> **serialize**(`object`): [`SerializerResult`](SerializerResult.md)

#### Parameters

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

`object`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

[`SerializerResult`](SerializerResult.md)

---

### stringify()

> **stringify**(`object`): `string`

#### Parameters

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

`object`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>

#### Returns

`string`
