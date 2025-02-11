# @baeta/plugin-gitignore

## Interfaces

### GitignoreOptions

Configuration options for the gitignore plugin.

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

<a id="ignoretags"></a> `ignoreTags?`

</td>
<td>

`string`[]

</td>
<td>

Array of file tags to exclude from .gitignore.
File tags are identifiers assigned to generated files
to categorize them by their plugin or purpose.

</td>
</tr>
</tbody>
</table>

## Functions

### gitignorePlugin()

> **gitignorePlugin**(`options`?): [`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>

A plugin that adds .gitignore entries for generated files.

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

`options`?

</td>
<td>

[`GitignoreOptions`](index.md#gitignoreoptions)

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
