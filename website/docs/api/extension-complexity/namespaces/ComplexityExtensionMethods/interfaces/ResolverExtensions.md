# Interface: ResolverExtensions\<Result, Root, Context, Args\>

## Type Parameters

• **Result**

• **Root**

• **Context**

• **Args**

## Properties

### $complexity()

> **$complexity**: (`fn`) => `void`

Configures complexity calculation for a type field.

#### Parameters

##### fn

[`GetFieldSettings`](../../../type-aliases/GetFieldSettings.md)\<`Context`, `Args`\>

Function to determine complexity settings

#### Returns

`void`

#### Example

```typescript
Query.users.$complexity(({ args }) => ({
  complexity: 1,
  multiplier: args.limit || 10,
}));

// Disable complexity calculation
Query.simple.$complexity(() => false);
```
