# authExtension()

> **authExtension**\<`Ctx`\>(`loadScopes`, `options`): () => [`Extension`](../../core/sdk/classes/Extension.md)

Creates an authentication extension.

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

`loadScopes`

</td>
<td>

[`GetScopeLoader`](../type-aliases/GetScopeLoader.md)\<`Scopes`, `Ctx`\>

</td>
<td>

Function to load authorization scopes

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`AuthOptions`](../interfaces/AuthOptions.md)

</td>
<td>

Configuration options for the auth extension

</td>
</tr>
</tbody>
</table>

## Returns

A factory function that creates an AuthExtension instance

> (): [`Extension`](../../core/sdk/classes/Extension.md)

### Returns

[`Extension`](../../core/sdk/classes/Extension.md)

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
