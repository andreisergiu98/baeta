# defineQuery()

> **defineQuery**\<`Result`, `Args`, `Indexes`, `Item`\>(`options`): `QueryFactory`\<`Result`, `Args`, `Indexes`, `Item`\>

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

`Result`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Args` *extends* [`QueryArgs`](../type-aliases/QueryArgs.md)

</td>
<td>

`Record`\<`string`, `never`\>

</td>
</tr>
<tr>
<td>

`Indexes` *extends* [`QueryArgsIndexes`](../type-aliases/QueryArgsIndexes.md)\<`Args`, `Indexes`\>

</td>
<td>

`Record`\<`string`, `never`\>

</td>
</tr>
<tr>
<td>

`Item`

</td>
<td>

`ItemFromQueryResult`\<`Result`\>

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

`options`

</td>
<td>

[`QueryOptions`](../type-aliases/QueryOptions.md)\<`Result`, `Args`, `Indexes`, `Item`\>

</td>
</tr>
</tbody>
</table>

## Returns

`QueryFactory`\<`Result`, `Args`, `Indexes`, `Item`\>
