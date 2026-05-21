# Field\<Expected, Result, Source, Context, Args, Info\>

> **Field**\<`Expected`, `Result`, `Source`, `Context`, `Args`, `Info`\> = `object` & `object`

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

`key()`

</td>
<td>

\<`K`\>(`key`) => `Field`\<`Expected`, `Result`\[`K`\], `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`map()`

</td>
<td>

\<`T`\>(`fn`) => `Field`\<`Expected`, `T`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`resolve()`

</td>
<td>

(`fn`) => `Field`\<`Expected`, `Expected`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`to()`

</td>
<td>

\<`T`\>(`fn`) => `Field`\<`Expected`, `T`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`undefinedAsNull()`

</td>
<td>

() => `Field`\<`Expected`, `Result` *extends* `undefined` ? `NonNullable`\<`Result`\> \| `null` : `Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`withDefault()`

</td>
<td>

\<`T`\>(`value`) => `Field`\<`Expected`, `T` \| `NonNullable`\<`Result`\>, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>

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

`[makeSymbol]()`

</td>
<td>

() => [`FieldCompiler`](../classes/FieldCompiler.md)\<`Expected`, `Source`, `Context`, `Args`, `Info`\>

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

`Expected`

</td>
</tr>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Source`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
<tr>
<td>

`Info`

</td>
</tr>
</tbody>
</table>
