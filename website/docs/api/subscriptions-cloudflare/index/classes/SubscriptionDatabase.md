# SubscriptionDatabase

## Constructors

### Constructor

> **new SubscriptionDatabase**(): `SubscriptionDatabase`

#### Returns

`SubscriptionDatabase`

## Methods

### createSubscription()

> `abstract` **createSubscription**(`info`): `Promise`\<`void`\>

#### Parameters

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

`info`

</td>
<td>

[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### deleteSubscription()

> `abstract` **deleteSubscription**(`id`): `Promise`\<`void`\>

#### Parameters

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

`id`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### deleteSubscriptions()

> `abstract` **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

#### Parameters

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

`connectionId`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

***

### getSubscriptions()

> `abstract` **getSubscriptions**(`topic`): `Promise`\<[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)[]\>

#### Parameters

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

`topic`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)[]\>
