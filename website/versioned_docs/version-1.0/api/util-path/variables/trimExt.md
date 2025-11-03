# trimExt()

> `const` **trimExt**: (`filename`, `ignoreExts?`, `maxSize?`) => `string` = `upath.trimExt`

Trims a filename's extension.

Extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not trimmed.

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

`filename`

</td>
<td>

`string`

</td>
<td>

string filename to trim it's extension

</td>
</tr>
<tr>
<td>

`ignoreExts?`

</td>
<td>

`string`[]

</td>
<td>

array extensions to ignore

</td>
</tr>
<tr>
<td>

`maxSize?`

</td>
<td>

`number`

</td>
<td>

number max length of the extension

</td>
</tr>
</tbody>
</table>

## Returns

`string`
