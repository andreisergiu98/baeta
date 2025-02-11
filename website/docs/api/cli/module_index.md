# index

## Interfaces

### BaetaOptions

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

<a id="graphql"></a> `graphql`

</td>
<td>

[`GeneratorOptions`](../generator/index.md#generatoroptions)

</td>
<td>

Configuration for the GraphQL code generator.

</td>
</tr>
<tr>
<td>

<a id="compiler"></a> `compiler?`

</td>
<td>

[`CompilerOptions`](../compiler/module_index.md#compileroptions)

</td>
<td>

Configuration for the TypeScript compiler.
It uses esbuild under the hood and creates an optimized bundle.

</td>
</tr>
<tr>
<td>

<a id="plugins"></a> `plugins?`

</td>
<td>

[`Plugins`](module_index.md#plugins-1)

</td>
<td>

Plugins to extend Baeta's functionality.

</td>
</tr>
</tbody>
</table>

## Type Aliases

### Plugin

> **Plugin**: [`GeneratorPluginV1`](../generator/index.md#generatorpluginv1store)

Represents a Baeta plugin.

---

### Plugins

> **Plugins**: ([`Plugin`](module_index.md#plugin) \| [`Plugin`](module_index.md#plugin)[])[]

Collection of Baeta plugins.

## Functions

### defineConfig()

> **defineConfig**(`config`): `object`

Helper function to define a type-safe Baeta configuration.

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

`config`

</td>
<td>

[`BaetaOptions`](module_index.md#baetaoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

| Name     | Type                                           |
| -------- | ---------------------------------------------- |
| `config` | [`BaetaOptions`](module_index.md#baetaoptions) |
