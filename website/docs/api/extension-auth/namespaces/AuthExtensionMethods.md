# AuthExtensionMethods

## Interfaces

### ModuleExtensions

---

### ResolverExtensions\<Result, Root, Context, Args\>

Authorization methods on resolvers.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$auth`

</td>
<td>

(`scopes`: [`ScopeRules`](../index.md#scoperules) \| [`GetScopeRules`](../index.md#getscoperulesroot-context-args)\<`Root`, `Context`, `Args`\>, `options`?: [`AuthMethodOptions`](../index.md#authmethodoptionsresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>) => `void`

</td>
<td>

Checks authorization before resolver execution.
Use this when authorization can be determined without the resolver's result.

**Example**

```typescript
Query.users.$auth({
  isLoggedIn: true,
  hasRole: "admin",
});
```

</td>
</tr>
<tr>
<td>

`$postAuth`

</td>
<td>

(`getScopes`: [`GetPostScopeRules`](../index.md#getpostscoperulesresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>, `options`?: [`AuthMethodOptions`](../index.md#authmethodoptionsresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>) => `void`

</td>
<td>

Checks authorization after resolver execution.
Use this when authorization depends on the resolver's result,
avoiding unnecessary database queries.

**Example**

```typescript
Query.user.$postAuth((params, user) => {
  // Check if user is accessing their own data
  if (user.id === params.ctx.userId) return true;
  return { hasRole: "admin" };
});
```

</td>
</tr>
</tbody>
</table>

---

### SubscriptionExtensions\<Root, Context, Args\>

Authorization methods for subscriptions.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$auth`

</td>
<td>

(`scopes`: [`ScopeRules`](../index.md#scoperules) \| [`GetScopeRules`](../index.md#getscoperulesroot-context-args)\<`Root`, `Context`, `Args`\>, `options`?: [`AuthMethodOptions`](../index.md#authmethodoptionsresult-root-context-args)\<`unknown`, `Root`, `Context`, `Args`\>) => `void`

</td>
<td>

Applies pre-resolution authorization rules for all subscriptions.

</td>
</tr>
</tbody>
</table>

---

### SubscriptionResolveExtensions\<Result, Root, Context, Args\>

Authorization methods for subscription resolve phase.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$auth`

</td>
<td>

(`scopes`: [`ScopeRules`](../index.md#scoperules) \| [`GetScopeRules`](../index.md#getscoperulesroot-context-args)\<`Root`, `Context`, `Args`\>, `options`?: [`AuthMethodOptions`](../index.md#authmethodoptionsresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>) => `void`

</td>
<td>

Checks authorization before resolver execution.
Use this when authorization can be determined without the resolver's result.

**Example**

```typescript
Query.users.$auth({
  isLoggedIn: true,
  hasRole: "admin",
});
```

</td>
</tr>
<tr>
<td>

`$postAuth`

</td>
<td>

(`getScopes`: [`GetPostScopeRules`](../index.md#getpostscoperulesresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>, `options`?: [`AuthMethodOptions`](../index.md#authmethodoptionsresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>) => `void`

</td>
<td>

Checks authorization after resolver execution.
Use this when authorization depends on the resolver's result,
avoiding unnecessary database queries.

**Example**

```typescript
Query.user.$postAuth((params, user) => {
  // Check if user is accessing their own data
  if (user.id === params.ctx.userId) return true;
  return { hasRole: "admin" };
});
```

</td>
</tr>
</tbody>
</table>

---

### SubscriptionSubscribeExtensions\<Root, Context, Args\>

Authorization methods for subscription subscribe phase.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$auth`

</td>
<td>

(`scopes`: [`ScopeRules`](../index.md#scoperules) \| [`GetScopeRules`](../index.md#getscoperulesroot-context-args)\<`Root`, `Context`, `Args`\>, `options`?: [`AuthMethodSubscribeOptions`](../index.md#authmethodsubscribeoptionsroot-context-args)\<`Root`, `Context`, `Args`\>) => `void`

</td>
<td>

Checks authorization for both subscribe and resolve phases.

**Example**

```typescript
Subscription.userUpdated.subscribe.$auth({
  isLoggedIn: true,
  hasRole: "admin",
});
```

</td>
</tr>
</tbody>
</table>

---

### TypeExtensions\<Root, Context\>

Authorization methods that apply to all fields of a GraphQL type.

#### Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
</tbody>
</table>

#### Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$auth`

</td>
<td>

(`scopes`: [`ScopeRules`](../index.md#scoperules) \| [`GetScopeRules`](../index.md#getscoperulesroot-context-args)\<`Root`, `Context`, `unknown`\>, `options`?: [`AuthMethodOptions`](../index.md#authmethodoptionsresult-root-context-args)\<`unknown`, `Root`, `Context`, `unknown`\>) => `void`

</td>
<td>

Checks authorization before field resolution.
Applied to all fields of the type.

</td>
</tr>
<tr>
<td>

`$postAuth`

</td>
<td>

(`getScopes`: [`GetPostScopeRules`](../index.md#getpostscoperulesresult-root-context-args)\<`unknown`, `Root`, `Context`, `unknown`\>, `options`?: [`AuthMethodOptions`](../index.md#authmethodoptionsresult-root-context-args)\<`unknown`, `Root`, `Context`, `unknown`\>) => `void`

</td>
<td>

Checks authorization after field resolution.
Applied to all fields of the type.
Useful when authorization depends on resolved field values.

</td>
</tr>
</tbody>
</table>
