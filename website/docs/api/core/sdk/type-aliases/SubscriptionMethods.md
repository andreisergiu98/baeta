# SubscriptionMethods\<Result, Source, Context, Args, Info, Payload\>

> **SubscriptionMethods**\<`Result`, `Source`, `Context`, `Args`, `Info`, `Payload`\> = `object`

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

`Result`

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

`Payload`

</td>
<td>

`never`

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

\<`T`\>(`input`) => `SubscriptionMethods`\<`Result`, `Source`, `Context`, `Args`, `Info`, [`Or`](Or.md)\<`Payload`, `T`\>\>

</td>
</tr>
<tr>
<td>

<a id="subscribe"></a> `subscribe`

</td>
<td>

\<`T`\>(`fn`) => [`SubscriptionResolveMethods`](SubscriptionResolveMethods.md)\<`Result`, [`Or`](Or.md)\<`Payload`, `T`\>, `Context`, `Args`, `Info`\>

</td>
</tr>
</tbody>
</table>
