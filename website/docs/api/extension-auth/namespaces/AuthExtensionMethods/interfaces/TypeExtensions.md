# Interface: TypeExtensions\<Root, Context\>

Authorization methods that apply to all fields of a GraphQL type.

## Type Parameters

• **Root**

• **Context**

## Properties

### $auth()

> **$auth**: (`scopes`, `options`?) => `void`

Checks authorization before field resolution.
Applied to all fields of the type.

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

Checks authorization after field resolution.
Applied to all fields of the type.
Useful when authorization depends on resolved field values.

#### Parameters

##### getScopes

[`GetPostScopeRules`](../../../type-aliases/GetPostScopeRules.md)\<`unknown`, `Root`, `Context`, `unknown`\>

##### options?

[`AuthMethodOptions`](../../../interfaces/AuthMethodOptions.md)\<`unknown`, `Root`, `Context`, `unknown`\>

#### Returns

`void`
