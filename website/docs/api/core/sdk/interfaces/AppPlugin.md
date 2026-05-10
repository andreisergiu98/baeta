# AppPlugin

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

<a id="id"></a> `id`

</td>
<td>

[`PluginId`](../type-aliases/PluginId.md)

</td>
<td>

Unique id of the plugin

</td>
</tr>
<tr>
<td>

<a id="mutate"></a> `mutate`

</td>
<td>

(`compilers`) => `void`

</td>
<td>

Mutate function that receives the list of module compilers before they are built. This allows the plugin to modify the module compilers, for example by adding middlewares or transformers.

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

Name of the plugin, used for logging and debugging purposes.

</td>
</tr>
</tbody>
</table>
