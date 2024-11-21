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

[lib/ctx-store.ts:11](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/lib/ctx-store.ts#L11)
