# Interface: AuthMethodOptions\<Result, Root, Context, Args\>

Options for authorization methods

## Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

## Properties

### grants?

> `optional` **grants**: [`GetGrant`](../type-aliases/GetGrant.md)\<`Result`, `Root`, `Context`, `Args`\>

Permissions to grant after successful authorization

---

### onError?

> `optional` **onError**: [`ScopeErrorResolver`](../type-aliases/ScopeErrorResolver.md)

Custom error handler for this operation

---

### skipDefaults?

> `optional` **skipDefaults**: `boolean`

Whether to skip default scopes for this operation
