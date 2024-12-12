# @baeta/extension-auth

## Interfaces

### AuthMethodOptions\<Result, Root, Context, Args\>

Options for authorization methods

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

`grants?`

</td>
<td>

[`GetGrant`](index.md#getgrantresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\>

</td>
<td>

Permissions to grant after successful authorization

</td>
</tr>
<tr>
<td>

`onError?`

</td>
<td>

[`ScopeErrorResolver`](index.md#scopeerrorresolver)

</td>
<td>

Custom error handler for this operation

</td>
</tr>
<tr>
<td>

`skipDefaults?`

</td>
<td>

`boolean`

</td>
<td>

Whether to skip default scopes for this operation

</td>
</tr>
</tbody>
</table>

---

### AuthMethodSubscribeOptions\<Root, Context, Args\>

Options for subscription authorization

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

`onError?`

</td>
<td>

[`ScopeErrorResolver`](index.md#scopeerrorresolver)

</td>
<td>

Custom error handler for this subscription

</td>
</tr>
<tr>
<td>

`skipDefaults?`

</td>
<td>

`boolean`

</td>
<td>

Whether to skip default scopes for this subscription

</td>
</tr>
</tbody>
</table>

---

### AuthOptions

Configuration options for the Auth Extension

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

`defaultScopes?`

</td>
<td>

[`DefaultScopes`](index.md#defaultscopes-1)

</td>
<td>

Default authorization scopes for queries, mutations or subscriptions

</td>
</tr>
<tr>
<td>

`errorResolver?`

</td>
<td>

[`ScopeErrorResolver`](index.md#scopeerrorresolver)

</td>
<td>

Custom error resolver for authorization failures

</td>
</tr>
</tbody>
</table>

## Type Aliases

### DefaultScopes

> **DefaultScopes**: `object`

Configuration for default authorization scopes that apply to all operations of a specific type.

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Mutation`?

</td>
<td>

[`ScopeRules`](index.md#scoperules)

</td>
<td>

Default scopes applied to all Mutation operations

</td>
</tr>
<tr>
<td>

`Query`?

</td>
<td>

[`ScopeRules`](index.md#scoperules)

</td>
<td>

Default scopes applied to all Query operations

</td>
</tr>
<tr>
<td>

`Subscription`?

</td>
<td>

`object`

</td>
<td>

Default scopes for Subscription operations

</td>
</tr>
<tr>
<td>

`Subscription.resolve`?

</td>
<td>

[`ScopeRules`](index.md#scoperules)

</td>
<td>

Scopes applied during the resolve phase

</td>
</tr>
<tr>
<td>

`Subscription.subscribe`?

</td>
<td>

[`ScopeRules`](index.md#scoperules)

</td>
<td>

Scopes applied during the subscription phase

</td>
</tr>
</tbody>
</table>

---

### GetGrant\<Result, Root, Context, Args\>

> **GetGrant**\<`Result`, `Root`, `Context`, `Args`\>: [`GetGrantFn`](index.md#getgrantfnresult-root-context-args)\<`Result`, `Root`, `Context`, `Args`\> \| `any`[]

Union type for grant specifications.
Can be either a static grant result or a function that determines grants dynamically.

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

---

### GetGrantFn()\<Result, Root, Context, Args\>

> **GetGrantFn**\<`Result`, `Root`, `Context`, `Args`\>: (`params`, `result`) => `any`[] \| `PromiseLike`\<`any`[]\>

Function that determines grants based on resolver parameters and result.
Used for dynamic permission granting based on resolved data.

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

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

`MiddlewareParams`\<`Root`, `Context`, `Args`\>

</td>
</tr>
<tr>
<td>

`result`

</td>
<td>

`Result`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`[] \| `PromiseLike`\<`any`[]\>

---

### GetGrantResult

> **GetGrantResult**: [`Grants`](namespaces/AuthExtension.md#grants) \| [`Grants`](namespaces/AuthExtension.md#grants)[]

Represents the result of a grant operation.
Can be either a single grant or an array of grants defined in AuthExtension.GrantsMap.

---

### GetPostScopeRules()\<Result, Root, Context, Args\>

> **GetPostScopeRules**\<`Result`, `Root`, `Context`, `Args`\>: (`params`, `result`) => `boolean` \| [`ScopeRules`](index.md#scoperules) \| `Promise`\<`boolean` \| [`ScopeRules`](index.md#scoperules)\>

Function to get scope rules for post-resolution authorization

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

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

`MiddlewareParams`\<`Root`, `Context`, `Args`\>

</td>
</tr>
<tr>
<td>

`result`

</td>
<td>

`Result`

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| [`ScopeRules`](index.md#scoperules) \| `Promise`\<`boolean` \| [`ScopeRules`](index.md#scoperules)\>

---

### GetScopeLoader()\<Ctx\>

> **GetScopeLoader**\<`Ctx`\>: (`ctx`) => [`ScopeLoaderMap`](index.md#scopeloadermap) \| `Promise`\<[`ScopeLoaderMap`](index.md#scopeloadermap)\>

Function that creates scope loaders for authorization checks.
Returns a map of scope loaders that can be synchronous or asynchronous.

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

`Ctx`

</td>
</tr>
</tbody>
</table>

#### Parameters

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

#### Returns

[`ScopeLoaderMap`](index.md#scopeloadermap) \| `Promise`\<[`ScopeLoaderMap`](index.md#scopeloadermap)\>

A map of scope loaders or a promise resolving to scope loaders

#### Example

```typescript
const getScopeLoader: GetScopeLoader<Context> = (ctx) => ({
  isLoggedIn: async () => {
    if (!ctx.userId) throw new UnauthenticatedError();
    return true;
  },
  hasAccess: (role) => ctx.user?.role === role,
});
```

---

### GetScopeRules()\<Root, Context, Args\>

> **GetScopeRules**\<`Root`, `Context`, `Args`\>: (`params`) => `boolean` \| [`ScopeRules`](index.md#scoperules) \| `Promise`\<`boolean` \| [`ScopeRules`](index.md#scoperules)\>

Function to get scope rules for pre-resolution authorization

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

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`params`

</td>
<td>

`MiddlewareParams`\<`Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

#### Returns

`boolean` \| [`ScopeRules`](index.md#scoperules) \| `Promise`\<`boolean` \| [`ScopeRules`](index.md#scoperules)\>

---

### LogicRule

> **LogicRule**: `"$and"` \| `"$or"` \| `"$chain"` \| `"$race"`

Possible logical operators that can be used in a rule

---

### ScopeErrorResolver()

> **ScopeErrorResolver**: (`err`, `path`) => `Error` \| `unknown`

Custom error resolver function for authorization failures.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`err`

</td>
<td>

`unknown`

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`Error` \| `unknown`

---

### ScopeLoader\<T\>

> **ScopeLoader**\<`T`\>: `boolean` \| (`value`) => `boolean` \| `Promise`\<`boolean`\>

Represents a scope loader that can be either a boolean value or a function.
Function loaders receive the scope value and return a boolean result.

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

`T`

</td>
</tr>
</tbody>
</table>

#### Example

```typescript
// Boolean loader
const publicLoader: ScopeLoader<boolean> = true;

// Function loader
const roleLoader: ScopeLoader<string> = (role) => userRole === role;
```

---

### ScopeLoaderMap

> **ScopeLoaderMap**: `{ [K in Scopes]: ScopeLoader<Scopes[K]> }`

Maps scope names to their respective loaders.
Each loader handles authorization checks for its scope.

#### Example

```typescript
const loaders: ScopeLoaderMap = {
  isPublic: true,
  isLoggedIn: () => Boolean(ctx.userId),
  hasAccess: (role) => ctx.user?.roles.includes(role),
};
```

---

### ScopeRule\<T\>

> **ScopeRule**\<`T`\>: `T` _extends_ `boolean` ? `true` : `T`

Utility type that enforces boolean scopes must be true.
For non-boolean scopes, preserves the original type.

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

`T`

</td>
</tr>
</tbody>
</table>

---

### ScopeRules

> **ScopeRules**: `{ [K in Scopes]?: ScopeRule<Scopes[K]> }` & `{ [r in LogicRule]?: ScopeRules }` & `object`

Defines the structure of authorization scope rules.
Combines individual scope rules with logical operators and granted permissions.

#### Type declaration

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`$granted`?

</td>
<td>

[`Grants`](namespaces/AuthExtension.md#grants)

</td>
</tr>
</tbody>
</table>

---

### Scopes

> **Scopes**: keyof [`Scopes`](namespaces/AuthExtension.md#scopes)

Type alias representing all available scope keys defined in AuthExtension.Scopes.
Used as the base for constructing scope rules.

## Functions

### aggregateErrorResolver()

> **aggregateErrorResolver**(`err`, `path`): `any`

Default error resolver for authorization failures.
If multiple authorization errors are encountered they are combined into `AggregateGraphQLError` with proper HTTP status codes.

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`err`

</td>
<td>

`AggregateError`

</td>
</tr>
<tr>
<td>

`path`

</td>
<td>

`string`

</td>
</tr>
</tbody>
</table>

#### Returns

`any`

---

### authExtension()

> **authExtension**\<`Ctx`\>(`loadScopes`, `options`): () => `Extension`

Creates an authentication extension.

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

`Ctx`

</td>
</tr>
</tbody>
</table>

#### Parameters

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

[`GetScopeLoader`](index.md#getscopeloaderctx)\<`Ctx`\>

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

[`AuthOptions`](index.md#authoptions)

</td>
<td>

Configuration options for the auth extension

</td>
</tr>
</tbody>
</table>

#### Returns

`Function`

A factory function that creates an AuthExtension instance

##### Returns

`Extension`

#### Example

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

## Namespaces

- [AuthExtension](namespaces/AuthExtension.md)
