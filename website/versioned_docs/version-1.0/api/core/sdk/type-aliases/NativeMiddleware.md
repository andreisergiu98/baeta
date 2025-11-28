# NativeMiddleware()\<Result, Root, Context, Args\>

> **NativeMiddleware**\<`Result`, `Root`, `Context`, `Args`\> = (`next`) => `GraphQLFieldResolver`\<`Root`, `Context`, `Args`, `Result` \| `PromiseLike`\<`Result`\>\>

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

`unknown`

</td>
</tr>
<tr>
<td>

`Root`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Args`

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

`next`

</td>
<td>

`GraphQLFieldResolver`\<`Root`, `Context`, `Args`, `Result` \| `PromiseLike`\<`Result`\>\>

</td>
</tr>
</tbody>
</table>

## Returns

`GraphQLFieldResolver`\<`Root`, `Context`, `Args`, `Result` \| `PromiseLike`\<`Result`\>\>
