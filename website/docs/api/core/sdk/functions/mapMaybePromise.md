# mapMaybePromise()

> **mapMaybePromise**\<`R`, `U`\>(`result`, `fn`): `U` \| `PromiseLike`\<`U`\>

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

`R`

</td>
</tr>
<tr>
<td>

`U`

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

`result`

</td>
<td>

`R` \| `PromiseLike`\<`R`\>

</td>
</tr>
<tr>
<td>

`fn`

</td>
<td>

(`x`) => `U` \| `PromiseLike`\<`U`\>

</td>
</tr>
</tbody>
</table>

## Returns

`U` \| `PromiseLike`\<`U`\>
