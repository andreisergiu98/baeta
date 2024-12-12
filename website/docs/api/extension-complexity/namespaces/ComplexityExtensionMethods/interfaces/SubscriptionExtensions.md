# Interface: SubscriptionExtensions\<Root, Context, Args\>

## Type Parameters

• **Root**

• **Context**

• **Args**

## Properties

### $complexity()

> **$complexity**: (`fn`) => `void`

Configures complexity calculation for subscription fields.

#### Parameters

##### fn

[`GetFieldSettings`](../../../type-aliases/GetFieldSettings.md)\<`Context`, `Args`\>

Function to determine complexity settings

#### Returns

`void`

#### Example

```typescript
Subscription.userUpdates.$complexity(({ args }) => ({
  complexity: 5,
  multiplier: args.batchSize || 1,
}));
```
