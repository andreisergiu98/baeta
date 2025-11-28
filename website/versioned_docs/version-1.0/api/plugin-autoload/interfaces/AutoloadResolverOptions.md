# AutoloadResolverOptions

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

<a id="disabledefaultsuffixes"></a> `disableDefaultSuffixes?`

</td>
<td>

`boolean`

</td>
<td>

If true, disables the default resolver suffixes

</td>
</tr>
<tr>
<td>

<a id="match"></a> `match?`

</td>
<td>

(`filename`) => `boolean`

</td>
<td>

Custom function to determine if a resolver file should be included

</td>
</tr>
<tr>
<td>

<a id="suffix"></a> `suffix?`

</td>
<td>

`string` \| `string`[]

</td>
<td>

Custom suffix(es) to identify resolver files
Used together with the default suffixes, unless disabled

</td>
</tr>
</tbody>
</table>
