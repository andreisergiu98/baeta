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

• **info**: `SubscriptionInfo`

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/subscription-database.ts:8](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-database.ts#L8)

***

### deleteSubscription()

> **deleteSubscription**(`id`): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/subscription-database.ts:10](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-database.ts#L10)

***

### deleteSubscriptions()

> **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

#### Parameters

• **connectionId**: `string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[lib/subscription-database.ts:12](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-database.ts#L12)

***

### getSubscriptions()

> **getSubscriptions**(`topic`): `Promise`\<`SubscriptionInfo`[]\>

#### Parameters

• **topic**: `string`

#### Returns

`Promise`\<`SubscriptionInfo`[]\>

#### Defined in

[lib/subscription-database.ts:4](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-database.ts#L4)
