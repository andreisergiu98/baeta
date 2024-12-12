# Interface: ResolverExtensions\<Result, Root, Context, Args\>

Authorization methods on resolvers.

## Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

## Properties

### $auth()

> **$auth**: (`scopes`, `options`?) => `void`

Checks authorization before resolver execution.
Use this when authorization can be determined without the resolver's result.

#### Parameters

##### scopes

Authorization rules to check

[`ScopeRules`](../../../type-aliases/ScopeRules.md) | [`GetScopeRules`](../../../type-aliases/GetScopeRules.md)\<`Root`, `Context`, `Args`\>

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`Result`, `Root`, `Context`, `Args`\>

Additional authorization options

#### Returns

`void`

#### Example

```typescript
Query.users.$auth({
  isLoggedIn: true,
  hasRole: "admin",
});
```

---

### $postAuth()

> **$postAuth**: (`getScopes`, `options`?) => `void`

Checks authorization after resolver execution.
Use this when authorization depends on the resolver's result,
avoiding unnecessary database queries.

#### Parameters

##### getScopes

[`GetPostScopeRules`](../../../type-aliases/GetPostScopeRules.md)\<`Result`, `Root`, `Context`, `Args`\>

Function that uses resolver result to determine authorization

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`Result`, `Root`, `Context`, `Args`\>

Additional authorization options

#### Returns

`void`

#### Example

```typescript
Query.user.$postAuth((params, user) => {
  // Check if user is accessing their own data
  if (user.id === params.ctx.userId) return true;
  return { hasRole: "admin" };
});
```
