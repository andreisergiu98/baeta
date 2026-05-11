# ModuleMethods\<Context, Info, TypesBuilders, TypesResolvers\>

> **ModuleMethods**\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\> = `TypesBuilders` & `object`

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

`$directive()`

</td>
<td>

(`transformer`) => `ModuleMethods`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

</td>
</tr>
<tr>
<td>

`$schema()`

</td>
<td>

(`fields`) => [`ModuleCompilerFactory`](ModuleCompilerFactory.md)\<`Context`, `Info`, `TypesResolvers`\>

</td>
</tr>
<tr>
<td>

`$use()`

</td>
<td>

(`input`) => `ModuleMethods`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

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

`TypesBuilders` *extends* [`TypesBuildersMap`](TypesBuildersMap.md)\<`Context`, `Info`\>

</td>
<td>

[`TypesBuildersMap`](TypesBuildersMap.md)\<`Context`, `Info`\>

</td>
</tr>
<tr>
<td>

`TypesResolvers` *extends* [`TypesResolversMap`](TypesResolversMap.md)\<`Context`, `Info`\>

</td>
<td>

[`TypesResolversMap`](TypesResolversMap.md)\<`Context`, `Info`\>

</td>
</tr>
</tbody>
</table>
