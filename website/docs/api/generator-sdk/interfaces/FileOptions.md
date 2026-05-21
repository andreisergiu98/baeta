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

<a id="enablelintheaders"></a> `enableLintHeaders?`

</td>
<td>

`boolean` \| [`FileLintOptions`](FileLintOptions.md)

</td>
<td>

```ts
false
```

</td>
<td>

Enable lint disabling headers at the beginning of the file.
Can be either a boolean to enable all supported lint headers or an object to enable specific ones.

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
