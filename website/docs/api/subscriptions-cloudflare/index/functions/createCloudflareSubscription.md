# Function: createCloudflareSubscription()

> **createCloudflareSubscription**\<`Env`, `Context`, `ContextParams`, `PubSubMap`\>(`options`): `object`

## Type Parameters

• **Env**

• **Context**

• **ContextParams**

• **PubSubMap** _extends_ `DefaultPubSubMap` = `DefaultPubSubMap`

## Parameters

### options

[`SubscriptionsOptions`](../interfaces/SubscriptionsOptions.md)\<`Env`, `Context`, `ContextParams`\>

## Returns

`object`

### createPublisher()

> **createPublisher**: (`env`, `execContext`) => [`Publish`](../type-aliases/Publish.md)\<`PubSubMap`\>

#### Parameters

##### env

`Env`

##### execContext

`ExecutionContext`

#### Returns

[`Publish`](../type-aliases/Publish.md)\<`PubSubMap`\>

### createSubscriber()

> **createSubscriber**: () => [`Subscribe`](../type-aliases/Subscribe.md)\<`PubSubMap`\>

#### Returns

[`Subscribe`](../type-aliases/Subscribe.md)\<`PubSubMap`\>

### createWsConnectionsClass()

> **createWsConnectionsClass**: () => _typeof_ `BaetaWsConnections`

#### Returns

_typeof_ `BaetaWsConnections`

### handleWS()

> **handleWS**: (`request`, `env`, `execContext`) => `Promise`\<`Response`\>

#### Parameters

##### request

`Request`\<`unknown`, `CfProperties`\<`unknown`\>\>

##### env

`Env`

##### execContext

`ExecutionContext`

#### Returns

`Promise`\<`Response`\>
