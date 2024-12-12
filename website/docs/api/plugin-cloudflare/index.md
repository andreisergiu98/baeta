# @baeta/plugin-cloudflare

## Interfaces

### CloudflarePluginOptions

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`cache?`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`cache.baetaCacheBinding?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`cache.enable?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`ws?`

</td>
<td>

`object`

</td>
</tr>
<tr>
<td>

`ws.databaseBinding?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`ws.databaseId?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`ws.databaseMigrationsPath?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`ws.databaseName?`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`ws.enable?`

</td>
<td>

`boolean`

</td>
</tr>
<tr>
<td>

`ws.wsConnectionsBinding?`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

## Functions

### cloudflarePlugin()

> **cloudflarePlugin**(`options`?): [`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>

#### Parameters

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

`options`?

</td>
<td>

[`CloudflarePluginOptions`](index.md#cloudflarepluginoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>
