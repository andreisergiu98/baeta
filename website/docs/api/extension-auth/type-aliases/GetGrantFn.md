# GetGrantFn()\<Grants, Result, Source, Context, Args, Info\>

> **GetGrantFn**\<`Grants`, `Result`, `Source`, `Context`, `Args`, `Info`\> = (`params`, `result`) => [`GetGrantResult`](GetGrantResult.md)\<`Grants`\> \| `PromiseLike`\<[`GetGrantResult`](GetGrantResult.md)\<`Grants`\>\>

Function that determines grants based on resolver parameters and result.
Used for dynamic permission granting based on resolved data.

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

`params`

</td>
<td>

[`ResolverParams`](../../core/index/type-aliases/ResolverParams.md)\<`Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`result`

</td>
<td>

`Result`

</td>
</tr>
</tbody>
</table>

## Returns

[`GetGrantResult`](GetGrantResult.md)\<`Grants`\> \| `PromiseLike`\<[`GetGrantResult`](GetGrantResult.md)\<`Grants`\>\>
