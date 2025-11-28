# defaultExt()

> `const` **defaultExt**: (`filename`, `ext`, `ignoreExts?`, `maxSize?`) => `string` = `upath.defaultExt`

Adds .ext to filename, only if it doesn't already have any old extension.

(Old) extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) will force adding default .ext even if one of these is present.

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

string filename to default to it's extension

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

string extension to default to

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
