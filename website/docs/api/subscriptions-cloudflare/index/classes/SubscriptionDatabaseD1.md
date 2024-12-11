# Class: SubscriptionDatabaseD1

## Implements

- [`SubscriptionDatabase`](SubscriptionDatabase.md)

## Constructors

### new SubscriptionDatabaseD1()

> **new SubscriptionDatabaseD1**(`db`): [`SubscriptionDatabaseD1`](SubscriptionDatabaseD1.md)

#### Parameters

##### db

`D1Database`

#### Returns

[`SubscriptionDatabaseD1`](SubscriptionDatabaseD1.md)

## Properties

### table

> `protected` **table**: `string` = `'Subscriptions'`

## Methods

### createSubscription()

> **createSubscription**(`info`): `Promise`\<`void`\>

#### Parameters

##### info

[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`createSubscription`](SubscriptionDatabase.md#createsubscription)

---

### deleteSubscription()

> **deleteSubscription**(`id`): `Promise`\<`void`\>

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`deleteSubscription`](SubscriptionDatabase.md#deletesubscription)

---

### deleteSubscriptions()

> **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

#### Parameters

##### connectionId

`string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`deleteSubscriptions`](SubscriptionDatabase.md#deletesubscriptions)

---

### getSubscriptions()

> **getSubscriptions**(`topic`): `Promise`\<[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)[]\>

#### Parameters

##### topic

`string`

#### Returns

`Promise`\<[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)[]\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`getSubscriptions`](SubscriptionDatabase.md#getsubscriptions)
