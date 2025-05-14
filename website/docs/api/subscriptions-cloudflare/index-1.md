# index

## Classes

### `abstract` SubscriptionDatabase

#### Constructors

##### Constructor

> **new SubscriptionDatabase**(): [`SubscriptionDatabase`](#subscriptiondatabase)

###### Returns

[`SubscriptionDatabase`](#subscriptiondatabase)

#### Methods

##### createSubscription()

> **createSubscription**(`info`): `Promise`\<`void`\>

###### Parameters

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

[`SubscriptionInfo`](#subscriptioninfo)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

##### deleteSubscription()

> **deleteSubscription**(`id`): `Promise`\<`void`\>

###### Parameters

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

###### Returns

`Promise`\<`void`\>

##### deleteSubscriptions()

> **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

###### Parameters

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

###### Returns

`Promise`\<`void`\>

##### getSubscriptions()

> **getSubscriptions**(`topic`): `Promise`\<[`SubscriptionInfo`](#subscriptioninfo)[]\>

###### Parameters

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

###### Returns

`Promise`\<[`SubscriptionInfo`](#subscriptioninfo)[]\>

---

### SubscriptionDatabaseD1

#### Implements

- [`SubscriptionDatabase`](#subscriptiondatabase)

#### Constructors

##### Constructor

> **new SubscriptionDatabaseD1**(`db`): [`SubscriptionDatabaseD1`](#subscriptiondatabased1)

###### Parameters

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

###### Returns

[`SubscriptionDatabaseD1`](#subscriptiondatabased1)

#### Properties

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

#### Methods

##### createSubscription()

> **createSubscription**(`info`): `Promise`\<`void`\>

###### Parameters

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

[`SubscriptionInfo`](#subscriptioninfo)

</td>
</tr>
</tbody>
</table>

###### Returns

`Promise`\<`void`\>

###### Implementation of

[`SubscriptionDatabase`](#subscriptiondatabase).[`createSubscription`](#createsubscription)

##### deleteSubscription()

> **deleteSubscription**(`id`): `Promise`\<`void`\>

###### Parameters

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

###### Returns

`Promise`\<`void`\>

###### Implementation of

[`SubscriptionDatabase`](#subscriptiondatabase).[`deleteSubscription`](#deletesubscription)

##### deleteSubscriptions()

> **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

###### Parameters

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

###### Returns

`Promise`\<`void`\>

###### Implementation of

[`SubscriptionDatabase`](#subscriptiondatabase).[`deleteSubscriptions`](#deletesubscriptions)

##### getSubscriptions()

> **getSubscriptions**(`topic`): `Promise`\<[`SubscriptionInfo`](#subscriptioninfo)[]\>

###### Parameters

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

###### Returns

`Promise`\<[`SubscriptionInfo`](#subscriptioninfo)[]\>

###### Implementation of

[`SubscriptionDatabase`](#subscriptiondatabase).[`getSubscriptions`](#getsubscriptions)

## Interfaces

### SubscriptionInfo

#### Properties

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

<a id="connectionid"></a> `connectionId`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="connectionpoolid"></a> `connectionPoolId`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="contextparams"></a> `contextParams`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

<a id="id"></a> `id`

</td>
<td>

`string`

</td>
</tr>
<tr>
<td>

<a id="subscription"></a> `subscription`

</td>
<td>

`SubscribePayload`

</td>
</tr>
<tr>
<td>

<a id="topic"></a> `topic`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

---

### SubscriptionsContextLoader\<Env, Context, ContextParams\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Env`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`ContextParams`

</td>
</tr>
</tbody>
</table>

#### Properties

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

<a id="createcontext"></a> `createContext`

</td>
<td>

(`params`, `env`, `executionContext`) => `Context`

</td>
</tr>
<tr>
<td>

<a id="getcontextparams"></a> `getContextParams`

</td>
<td>

(`request`, `env`) => `ContextParams`

</td>
</tr>
</tbody>
</table>

---

### SubscriptionsOptions\<Env, Context, ContextParams\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Env`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`ContextParams`

</td>
</tr>
</tbody>
</table>

#### Properties

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

<a id="getdatabase"></a> `getDatabase`

</td>
<td>

(`env`) => [`SubscriptionDatabase`](#subscriptiondatabase)

</td>
</tr>
<tr>
<td>

<a id="getwsconnections"></a> `getWSConnections`

</td>
<td>

(`env`) => `DurableObjectNamespace`

</td>
</tr>
<tr>
<td>

<a id="schema"></a> `schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
<tr>
<td>

<a id="context-2"></a> `context?`

</td>
<td>

[`SubscriptionsContextLoader`](#subscriptionscontextloader)\<`Env`, `Context`, `ContextParams`\>

</td>
</tr>
<tr>
<td>

<a id="poolingtype"></a> `poolingType?`

</td>
<td>

[`PoolingType`](#poolingtype-1)

</td>
</tr>
</tbody>
</table>

## Type Aliases

### PoolingType

> **PoolingType** = `"global"` \| `"colo"` \| `"continent"` \| `"none"`

---

### Publish()\<Map\>

> **Publish**\<`Map`\> = \<`C`, `P`\>(`topic`, `payload`) => `Promise`\<`void`\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Map` _extends_ `Record`\<`string`, `any`\>

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` _extends_ keyof `Map`

</td>
</tr>
<tr>
<td>

`P` _extends_ `Map`\[`C`\]

</td>
</tr>
</tbody>
</table>

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

`C`

</td>
</tr>
<tr>
<td>

`payload`

</td>
<td>

`P`

</td>
</tr>
</tbody>
</table>

#### Returns

`Promise`\<`void`\>

---

### Subscribe()\<Map\>

> **Subscribe**\<`Map`\> = \<`C`, `P`\>(`topic`) => `AsyncIterator`\<`P`\>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Map` _extends_ `Record`\<`string`, `any`\>

</td>
</tr>
</tbody>
</table>

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`C` _extends_ keyof `Map`

</td>
</tr>
<tr>
<td>

`P` _extends_ `Map`\[`C`\]

</td>
</tr>
</tbody>
</table>

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

`C`

</td>
</tr>
</tbody>
</table>

#### Returns

`AsyncIterator`\<`P`\>

## Functions

### createCloudflareSubscription()

> **createCloudflareSubscription**\<`Env`, `Context`, `ContextParams`, `PubSubMap`\>(`options`): `object`

#### Type Parameters

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

`options`

</td>
<td>

[`SubscriptionsOptions`](#subscriptionsoptions)\<`Env`, `Context`, `ContextParams`\>

</td>
</tr>
</tbody>
</table>

#### Returns

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

(`env`, `execContext`) => [`Publish`](#publish)\<`PubSubMap`\>

</td>
</tr>
<tr>
<td>

`createSubscriber()`

</td>
<td>

() => [`Subscribe`](#subscribe)\<`PubSubMap`\>

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
