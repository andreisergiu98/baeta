# ScopeLoader\<T\>

> **ScopeLoader**\<`T`\> = `T` *extends* `boolean` ? `boolean` \| (() => `boolean` \| `Promise`\<`boolean`\>) : (`param`) => `boolean` \| `Promise`\<`boolean`\>

Represents a scope loader that can be either a boolean value or a function.
Function loaders receive the scope value and return a boolean result.

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

`T`

</td>
</tr>
</tbody>
</table>

## Example

```typescript
// Boolean loader
const publicLoader: ScopeLoader<boolean> = true;

// Function loader
const roleLoader: ScopeLoader<string> = (role) => userRole === role;
```
