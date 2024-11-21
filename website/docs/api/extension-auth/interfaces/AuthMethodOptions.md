# Interface: AuthMethodOptions\<Result, Root, Context, Args\>

## Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

## Properties

### grants?

> `optional` **grants**: [`GetGrant`](../type-aliases/GetGrant.md)\<`Result`, `Root`, `Context`, `Args`\>

#### Defined in

[lib/auth-extension.ts:32](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-auth/lib/auth-extension.ts#L32)

***

### onError?

> `optional` **onError**: [`ScopeErrorResolver`](../type-aliases/ScopeErrorResolver.md)

#### Defined in

[lib/auth-extension.ts:34](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-auth/lib/auth-extension.ts#L34)

***

### skipDefaults?

> `optional` **skipDefaults**: `boolean`

#### Defined in

[lib/auth-extension.ts:33](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-auth/lib/auth-extension.ts#L33)
