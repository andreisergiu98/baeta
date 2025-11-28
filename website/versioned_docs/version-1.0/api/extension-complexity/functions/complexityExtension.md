# complexityExtension()

> **complexityExtension**\<`Ctx`\>(`options?`): () => [`Extension`](../../core/sdk/classes/Extension.md)

Creates a complexity analysis extension for GraphQL queries.

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Ctx`

</td>
</tr>
</tbody>
</table>

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options?`

</td>
<td>

[`ComplexityExtensionOptions`](../interfaces/ComplexityExtensionOptions.md)\<`Ctx`\>

</td>
<td>

Configuration options for complexity analysis

</td>
</tr>
</tbody>
</table>

## Returns

Extension factory function

> (): [`Extension`](../../core/sdk/classes/Extension.md)

### Returns

[`Extension`](../../core/sdk/classes/Extension.md)

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
