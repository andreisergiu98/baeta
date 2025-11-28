# Middleware()\<Result, Source, Context, Args, Info\>

> **Middleware**\<`Result`, `Source`, `Context`, `Args`, `Info`\> = (`next`, `params`) => `Result` \| `PromiseLike`\<`Result`\>

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

`next`

</td>
<td>

() => `Promise`\<`Result`\>

</td>
</tr>
<tr>
<td>

`params`

</td>
<td>

`MiddlewareParams`\<`Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

## Returns

`Result` \| `PromiseLike`\<`Result`\>
