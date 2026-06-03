---
"@baeta/env": major
---

The public API is unchanged — `createEnvParser`, the `parse` function it returns, and the `EnvOptions` / `EnvTypes` / `EnvInferType` types all keep the same shape. What changed is how raw values are coerced and validated, which can surface as new errors (or different results) for inputs that v1 accepted silently.

- **Numbers are validated.** v1 ran every value through `Number(value)`, so a non-numeric env var produced `NaN` without complaint. v2 requires the value to match a decimal-number pattern and to be finite, throwing a descriptive error otherwise.
- **Booleans accept more spellings.** v1 treated only the literal string `'true'` as `true` and everything else (including `'1'`, `'yes'`, typos, etc.) as `false`. v2 accepts `true/1/yes/on` as `true` and `false/0/no/off` as `false` (case-insensitive, trimmed), and throws on any unrecognised value instead of silently returning `false`.
- **Empty strings fall back to the default.** For `number` and `boolean` params, an empty-string value (`''`) is now treated as "not provided" and resolves to `options.default` instead of being coerced.

**v1:**

```typescript
const parse = createEnvParser((key) => process.env[key]);

// PORT="abc"
parse('PORT', { type: 'number' }); // => NaN, no error

// FLAG="1"
parse('FLAG', { type: 'boolean' }); // => false
```

**v2:**

```typescript
const parse = createEnvParser((key) => process.env[key]);

// PORT="abc"
parse('PORT', { type: 'number' }); // throws: not a valid decimal number

// FLAG="1"
parse('FLAG', { type: 'boolean' }); // => true
```
