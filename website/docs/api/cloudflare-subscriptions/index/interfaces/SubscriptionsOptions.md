# Interface: SubscriptionsOptions\<Env, Context, ContextParams\>

## Type Parameters

• **Env**

• **Context**

• **ContextParams**

## Properties

### context?

> `optional` **context**: `ContextLoader`\<`Env`, `Context`, `ContextParams`\>

---

### getDatabase()

> **getDatabase**: (`env`) => [`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

#### Parameters

• **env**: `Env`

#### Returns

[`SubscriptionDatabase`](../classes/SubscriptionDatabase.md)

---

### getWSConnections()

> **getWSConnections**: (`env`) => `DurableObjectNamespace`\<`undefined`\>

#### Parameters

• **env**: `Env`

#### Returns

`DurableObjectNamespace`\<`undefined`\>

---

### poolingType?

> `optional` **poolingType**: `PoolingType`

---

### schema

> **schema**: `GraphQLSchema`
