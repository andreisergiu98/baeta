# SameShape\<Out, In\>

> **SameShape**\<`Out`, `In`\> = `In` & `{ [Key in Exclude<keyof In, keyof Out>]: never }`

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

`Out`

</td>
</tr>
<tr>
<td>

`In` _extends_ `Out`

</td>
</tr>
</tbody>
</table>
