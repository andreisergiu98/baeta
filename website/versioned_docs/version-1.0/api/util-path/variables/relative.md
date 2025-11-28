# relative()

> `const` **relative**: (`from`, `to`) => `string` = `upath.relative`

Solve the relative path from {from} to {to}.
At times we have two absolute paths, and we need to derive the relative path from one to the other. This is actually the reverse transform of path.resolve.

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

`from`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`to`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Returns

`string`
