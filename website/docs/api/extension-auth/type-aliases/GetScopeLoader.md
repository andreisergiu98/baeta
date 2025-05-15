# GetScopeLoader()\<Scopes, Ctx\>

> **GetScopeLoader**\<`Scopes`, `Ctx`\> = (`ctx`) => [`ScopeLoaderMap`](ScopeLoaderMap.md)\<`Scopes`\> \| `Promise`\<[`ScopeLoaderMap`](ScopeLoaderMap.md)\<`Scopes`\>\>

Function that creates scope loaders for authorization checks.
Returns a map of scope loaders that can be synchronous or asynchronous.

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
<tr>
<td>

`Ctx`

</td>
</tr>
</tbody>
</table>

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`ctx`

</td>
<td>

`Ctx`

</td>
<td>

The application context

</td>
</tr>
</tbody>
</table>

## Returns

[`ScopeLoaderMap`](ScopeLoaderMap.md)\<`Scopes`\> \| `Promise`\<[`ScopeLoaderMap`](ScopeLoaderMap.md)\<`Scopes`\>\>

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
