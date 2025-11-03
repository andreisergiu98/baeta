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

<a id="disablebiomeheader"></a> `disableBiomeHeader?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false;
```

</td>
<td>

Disable biome comment at the beginning of the file.

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
false;
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
false;
```

</td>
<td>

Disable generation notice at the beginning of the file.

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
