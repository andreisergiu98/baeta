# Interface: TypeExtensions\<Root, Context\>

## Type Parameters

• **Root**

• **Context**

## Properties

### $auth()

> **$auth**: (`scopes`, `options`?) => `void`

#### Parameters

##### scopes

[`ScopeRules`](../../../type-aliases/ScopeRules.md) | [`GetScopeRules`](../../../type-aliases/GetScopeRules.md)\<`Root`, `Context`, `unknown`\>

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`unknown`, `Root`, `Context`, `unknown`\>

#### Returns

`void`

---

### $postAuth()

> **$postAuth**: (`getScopes`, `options`?) => `void`

#### Parameters

##### getScopes

[`GetPostScopeRules`](../../../type-aliases/GetPostScopeRules.md)\<`unknown`, `Root`, `Context`, `unknown`\>

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`unknown`, `Root`, `Context`, `unknown`\>

#### Returns

`void`
