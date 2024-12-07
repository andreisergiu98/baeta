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

[sdk/subscription.ts:4](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/sdk/subscription.ts#L4)
