# normalize()

> `const` **normalize**: (`p`) => `string` = `upath.normalize`

Normalize a string path, reducing '..' and '.' parts.
When multiple slashes are found, they're replaced by a single one; when the path contains a trailing slash, it is preserved. On Windows backslashes are used.

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

string path to normalize.

</td>
</tr>
</tbody>
</table>

## Returns

`string`
