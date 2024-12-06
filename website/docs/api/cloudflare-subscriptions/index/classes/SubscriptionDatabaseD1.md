# Class: SubscriptionDatabaseD1

## Implements

- [`SubscriptionDatabase`](SubscriptionDatabase.md)

## Constructors

### new SubscriptionDatabaseD1()

> **new SubscriptionDatabaseD1**(`db`): [`SubscriptionDatabaseD1`](SubscriptionDatabaseD1.md)

#### Parameters

• **db**: `D1Database`

#### Returns

[`SubscriptionDatabaseD1`](SubscriptionDatabaseD1.md)

#### Defined in

[lib/subscription-database-d1.ts:18](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/subscriptions-cloudflare/lib/subscription-database-d1.ts#L18)

## Properties

### table

> `protected` **table**: `string` = `'Subscriptions'`

#### Defined in

[lib/subscription-database-d1.ts:20](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/subscriptions-cloudflare/lib/subscription-database-d1.ts#L20)

## Methods

### createSubscription()

> **createSubscription**(`info`): `Promise`\<`void`\>

#### Parameters

• **info**: `SubscriptionInfo`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`createSubscription`](SubscriptionDatabase.md#createsubscription)

#### Defined in

[lib/subscription-database-d1.ts:44](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/subscriptions-cloudflare/lib/subscription-database-d1.ts#L44)

***

### deleteSubscription()

> **deleteSubscription**(`id`): `Promise`\<`void`\>

#### Parameters

• **id**: `string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`deleteSubscription`](SubscriptionDatabase.md#deletesubscription)

#### Defined in

[lib/subscription-database-d1.ts:53](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/subscriptions-cloudflare/lib/subscription-database-d1.ts#L53)

***

### deleteSubscriptions()

> **deleteSubscriptions**(`connectionId`): `Promise`\<`void`\>

#### Parameters

• **connectionId**: `string`

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`deleteSubscriptions`](SubscriptionDatabase.md#deletesubscriptions)

#### Defined in

[lib/subscription-database-d1.ts:57](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/subscriptions-cloudflare/lib/subscription-database-d1.ts#L57)

***

### getSubscriptions()

> **getSubscriptions**(`topic`): `Promise`\<`SubscriptionInfo`[]\>

#### Parameters

• **topic**: `string`

#### Returns

`Promise`\<`SubscriptionInfo`[]\>

#### Implementation of

[`SubscriptionDatabase`](SubscriptionDatabase.md).[`getSubscriptions`](SubscriptionDatabase.md#getsubscriptions)

#### Defined in

[lib/subscription-database-d1.ts:22](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/subscriptions-cloudflare/lib/subscription-database-d1.ts#L22)
