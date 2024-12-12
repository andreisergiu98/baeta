# Interface: SubscriptionSubscribeExtensions\<Root, Context, Args\>

Authorization methods for subscription subscribe phase.

## Type Parameters

• **Root**

• **Context**

• **Args**

## Properties

### $auth()

> **$auth**: (`scopes`, `options`?) => `void`

Checks authorization for both subscribe and resolve phases.

#### Parameters

##### scopes

Authorization rules to check

[`ScopeRules`](../../../type-aliases/ScopeRules.md) | [`GetScopeRules`](../../../type-aliases/GetScopeRules.md)\<`Root`, `Context`, `Args`\>

##### options?

[`AuthMethodSubscribeOptions`](../../../interfaces/AuthMethodSubscribeOptions.md)\<`Root`, `Context`, `Args`\>

Additional authorization options

#### Returns

`void`

#### Example

```typescript
Subscription.userUpdated.subscribe.$auth({
  isLoggedIn: true,
  hasRole: "admin",
});
```
