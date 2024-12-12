# Type Alias: GetFieldSettings()\<Context, Args\>

> **GetFieldSettings**\<`Context`, `Args`\>: (`params`) => [`FieldSettings`](FieldSettings.md) \| `false`

Function to determine complexity settings for a field.
Returns either field settings or false to disable complexity calculation.

## Type Parameters

• **Context**

• **Args**

## Parameters

### params

[`GetFieldSettingsArgs`](GetFieldSettingsArgs.md)\<`Context`, `Args`\>

Object containing field arguments and context

## Returns

[`FieldSettings`](FieldSettings.md) \| `false`

Field settings object or false

## Example

```typescript
// Custom complexity based on arguments
const getSettings: GetFieldSettings<Context, { limit: number }> = ({
  args,
}) => ({
  complexity: 1,
  multiplier: args.limit,
});

// Disable complexity calculation
const disableComplexity: GetFieldSettings<Context, any> = () => false;
```
