# TypeBuilderOptions\<Source, Context, Info, FieldsBuilders\>

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

`Source`

</td>
<td>

&hyphen;

</td>
</tr>
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

`FieldsBuilders` *extends* [`FieldsBuildersMap`](../type-aliases/FieldsBuildersMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

`any`

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

<a id="fieldbuilders"></a> `fieldBuilders`

</td>
<td>

`Readonly`\<`FieldsBuilders`\>

</td>
</tr>
<tr>
<td>

<a id="metadata"></a> `metadata`

</td>
<td>

`Map`\<`symbol`, `Readonly`\<`unknown`\>\>

</td>
</tr>
<tr>
<td>

<a id="middlewares"></a> `middlewares`

</td>
<td>

[`Middleware`](../../index/type-aliases/Middleware.md)\<`unknown`, `Source`, `Context`, `unknown`, `Info`\>[]

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

<a id="type"></a> `type`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>
