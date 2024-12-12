# Type Alias: ScopeLoaderMap

> **ScopeLoaderMap**: `{ [K in Scopes]: ScopeLoader<Scopes[K]> }`

Maps scope names to their respective loaders.
Each loader handles authorization checks for its scope.

## Example

```typescript
const loaders: ScopeLoaderMap = {
  isPublic: true,
  isLoggedIn: () => Boolean(ctx.userId),
  hasAccess: (role) => ctx.user?.roles.includes(role),
};
```
