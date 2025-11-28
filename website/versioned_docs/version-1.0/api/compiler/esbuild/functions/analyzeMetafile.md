# analyzeMetafile()

> **analyzeMetafile**(`metafile`, `options?`): `Promise`\<`string`\>

Pretty-prints an analysis of the metafile JSON to a string. This is just for
convenience to be able to match esbuild's pretty-printing exactly. If you want
to customize it, you can just inspect the data in the metafile yourself.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#analyze

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

`metafile`

</td>
<td>

`string` \| [`Metafile`](../interfaces/Metafile.md)

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`AnalyzeMetafileOptions`](../interfaces/AnalyzeMetafileOptions.md)

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<`string`\>
