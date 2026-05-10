# FederationPluginOptions\<Version\>

Options for the federation plugin. All options are optional and have sensible defaults, so you can just call `federationPlugin()` without any arguments for a good out-of-the-box experience.

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Default type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Version` *extends* `FederationVersion`

</td>
<td>

`DefaultFederationVersion`

</td>
</tr>
</tbody>
</table>

## Properties

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

<a id="include"></a> `include?`

</td>
<td>

`Exclude`\<`FederationDirectiveNamesByVersion`\<`Version`\>, `"@key"` \| `"@requires"` \| `"@provides"` \| `"@external"` \| `"@extends"`\>[] \| `"all"`

</td>
<td>

```ts
['@key', '@external', '@requires', '@provides', '@extends']
```

</td>
<td>

Directives to include in the generated federation module. Can be either a list of directive names or 'all' to include all available directives for the specified version.

</td>
</tr>
<tr>
<td>

<a id="modulename"></a> `moduleName?`

</td>
<td>

`string`

</td>
<td>

```ts
'baeta-federation'
```

</td>
<td>

Custom name for the federation module

</td>
</tr>
<tr>
<td>

<a id="version-1"></a> `version?`

</td>
<td>

`Version`

</td>
<td>

```ts
'2.9'
```

</td>
<td>

Federation version to target. Determines which directives are available for import.

</td>
</tr>
</tbody>
</table>
