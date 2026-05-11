# normalizeString()

> **normalizeString**(`path`, `allowAboveRoot`): `string`

Resolves a string path, resolving '.' and '.' segments and allowing paths above the root.

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

`path`

</td>
<td>

`string`

</td>
<td>

The path to normalise.

</td>
</tr>
<tr>
<td>

`allowAboveRoot`

</td>
<td>

`boolean`

</td>
<td>

Whether to allow the resulting path to be above the root directory.

</td>
</tr>
</tbody>
</table>

## Returns

`string`

the normalised path string.
