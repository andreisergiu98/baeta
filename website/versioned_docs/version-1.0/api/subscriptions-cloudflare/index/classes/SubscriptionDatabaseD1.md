# SubscriptionDatabaseD1

## Implements

- [`SubscriptionDatabase`](SubscriptionDatabase.md)

## Constructors

### Constructor

> **new SubscriptionDatabaseD1**(`db`): `SubscriptionDatabaseD1`

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

`db`

</td>
<td>

`D1Database`

</td>
</tr>
</tbody>
</table>

#### Returns

`SubscriptionDatabaseD1`

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Modifier</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="table"></a> `table`

</td>
<td>

`protected`

</td>
<td>

`string`

</td>
<td>

`'Subscriptions'`

</td>
</tr>
</tbody>
</table>

## Methods

### createSubscription()

> **createSubscription**(`info`): `Promise`\<`void`\>

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

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`createSubscription`](SubscriptionDatabase.md#createsubscription)

---

### deleteSubscription()

> **deleteSubscription**(`id`): `Promise`\<`void`\>

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

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`deleteSubscription`](SubscriptionDatabase.md#deletesubscription)

---

### deleteSubscriptions()

> **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

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

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`deleteSubscriptions`](SubscriptionDatabase.md#deletesubscriptions)

---

### getSubscriptions()

> **getSubscriptions**(`topic`): `Promise`\<[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)[]\>

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

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`getSubscriptions`](SubscriptionDatabase.md#getsubscriptions)
