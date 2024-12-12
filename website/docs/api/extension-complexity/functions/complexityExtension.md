# Function: complexityExtension()

> **complexityExtension**\<`Ctx`\>(`options`?): () => `Extension`

Creates a complexity analysis extension for GraphQL queries.

## Type Parameters

• **Ctx**

## Parameters

### options?

[`ComplexityExtensionOptions`](../interfaces/ComplexityExtensionOptions.md)\<`Ctx`\>

Configuration options for complexity analysis

## Returns

`Function`

Extension factory function

### Returns

`Extension`

## Example

```typescript
const complexity = complexityExtension<Context>({
  defaultComplexity: 1,
  defaultListMultiplier: 10,
  limit: {
    depth: 5,
    breadth: 10,
    complexity: 100,
  },
});
```
