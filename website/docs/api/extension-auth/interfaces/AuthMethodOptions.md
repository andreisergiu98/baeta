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

[lib/auth-extension.ts:28](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-auth/lib/auth-extension.ts#L28)

***

### onError?

> `optional` **onError**: [`ScopeErrorResolver`](../type-aliases/ScopeErrorResolver.md)

#### Defined in

[lib/auth-extension.ts:30](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-auth/lib/auth-extension.ts#L30)

***

### skipDefaults?

> `optional` **skipDefaults**: `boolean`

#### Defined in

[lib/auth-extension.ts:29](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-auth/lib/auth-extension.ts#L29)
