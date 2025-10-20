# paginationPlugin()

> **paginationPlugin**\<`T`\>(`options`): [`GeneratorPluginV1`](../../generator/interfaces/GeneratorPluginV1.md)\<`unknown`\>

A plugin that generates Relay-style pagination types for GraphQL.
See https://baeta.io/docs/plugins/pagination for more details

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
</tr>
</tbody>
</table>

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

`options`

</td>
<td>

[`PaginationOptions`](../interfaces/PaginationOptions.md)\<keyof `T`\>

</td>
<td>

Configuration options for the pagination plugin

</td>
</tr>
</tbody>
</table>

## Returns

[`GeneratorPluginV1`](../../generator/interfaces/GeneratorPluginV1.md)\<`unknown`\>

A Baeta generator plugin
