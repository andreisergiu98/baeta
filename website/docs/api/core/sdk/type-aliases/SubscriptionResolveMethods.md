# SubscriptionResolveMethods\<Result, Source, Context, Args, Info\>

> **SubscriptionResolveMethods**\<`Result`, `Source`, `Context`, `Args`, `Info`\> = `object`

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

<a id="use"></a> `$use`

</td>
<td>

(`input`) => `SubscriptionResolveMethods`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

<a id="map"></a> `map`

</td>
<td>

\<`T`\>(`resolver`) => [`SubscriptionField`](SubscriptionField.md)\<`Result`, `T`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve`

</td>
<td>

(`resolver`) => [`SubscriptionField`](SubscriptionField.md)\<`Result`, `Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>
