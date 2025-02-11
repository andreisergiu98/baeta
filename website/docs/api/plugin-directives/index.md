# @baeta/plugin-directives

## Interfaces

### DirectivesOptions

Configuration options for the directives plugin.

#### Properties

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

<a id="modulename"></a> `moduleName?`

</td>
<td>

`string`

</td>
<td>

```ts
"baeta-directives";
```

</td>
<td>

Custom name for the directives module

</td>
</tr>
</tbody>
</table>

## Functions

### directivesPlugin()

> **directivesPlugin**(`options`?): [`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>

A plugin that generates the directives and resolvers for the built-in Baeta directives.
See https://baeta.io/docs/plugins/builtin-directives

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

[`DirectivesOptions`](index.md#directivesoptions)

</td>
<td>

Configuration options for the directives plugin

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)\<`unknown`\>

A Baeta generator plugin
