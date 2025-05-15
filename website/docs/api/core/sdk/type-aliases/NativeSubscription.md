# NativeSubscription\<Payload, Result, Root, Context, Args\>

> **NativeSubscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\> = `object`

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

`Payload`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Result`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Root`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`Args`

</td>
<td>

`unknown`

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

<a id="subscribe"></a> `subscribe`

</td>
<td>

[`NativeSubscriptionSubscribe`](NativeSubscriptionSubscribe.md)\<`Payload`, `Root`, `Context`, `Args`\>

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve?`

</td>
<td>

`GraphQLFieldResolver`\<`Payload`, `Context`, `Args`, `Result`\>

</td>
</tr>
</tbody>
</table>
