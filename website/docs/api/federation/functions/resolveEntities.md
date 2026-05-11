# resolveEntities()

> **resolveEntities**\<`T`, `R`, `Ctx`, `Info`\>(`representations`, `entityHandlerMap`, `ctx`, `info`): `Promise`\<`any`[]\>

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

`T` *extends* `string`

</td>
</tr>
<tr>
<td>

`R` *extends* `Record`\<`string`, `unknown`\>

</td>
</tr>
<tr>
<td>

`Ctx`

</td>
</tr>
<tr>
<td>

`Info`

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

`representations`

</td>
<td>

`EntityRepresentation`\<`T`, `R`\>[]

</td>
</tr>
<tr>
<td>

`entityHandlerMap`

</td>
<td>

`EntityHandlerMap`\<`T`, `Ctx`, `Info`\>

</td>
</tr>
<tr>
<td>

`ctx`

</td>
<td>

`Ctx`

</td>
</tr>
<tr>
<td>

`info`

</td>
<td>

`Info`

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`any`[]\>
