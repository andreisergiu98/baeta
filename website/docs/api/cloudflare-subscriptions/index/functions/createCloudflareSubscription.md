# Function: createCloudflareSubscription()

> **createCloudflareSubscription**\<`Env`, `Context`, `ContextParams`, `PubSubMap`\>(`options`): `object`

## Type Parameters

• **Env**

• **Context**

• **ContextParams**

• **PubSubMap** *extends* `DefaultPubSubMap` = `DefaultPubSubMap`

## Parameters

• **options**: [`SubscriptionsOptions`](../interfaces/SubscriptionsOptions.md)\<`Env`, `Context`, `ContextParams`\>

## Returns

`object`

### createPublisher()

> **createPublisher**: (`env`, `execContext`) => [`Publish`](../type-aliases/Publish.md)\<`PubSubMap`\>

#### Parameters

• **env**: `Env`

• **execContext**: `ExecutionContext`

#### Returns

[`Publish`](../type-aliases/Publish.md)\<`PubSubMap`\>

### createSubscriber()

> **createSubscriber**: () => [`Subscribe`](../type-aliases/Subscribe.md)\<`PubSubMap`\>

#### Returns

[`Subscribe`](../type-aliases/Subscribe.md)\<`PubSubMap`\>

### createWsConnectionsClass()

> **createWsConnectionsClass**: () => *typeof* `BaetaWsConnections`

#### Returns

*typeof* `BaetaWsConnections`

### handleWS()

> **handleWS**: (`request`, `env`, `execContext`) => `Promise`\<`Response`\>

#### Parameters

• **request**: `Request`\<`unknown`, `CfProperties`\<`unknown`\>\>

• **env**: `Env`

• **execContext**: `ExecutionContext`

#### Returns

`Promise`\<`Response`\>

## Defined in

[lib/subscription.ts:32](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L32)
