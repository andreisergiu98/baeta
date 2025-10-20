# basename()

> `const` **basename**: (`p`, `ext?`) => `string` = `upath.basename`

Return the last portion of a path. Similar to the Unix basename command.
Often used to extract the file name from a fully qualified path.

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`p`

</td>
<td>

`string`

</td>
<td>

the path to evaluate.

</td>
</tr>
<tr>
<td>

`ext?`

</td>
<td>

`string`

</td>
<td>

optionally, an extension to remove from the result.

</td>
</tr>
</tbody>
</table>

## Returns

`string`
