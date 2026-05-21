# SubscriptionField\<Expected, Result, ParentSource, Context, Args, Info, Source\>

> **SubscriptionField**\<`Expected`, `Result`, `ParentSource`, `Context`, `Args`, `Info`, `Source`\> = `object` & `object`

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

\<`K`\>(`key`) => `SubscriptionField`\<`Expected`, `Result`\[`K`\], `ParentSource`, `Context`, `Args`, `Info`, `Source`\>

</td>
</tr>
<tr>
<td>

`map()`

</td>
<td>

\<`T`\>(`fn`) => `SubscriptionField`\<`Expected`, `T`, `ParentSource`, `Context`, `Args`, `Info`, `Source`\>

</td>
</tr>
<tr>
<td>

`resolve()`

</td>
<td>

(`fn`) => `SubscriptionField`\<`Expected`, `Expected`, `ParentSource`, `Context`, `Args`, `Info`, `Source`\>

</td>
</tr>
<tr>
<td>

`to()`

</td>
<td>

\<`T`\>(`fn`) => `SubscriptionField`\<`Expected`, `T`, `ParentSource`, `Context`, `Args`, `Info`, `Source`\>

</td>
</tr>
<tr>
<td>

`undefinedAsNull()`

</td>
<td>

() => `SubscriptionField`\<`Expected`, `Result` *extends* `undefined` ? `NonNullable`\<`Result`\> \| `null` : `Result`, `ParentSource`, `Context`, `Args`, `Info`, `Source`\>

</td>
</tr>
<tr>
<td>

`withDefault()`

</td>
<td>

\<`T`\>(`value`) => `SubscriptionField`\<`Expected`, `T` \| `NonNullable`\<`Result`\>, `ParentSource`, `Context`, `Args`, `Info`, `Source`\>

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

() => `SubscriptionCompiler`\<`Expected`, `Source`, `ParentSource`, `Context`, `Args`, `Info`\>

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

`Expected`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`Result`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`ParentSource`

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

`Args`

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

`Source`

</td>
<td>

`any`

</td>
</tr>
</tbody>
</table>
