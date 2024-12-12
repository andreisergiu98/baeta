# Interface: ComplexityExtensionOptions\<Context\>

Configuration options for the complexity extension.

## Type Parameters

• **Context**

## Properties

### complexityError?

> `optional` **complexityError**: [`GetComplexityError`](../type-aliases/GetComplexityError.md)

Custom error message generator

---

### defaultComplexity?

> `optional` **defaultComplexity**: `number`

Base complexity score for fields

#### Default

```ts
1;
```

---

### defaultListMultiplier?

> `optional` **defaultListMultiplier**: `number`

Multiplier applied to list fields

#### Default

```ts
10;
```

---

### limit?

> `optional` **limit**: [`GetComplexityLimit`](../type-aliases/GetComplexityLimit.md)\<`Context`\>

Static limits or function to determine limits based on context
