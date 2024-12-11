# Class: `abstract` SubscriptionDatabase

## Constructors

### new SubscriptionDatabase()

> **new SubscriptionDatabase**(): [`SubscriptionDatabase`](SubscriptionDatabase.md)

#### Returns

[`SubscriptionDatabase`](SubscriptionDatabase.md)

## Methods

### createSubscription()

> **createSubscription**(`info`): `Promise`\<`void`\>

#### Parameters

##### info

[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)

#### Returns

`Promise`\<`void`\>

---

### deleteSubscription()

> **deleteSubscription**(`id`): `Promise`\<`void`\>

#### Parameters

##### id

`string`

#### Returns

`Promise`\<`void`\>

---

### deleteSubscriptions()

> **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

#### Parameters

##### connectionId

`string`

#### Returns

`Promise`\<`void`\>

---

### getSubscriptions()

> **getSubscriptions**(`topic`): `Promise`\<[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)[]\>

#### Parameters

##### topic

`string`

#### Returns

`Promise`\<[`SubscriptionInfo`](../interfaces/SubscriptionInfo.md)[]\>
