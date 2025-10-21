# createObjectLens()

> **createObjectLens**\<`T`\>(`input`, `path`): `object`

A lens to get and set values in an object, that fails silently if the path does not exist.

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

`T`

</td>
<td>

`unknown`

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

`input`

</td>
<td>

`Record`\<`string`, `unknown`\>

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

(`string` \| `number`)[]

</td>
</tr>
</tbody>
</table>

## Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`get()`

</td>
<td>

() => `T` \| `null`

</td>
</tr>
<tr>
<td>

`set()`

</td>
<td>

(`value`) => `boolean`

</td>
</tr>
</tbody>
</table>
