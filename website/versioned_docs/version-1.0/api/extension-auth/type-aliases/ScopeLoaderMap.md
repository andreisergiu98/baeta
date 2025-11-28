# ScopeLoaderMap\<Scopes\>

> **ScopeLoaderMap**\<`Scopes`\> = `{ [K in keyof Scopes]: ScopeLoader<Scopes[K]> }`

Maps scope names to their respective loaders.
Each loader handles authorization checks for its scope.

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Scopes` _extends_ [`ScopesShape`](ScopesShape.md)

</td>
</tr>
</tbody>
</table>

## Example

```typescript
const loaders: ScopeLoaderMap = {
  isPublic: true,
  isLoggedIn: () => Boolean(ctx.userId),
  hasAccess: (role) => ctx.user?.roles.includes(role),
};
```
