# Type Alias: NativeSubscription\<Payload, Result, Root, Context, Args\>

> **NativeSubscription**\<`Payload`, `Result`, `Root`, `Context`, `Args`\>: `object`

## Type Parameters

• **Payload** = `unknown`

• **Result** = `unknown`

• **Root** = `unknown`

• **Context** = `unknown`

• **Args** = `unknown`

## Type declaration

### resolve?

> `optional` **resolve**: `GraphQLFieldResolver`\<`Payload`, `Context`, `Args`, `Result`\>

### subscribe

> **subscribe**: `NativeSubscriptionSubscribe`\<`Payload`, `Root`, `Context`, `Args`\>

## Defined in

[sdk/subscription.ts:4](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/sdk/subscription.ts#L4)
