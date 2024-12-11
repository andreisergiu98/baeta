# Interface: SubscriptionResolveExtensions\<Result, Root, Context, Args\>

## Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

## Properties

### $auth()

> **$auth**: (`scopes`, `options`?) => `void`

#### Parameters

##### scopes

[`ScopeRules`](../../../type-aliases/ScopeRules.md) | [`GetScopeRules`](../../../type-aliases/GetScopeRules.md)\<`Root`, `Context`, `Args`\>

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`

---

### $postAuth()

> **$postAuth**: (`getScopes`, `options`?) => `void`

#### Parameters

##### getScopes

[`GetPostScopeRules`](../../../type-aliases/GetPostScopeRules.md)\<`Result`, `Root`, `Context`, `Args`\>

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Returns

`void`
