# Interface: SubscriptionsOptions\<Env, Context, ContextParams\>

## Type Parameters

• **Env**

• **Context**

• **ContextParams**

## Properties

### getDatabase()

> **getDatabase**: (`env`) => [`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

#### Parameters

##### env

`Env`

#### Returns

[`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

---

### getWSConnections()

> **getWSConnections**: (`env`) => `DurableObjectNamespace`\<`undefined`\>

#### Parameters

##### env

`Env`

#### Returns

`DurableObjectNamespace`\<`undefined`\>

---

### schema

> **schema**: `GraphQLSchema`

---

### context?

> `optional` **context**: [`SubscriptionsContextLoader`](SubscriptionsContextLoader.md)\<`Env`, `Context`, `ContextParams`\>

---

### poolingType?

> `optional` **poolingType**: [`PoolingType`](../type-aliases/PoolingType.md)
