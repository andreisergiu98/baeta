# TransformResult\<ProvidedOptions\>

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

`ProvidedOptions` _extends_ [`TransformOptions`](TransformOptions.md)

</td>
<td>

[`TransformOptions`](TransformOptions.md)

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

<a id="code"></a> `code`

</td>
<td>

`string`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

<a id="legalcomments"></a> `legalComments`

</td>
<td>

`string` \| `ProvidedOptions`\[`"legalComments"`\] _extends_ `"external"` ? `never` : `undefined`

</td>
<td>

Only when "legalComments" is "external"

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

<a id="map"></a> `map`

</td>
<td>

`string`

</td>
<td>

&hyphen;

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
