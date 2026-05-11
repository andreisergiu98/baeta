# FileOptions

Options for generated files.

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="addheader"></a> `addHeader?`

</td>
<td>

(`name`, `content`, `tag`) => `string`

</td>
<td>

`undefined`

</td>
<td>

Add custom header at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="disablebiomev1header"></a> `disableBiomeV1Header?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false
```

</td>
<td>

Disable biome v1 comment at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="disablebiomev2header"></a> `disableBiomeV2Header?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false
```

</td>
<td>

Disable biome v2 comment at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="disableeslintheader"></a> `disableEslintHeader?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false
```

</td>
<td>

Disable eslint-disable comment at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="disablegenerationnoticeheader"></a> `disableGenerationNoticeHeader?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false
```

</td>
<td>

Disable generation notice at the beginning of the file.

</td>
</tr>
<tr>
<td>

<a id="disableoverwrite"></a> `disableOverwrite?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false
```

</td>
<td>

Disallow overwriting the file.

</td>
</tr>
<tr>
<td>

<a id="transformcontent"></a> `transformContent?`

</td>
<td>

(`name`, `content`, `tag`) => `string` \| `Promise`\<`string`\>

</td>
<td>

`undefined`

</td>
<td>

Edit the content of the file before writing it.

</td>
</tr>
</tbody>
</table>
