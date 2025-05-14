# @baeta/plugin-autoload

## Interfaces

### AutoloadModuleOptions

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

<a id="match"></a> `match?`

</td>
<td>

(`moduleName`) => `boolean`

</td>
<td>

Custom function to determine if a module should be included

</td>
</tr>
</tbody>
</table>

---

### AutoloadPluginOptions

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

<a id="modules"></a> `modules?`

</td>
<td>

`boolean` \| [`AutoloadModuleOptions`](#autoloadmoduleoptions)

</td>
<td>

`undefined`

</td>
<td>

Configuration for module autoloading. Set to false to disable

</td>
</tr>
<tr>
<td>

<a id="output"></a> `output?`

</td>
<td>

`string`

</td>
<td>

```ts
`${modulesDir}/autoload.ts`;
```

</td>
<td>

Output path for the generated autoload file

</td>
</tr>
<tr>
<td>

<a id="resolvers"></a> `resolvers?`

</td>
<td>

`boolean` \| [`AutoloadResolverOptions`](#autoloadresolveroptions)

</td>
<td>

`undefined`

</td>
<td>

Configuration for resolver autoloading. Set to false to disable

</td>
</tr>
</tbody>
</table>

---

### AutoloadResolverOptions

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

<a id="disabledefaultsuffixes"></a> `disableDefaultSuffixes?`

</td>
<td>

`boolean`

</td>
<td>

If true, disables the default resolver suffixes

</td>
</tr>
<tr>
<td>

<a id="match-1"></a> `match?`

</td>
<td>

(`filename`) => `boolean`

</td>
<td>

Custom function to determine if a resolver file should be included

</td>
</tr>
<tr>
<td>

<a id="suffix"></a> `suffix?`

</td>
<td>

`string` \| `string`[]

</td>
<td>

Custom suffix(es) to identify resolver files
Used together with the default suffixes, unless disabled

</td>
</tr>
</tbody>
</table>

## Functions

### autoloadPlugin()

> **autoloadPlugin**(`options?`): [`GeneratorPluginV1`](generator.md#generatorpluginv1)\<`unknown`\>

A plugin that automatically loads GraphQL resolvers and modules based on file names.
See https://baeta.io/docs/plugins/autoloading

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

`options?`

</td>
<td>

[`AutoloadPluginOptions`](#autoloadpluginoptions)

</td>
<td>

Configuration options for the autoload plugin

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](generator.md#generatorpluginv1)\<`unknown`\>

A Baeta generator plugin
