# @baeta/plugin-exec

## Interfaces

### ExecPluginOptions

Configuration options for the exec plugin.

#### Properties

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

`exec`

</td>
<td>

`string` \| (`ctx`) => `void` \| `Promise`\<`void`\>

</td>
<td>

Command to execute - can be either:

- A string command to be executed via shell
- A function that receives the generator context

</td>
</tr>
<tr>
<td>

`actionName?`

</td>
<td>

`string`

</td>
<td>

Action name displayed in the generation status.
Shows as "Generating {actionName}..."

</td>
</tr>
<tr>
<td>

`name?`

</td>
<td>

`string`

</td>
<td>

Plugin name displayed in logs

</td>
</tr>
<tr>
<td>

`skip?`

</td>
<td>

(`ctx`: `object`) => `boolean` \| `Promise`\<`boolean`\>

</td>
<td>

Optional function to determine if execution should be skipped

</td>
</tr>
<tr>
<td>

`watch?`

</td>
<td>

[`GeneratorPluginV1WatchOptions`](../generator-sdk/index.md#generatorpluginv1watchoptions)

</td>
<td>

File watching configuration

</td>
</tr>
</tbody>
</table>

## Functions

### createExecPlugin()

> **createExecPlugin**(`options`): [`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>

A plugin that executes commands or functions during generation.

#### Parameters

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

[`ExecPluginOptions`](index.md#execpluginoptions)

</td>
<td>

Plugin configuration options

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>

A Baeta generator plugin

## References

### default

Renames and re-exports [createExecPlugin](index.md#createexecplugin)
