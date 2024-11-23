# Interface: SubscriptionsOptions\<Env, Context, ContextParams\>

## Type Parameters

• **Env**

• **Context**

• **ContextParams**

## Properties

### context?

> `optional` **context**: `ContextLoader`\<`Env`, `Context`, `ContextParams`\>

#### Defined in

[lib/subscription-options.ts:13](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-options.ts#L13)

***

### getDatabase()

> **getDatabase**: (`env`) => [`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

#### Parameters

• **env**: `Env`

#### Returns

[`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

#### Defined in

[lib/subscription-options.ts:14](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-options.ts#L14)

***

### getWSConnections()

> **getWSConnections**: (`env`) => `DurableObjectNamespace`\<`undefined`\>

#### Parameters

• **env**: `Env`

#### Returns

`DurableObjectNamespace`\<`undefined`\>

#### Defined in

[lib/subscription-options.ts:15](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-options.ts#L15)

***

### poolingType?

> `optional` **poolingType**: `PoolingType`

#### Defined in

[lib/subscription-options.ts:12](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-options.ts#L12)

***

### schema

> **schema**: `GraphQLSchema`

#### Defined in

[lib/subscription-options.ts:11](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/subscriptions-cloudflare/lib/subscription-options.ts#L11)
