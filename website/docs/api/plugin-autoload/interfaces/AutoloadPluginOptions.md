# AutoloadPluginOptions

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

<a id="modules"></a> `modules?`

</td>
<td>

`boolean` \| [`AutoloadModuleOptions`](AutoloadModuleOptions.md)

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

`boolean` \| [`AutoloadResolverOptions`](AutoloadResolverOptions.md)

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
