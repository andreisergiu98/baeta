# SubscriptionMethods\<Result, Source, Context, Args, Info\>

> **SubscriptionMethods**\<`Result`, `Source`, `Context`, `Args`, `Info`\> = `object` & [`SubscriptionExtensions`](../namespaces/BaetaExtensions/interfaces/SubscriptionExtensions.md)\<`Result`, `Source`, `Context`, `Args`, `Info`, [`SubscriptionBuilder`](../classes/SubscriptionBuilder.md)\<`Result`, `Source`, `Context`, `Args`, `Info`\>\>

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

`subscribe()`

</td>
<td>

\<`T`\>(`fn`) => [`SubscriptionField`](SubscriptionField.md)\<`Result`, `T`, `T`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`use()`

</td>
<td>

(`middleware`) => `SubscriptionMethods`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

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
