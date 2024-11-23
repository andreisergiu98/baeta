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

[sdk/subscription.ts:4](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/core/sdk/subscription.ts#L4)
