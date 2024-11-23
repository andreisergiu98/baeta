# Function: createContextStore()

> **createContextStore**\<`T`, `Context`\>(`key`, `options`?): readonly [(`ctx`) => `Promise`\<`T`\>, (`_ctx`, `loader`) => `void`]

## Type Parameters

• **T**

• **Context** = `unknown`

## Parameters

• **key**: `symbol`

• **options?**: [`ContextStoreOptions`](../interfaces/ContextStoreOptions.md)

## Returns

readonly [(`ctx`) => `Promise`\<`T`\>, (`_ctx`, `loader`) => `void`]

## Defined in

[lib/ctx-store.ts:11](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/lib/ctx-store.ts#L11)
