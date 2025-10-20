# ModuleMethods\<Context, Info, TypesBuilders, TypesResolvers\>

> **ModuleMethods**\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\> = `TypesBuilders` & `object` & [`ModuleExtensions`](../namespaces/BaetaExtensions/interfaces/ModuleExtensions.md)\<`Context`, `Info`, [`ModuleBuilder`](../classes/ModuleBuilder.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>\>

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

(`middleware`) => `ModuleMethods`\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

</td>
</tr>
</tbody>
</table>

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Info`

</td>
</tr>
<tr>
<td>

`TypesBuilders` _extends_ [`TypesBuildersMap`](TypesBuildersMap.md)\<`Context`, `Info`\>

</td>
</tr>
<tr>
<td>

`TypesResolvers` _extends_ [`TypesResolversMap`](TypesResolversMap.md)\<`Context`, `Info`\>

</td>
</tr>
</tbody>
</table>
