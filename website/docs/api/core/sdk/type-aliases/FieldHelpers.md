# FieldHelpers\<Expected, Result, Source, Context, Args, Info\>

> **FieldHelpers**\<`Expected`, `Result`, `Source`, `Context`, `Args`, `Info`\> = `object`

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

<a id="key"></a> `key`

</td>
<td>

\<`K`\>(`key`) => [`Field`](Field.md)\<`Expected`, `Result`\[`K`\], `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

<a id="map"></a> `map`

</td>
<td>

\<`T`\>(`fn`) => [`Field`](Field.md)\<`Expected`, `T`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve`

</td>
<td>

(`fn`) => [`Field`](Field.md)\<`Expected`, `Expected`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

<a id="to"></a> `to`

</td>
<td>

\<`T`\>(`fn`) => [`Field`](Field.md)\<`Expected`, `T`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

<a id="undefinedasnull"></a> `undefinedAsNull`

</td>
<td>

() => [`Field`](Field.md)\<`Expected`, `Result` _extends_ `undefined` ? `NonNullable`\<`Result`\> \| `null` : `Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

<a id="withdefault"></a> `withDefault`

</td>
<td>

\<`T`\>(`value`) => [`Field`](Field.md)\<`Expected`, `T` \| `NonNullable`\<`Result`\>, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>
