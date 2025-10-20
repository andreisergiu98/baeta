# GetGrant\<Grants, Result, Source, Context, Args, Info\>

> **GetGrant**\<`Grants`, `Result`, `Source`, `Context`, `Args`, `Info`\> = [`GetGrantFn`](GetGrantFn.md)\<`Grants`, `Result`, `Source`, `Context`, `Args`, `Info`\> \| [`GetGrantResult`](GetGrantResult.md)\<`Grants`\>

Union type for grant specifications.
Can be either a static grant result or a function that determines grants dynamically.

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

`Grants` _extends_ `string`

</td>
</tr>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Source`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
<tr>
<td>

`Info`

</td>
</tr>
</tbody>
</table>
