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

[lib/ctx-store.ts:11](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/lib/ctx-store.ts#L11)
