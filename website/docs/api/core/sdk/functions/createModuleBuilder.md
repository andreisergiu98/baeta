# createModuleBuilder()

> **createModuleBuilder**\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>(`name`, `typedef`, `builders`, `defaultResolvers`, `extensions`): [`ModuleMethods`](../type-aliases/ModuleMethods.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>

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

`TypesBuilders` _extends_ [`TypesBuildersMap`](../type-aliases/TypesBuildersMap.md)\<`Context`, `Info`\>

</td>
<td>

[`TypesBuildersMap`](../type-aliases/TypesBuildersMap.md)\<`Context`, `Info`\>

</td>
</tr>
<tr>
<td>

`TypesResolvers` _extends_ [`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

</td>
<td>

[`TypesResolversMap`](../type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>

</td>
</tr>
</tbody>
</table>

## Parameters

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

`name`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

`typedef`

</td>
<td>

`DocumentNode`

</td>
</tr>
<tr>
<td>

`builders`

</td>
<td>

`TypesBuilders`

</td>
</tr>
<tr>
<td>

`defaultResolvers`

</td>
<td>

`IResolvers`

</td>
</tr>
<tr>
<td>

`extensions`

</td>
<td>

[`Extension`](../classes/Extension.md)\<`unknown`\>[]

</td>
</tr>
</tbody>
</table>

## Returns

[`ModuleMethods`](../type-aliases/ModuleMethods.md)\<`Context`, `Info`, `TypesBuilders`, `TypesResolvers`\>
