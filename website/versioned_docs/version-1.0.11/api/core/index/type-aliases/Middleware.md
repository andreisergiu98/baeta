# Middleware()\<Result, Root, Context, Args\>

> **Middleware**\<`Result`, `Root`, `Context`, `Args`\> = (`params`, `next`) => `Promise`\<`Result`\>

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

[`MiddlewareParams`](MiddlewareParams.md)\<`Root`, `Context`, `Args`\>

</td>
</tr>
<tr>
<td>

`next`

</td>
<td>

[`MiddlewareNext`](MiddlewareNext.md)\<`Result`\>

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`Result`\>
