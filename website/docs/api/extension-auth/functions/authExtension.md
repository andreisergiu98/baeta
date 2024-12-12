# Function: authExtension()

> **authExtension**\<`Ctx`\>(`loadScopes`, `options`): () => `Extension`

Creates an authentication extension.

## Type Parameters

• **Ctx**

## Parameters

### loadScopes

[`GetScopeLoader`](../type-aliases/GetScopeLoader.md)\<`Ctx`\>

Function to load authorization scopes

### options

[`AuthOptions`](../interfaces/AuthOptions.md) = `{}`

Configuration options for the auth extension

## Returns

`Function`

A factory function that creates an AuthExtension instance

### Returns

`Extension`

## Example

```typescript
const authExt = authExtension<Context>(
  async (ctx) => ({
    isLoggedIn: () => ctx.userId != null,
    hasRole: (role) => ctx.user?.role === role,
  }),
  {
    defaultScopes: {
      Query: { isLoggedIn: true },
      Mutation: { isLoggedIn: true },
      Subscription: { subscribe: { isLoggedIn: true } },
    },
  },
);
```
