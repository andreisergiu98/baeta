# TypeMethods\<Source, Context, Info, FieldsBuilders, FieldsResolvers\>

> **TypeMethods**\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\> = `FieldsBuilders` & `object`

## Type Declaration

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

`$fields()`

</td>
<td>

(`fields`) => [`TypeCompilerFactory`](TypeCompilerFactory.md)\<`Source`, `Context`, `Info`, `FieldsResolvers`\>

</td>
</tr>
<tr>
<td>

`$use()`

</td>
<td>

(`input`) => `TypeMethods`\<`Source`, `Context`, `Info`, `FieldsBuilders`, `FieldsResolvers`\>

</td>
</tr>
</tbody>
</table>

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

`FieldsBuilders` *extends* [`FieldsBuildersMap`](FieldsBuildersMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

[`FieldsBuildersMap`](FieldsBuildersMap.md)\<`Source`, `Context`, `Info`\>

</td>
</tr>
<tr>
<td>

`FieldsResolvers` *extends* [`FieldsResolversMap`](FieldsResolversMap.md)\<`Source`, `Context`, `Info`\>

</td>
<td>

[`FieldsResolversMap`](FieldsResolversMap.md)\<`Source`, `Context`, `Info`\>

</td>
</tr>
</tbody>
</table>
