# ModuleCompilerOptions\<Context, Info, TypesResolvers\>

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

`Context`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Info`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`TypesResolvers` *extends* [`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

</td>
<td>

[`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="defaultresolvers"></a> `defaultResolvers`

</td>
<td>

`Readonly`\<`IResolvers`\>

</td>
</tr>
<tr>
<td>

<a id="metadata"></a> `metadata`

</td>
<td>

`Map`\<`symbol`, `unknown`\>

</td>
</tr>
<tr>
<td>

<a id="middlewares"></a> `middlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `unknown`, `Context`, `unknown`, `Info`\>[]

</td>
</tr>
<tr>
<td>

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="requiredpluginids"></a> `requiredPluginIds`

</td>
<td>

`Set`\<[`PluginId`](../type-aliases/PluginId.md)\>

</td>
</tr>
<tr>
<td>

<a id="transformers"></a> `transformers`

</td>
<td>

[`SchemaTransformer`](../type-aliases/SchemaTransformer.md)[]

</td>
</tr>
<tr>
<td>

<a id="typedef"></a> `typedef`

</td>
<td>

`Readonly`\<`DocumentNode`\>

</td>
</tr>
<tr>
<td>

<a id="typesmap"></a> `typesMap`

</td>
<td>

`TypesResolvers`

</td>
</tr>
</tbody>
</table>
