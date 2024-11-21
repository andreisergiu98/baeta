# Interface: SubscriptionsOptions\<Env, Context, ContextParams\>

## Type Parameters

• **Env**

• **Context**

• **ContextParams**

## Properties

### context?

> `optional` **context**: `ContextLoader`\<`Env`, `Context`, `ContextParams`\>

#### Defined in

[lib/subscription.ts:13](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L13)

***

### getDatabase()

> **getDatabase**: (`env`) => [`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

#### Parameters

• **env**: `Env`

#### Returns

[`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

#### Defined in

[lib/subscription.ts:14](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L14)

***

### getWSConnections()

> **getWSConnections**: (`env`) => `DurableObjectNamespace`\<`undefined`\>

#### Parameters

• **env**: `Env`

#### Returns

`DurableObjectNamespace`\<`undefined`\>

#### Defined in

[lib/subscription.ts:15](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L15)

***

### poolingType?

> `optional` **poolingType**: `PoolingType`

#### Defined in

[lib/subscription.ts:12](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L12)

***

### schema

> **schema**: `GraphQLSchema`

#### Defined in

[lib/subscription.ts:11](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/subscriptions-cloudflare/lib/subscription.ts#L11)
