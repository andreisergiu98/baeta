# ScopeLoaderMap\<Scopes\>

> **ScopeLoaderMap**\<`Scopes`\> = \{ \[K in keyof Scopes\]: Scopes\[K\] extends boolean ? boolean \| (() =\> boolean \| Promise\<boolean\>) : (param: Scopes\[K\]) =\> boolean \| Promise\<boolean\> \}

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

`Scopes` *extends* [`ScopesShape`](ScopesShape.md)

</td>
</tr>
</tbody>
</table>

## Example

```typescript
const loaders: ScopeLoaderMap = {
  isPublic: true,
  isLoggedIn: () => Boolean(ctx.userId),
  hasAccess: (role) => ctx.user?.roles.includes(role)
};
```
