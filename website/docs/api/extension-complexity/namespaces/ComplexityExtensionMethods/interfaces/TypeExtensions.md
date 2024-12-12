# Interface: TypeExtensions\<Root, Context\>

## Type Parameters

• **Root**

• **Context**

## Properties

### $complexity()

> **$complexity**: (`fn`) => `void`

Configures complexity calculation for all fields of a type.

#### Parameters

##### fn

[`GetFieldSettings`](../../../type-aliases/GetFieldSettings.md)\<`Context`, `unknown`\>

Function to determine complexity settings

#### Returns

`void`

#### Example

```typescript
User.$complexity(() => ({
  complexity: 2, // Higher base complexity for all User fields
  multiplier: 5,
}));
```
