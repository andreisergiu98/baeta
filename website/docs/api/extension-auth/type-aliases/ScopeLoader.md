# Type Alias: ScopeLoader\<T\>

> **ScopeLoader**\<`T`\>: `boolean` \| (`value`) => `boolean` \| `Promise`\<`boolean`\>

Represents a scope loader that can be either a boolean value or a function.
Function loaders receive the scope value and return a boolean result.

## Type Parameters

• **T**

## Example

```typescript
// Boolean loader
const publicLoader: ScopeLoader<boolean> = true;

// Function loader
const roleLoader: ScopeLoader<string> = (role) => userRole === role;
```
