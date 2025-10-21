# autoloadPlugin()

> **autoloadPlugin**(`options?`): [`GeneratorPluginV1`](../../generator/interfaces/GeneratorPluginV1.md)\<`unknown`\>

A plugin that automatically loads GraphQL resolvers and modules based on file names.
See https://baeta.io/docs/plugins/autoloading

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

`options?`

</td>
<td>

[`AutoloadPluginOptions`](../interfaces/AutoloadPluginOptions.md)

</td>
<td>

Configuration options for the autoload plugin

</td>
</tr>
</tbody>
</table>

## Returns

[`GeneratorPluginV1`](../../generator/interfaces/GeneratorPluginV1.md)\<`unknown`\>

A Baeta generator plugin
