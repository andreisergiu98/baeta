# BuildResult\<ProvidedOptions\>

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

`ProvidedOptions` _extends_ [`BuildOptions`](BuildOptions.md)

</td>
<td>

[`BuildOptions`](BuildOptions.md)

</td>
</tr>
</tbody>
</table>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="errors"></a> `errors`

</td>
<td>

[`Message`](Message.md)[]

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="manglecache"></a> `mangleCache`

</td>
<td>

`Record`\<`string`, `string` \| `false`\> \| `ProvidedOptions`\[`"mangleCache"`\] _extends_ `Object` ? `never` : `undefined`

</td>
<td>

Only when "mangleCache" is present

</td>
</tr>
<tr>
<td>

<a id="metafile"></a> `metafile`

</td>
<td>

[`Metafile`](Metafile.md) \| `ProvidedOptions`\[`"metafile"`\] _extends_ `true` ? `never` : `undefined`

</td>
<td>

Only when "metafile: true"

</td>
</tr>
<tr>
<td>

<a id="outputfiles"></a> `outputFiles`

</td>
<td>

[`OutputFile`](OutputFile.md)[] \| `ProvidedOptions`\[`"write"`\] _extends_ `false` ? `never` : `undefined`

</td>
<td>

Only when "write: false"

</td>
</tr>
<tr>
<td>

<a id="warnings"></a> `warnings`

</td>
<td>

[`Message`](Message.md)[]

</td>
<td>

&hyphen;

</td>
</tr>
</tbody>
</table>
