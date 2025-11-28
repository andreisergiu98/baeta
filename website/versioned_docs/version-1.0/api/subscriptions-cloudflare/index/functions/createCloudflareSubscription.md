# createCloudflareSubscription()

> **createCloudflareSubscription**\<`Env`, `Context`, `ContextParams`, `PubSubMap`\>(`options`): `object`

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

`Env`

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

`ContextParams`

</td>
<td>

&hyphen;

</td>
</tr>
<tr>
<td>

`PubSubMap` _extends_ `Record`\<`string`, `any`\>

</td>
<td>

`Record`\<`string`, `any`\>

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

`options`

</td>
<td>

[`SubscriptionsOptions`](../interfaces/SubscriptionsOptions.md)\<`Env`, `Context`, `ContextParams`\>

</td>
</tr>
</tbody>
</table>

## Returns

`object`

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

`createPublisher()`

</td>
<td>

(`env`, `execContext`) => [`Publish`](../type-aliases/Publish.md)\<`PubSubMap`\>

</td>
</tr>
<tr>
<td>

`createSubscriber()`

</td>
<td>

() => [`Subscribe`](../type-aliases/Subscribe.md)\<`PubSubMap`\>

</td>
</tr>
<tr>
<td>

`createWsConnectionsClass()`

</td>
<td>

() => (`state`, `env`) => `DurableObject`

</td>
</tr>
<tr>
<td>

`handleWS()`

</td>
<td>

(`request`, `env`, `execContext`) => `Promise`\<`Response`\>

</td>
</tr>
</tbody>
</table>
