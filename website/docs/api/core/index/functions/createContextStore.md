# Function: createContextStore()

> **createContextStore**\<`T`, `Context`\>(`key`, `options`?): readonly [(`ctx`) => `Promise`\<`T`\>, (`_ctx`, `loader`) => `void`]

Creates a context store for managing asynchronous values within a context object.
See https://baeta.io/docs/guides/context-store

## Type Parameters

• **T**

• **Context** = `unknown`

## Parameters

### key

`symbol`

A unique symbol to identify the stored value in the context

### options?

[`ContextStoreOptions`](../interfaces/ContextStoreOptions.md)

Configuration options for the store

## Returns

readonly [(`ctx`) => `Promise`\<`T`\>, (`_ctx`, `loader`) => `void`]

A tuple containing get and load functions for managing the stored value

## Example

```typescript
// Create a store for user data
const userStoreKey = Symbol("userStore");
const [getUser, loadUser] = createContextStore<User>(userStoreKey, {
  lazy: true,
});

// Initialize the store when you create the context
loadUser(ctx, async () => {
  return fetchUser(userId);
});

// Later, retrieve the user in a resolver
const user = await getUser(ctx);
```
