# Type Alias: GetScopeLoader()\<Ctx\>

> **GetScopeLoader**\<`Ctx`\>: (`ctx`) => [`ScopeLoaderMap`](ScopeLoaderMap.md) \| `Promise`\<[`ScopeLoaderMap`](ScopeLoaderMap.md)\>

Function that creates scope loaders for authorization checks.
Returns a map of scope loaders that can be synchronous or asynchronous.

## Type Parameters

• **Ctx**

## Parameters

### ctx

`Ctx`

The application context

## Returns

[`ScopeLoaderMap`](ScopeLoaderMap.md) \| `Promise`\<[`ScopeLoaderMap`](ScopeLoaderMap.md)\>

A map of scope loaders or a promise resolving to scope loaders

## Example

```typescript
const getScopeLoader: GetScopeLoader<Context> = (ctx) => ({
  isLoggedIn: async () => {
    if (!ctx.userId) throw new UnauthenticatedError();
    return true;
  },
  hasAccess: (role) => ctx.user?.role === role,
});
```
