# GetGrant\<Grants, Result, Root, Context, Args\>

> **GetGrant**\<`Grants`, `Result`, `Root`, `Context`, `Args`\> = [`GetGrantFn`](GetGrantFn.md)\<`Grants`, `Result`, `Root`, `Context`, `Args`\> \| [`GetGrantResult`](GetGrantResult.md)\<`Grants`\>

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

`Root`

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
</tbody>
</table>
