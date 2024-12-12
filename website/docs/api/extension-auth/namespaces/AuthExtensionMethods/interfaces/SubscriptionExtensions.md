# Interface: SubscriptionExtensions\<Root, Context, Args\>

Authorization methods for subscriptions.

## Type Parameters

• **Root**

• **Context**

• **Args**

## Properties

### $auth()

> **$auth**: (`scopes`, `options`?) => `void`

Applies pre-resolution authorization rules for all subscriptions.

#### Parameters

##### scopes

Authorization rules to apply

[`ScopeRules`](../../../type-aliases/ScopeRules.md) | [`GetScopeRules`](../../../type-aliases/GetScopeRules.md)\<`Root`, `Context`, `Args`\>

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`unknown`, `Root`, `Context`, `Args`\>

Additional authorization options

#### Returns

`void`
