# FieldMethods\<Result, Source, Context, Args, Info\>

> **FieldMethods**\<`Result`, `Source`, `Context`, `Args`, `Info`\> = `object` & [`FieldExtensions`](../namespaces/BaetaExtensions/interfaces/FieldExtensions.md)\<`Result`, `Source`, `Context`, `Args`, `Info`, [`FieldBuilder`](../classes/FieldBuilder.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>\>

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

\<`K`\>(`key`) => [`Field`](Field.md)\<`Result`, `Source`\[`K`\], `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`map()`

</td>
<td>

\<`T`\>(`resolver`) => [`Field`](Field.md)\<`Result`, `T`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`resolve()`

</td>
<td>

(`resolver`) => [`Field`](Field.md)\<`Result`, `Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`use()`

</td>
<td>

(`middleware`) => `FieldMethods`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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
