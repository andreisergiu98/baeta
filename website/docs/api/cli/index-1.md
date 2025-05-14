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

[`GeneratorOptions`](../generator.md#generatoroptions)

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

[`CompilerOptions`](../compiler/index-1.md#compileroptions)

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

[`Plugins`](#plugins-1)

</td>
<td>

Plugins to extend Baeta's functionality.

</td>
</tr>
</tbody>
</table>

## Type Aliases

### Plugin

> **Plugin** = [`GeneratorPluginV1`](../generator.md#generatorpluginv1)

Represents a Baeta plugin.

---

### Plugins

> **Plugins** = ([`Plugin`](#plugin) \| [`Plugin`](#plugin)[])[]

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

[`BaetaOptions`](#baetaoptions)

</td>
</tr>
</tbody>
</table>

#### Returns

`object`

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`config`

</td>
<td>

[`BaetaOptions`](#baetaoptions)

</td>
</tr>
</tbody>
</table>
