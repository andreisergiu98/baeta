# normalizeSafe()

> `const` **normalizeSafe**: (`p`) => `string` = `upath.normalizeSafe`

Exactly like path.normalize(path), but it keeps the first meaningful ./.

Note that the unix / is returned everywhere, so windows \ is always converted to unix /.

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
