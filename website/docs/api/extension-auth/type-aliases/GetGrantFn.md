# Type Alias: GetGrantFn()\<Result, Root, Context, Args\>

> **GetGrantFn**\<`Result`, `Root`, `Context`, `Args`\>: (`params`, `result`) => `any`[] \| `PromiseLike`\<`any`[]\>

Function that determines grants based on resolver parameters and result.
Used for dynamic permission granting based on resolved data.

## Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

## Parameters

### params

`MiddlewareParams`\<`Root`, `Context`, `Args`\>

### result

`Result`

## Returns

`any`[] \| `PromiseLike`\<`any`[]\>
