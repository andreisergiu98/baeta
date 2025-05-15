# changeExt()

> `const` **changeExt**: (`filename`, `ext`, `ignoreExts?`, `maxSize?`) => `string` = `upath.changeExt`

Changes a filename's extension to ext. If it has no (valid) extension, it adds it.

Valid extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not changed - the new extension is added instead.

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

string filename to change it's extension

</td>
</tr>
<tr>
<td>

`ext`

</td>
<td>

`string`

</td>
<td>

string extension to change to

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
