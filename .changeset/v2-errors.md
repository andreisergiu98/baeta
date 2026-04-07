---
"@baeta/errors": major
---

`BaetaErrorCode` is no longer a TypeScript `enum`. It is now a plain `const` object plus a derived union type that share the same name:

**v1:**

```typescript
export enum BaetaErrorCode {
  Unauthenticated = 'UNAUTHENTICATED',
  Forbidden = 'FORBIDDEN',
  BadUserInput = 'BAD_USER_INPUT',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  AggregateError = 'AGGREGATE_ERROR',
}
```

**v2:**

```typescript
export const BaetaErrorCode = {
  Unauthenticated: 'UNAUTHENTICATED',
  Forbidden: 'FORBIDDEN',
  BadUserInput: 'BAD_USER_INPUT',
  InternalServerError: 'INTERNAL_SERVER_ERROR',
  AggregateError: 'AGGREGATE_ERROR',
} as const;

export type BaetaErrorCode = (typeof BaetaErrorCode)[keyof typeof BaetaErrorCode];
```

Value access is unchanged (`BaetaErrorCode.Forbidden === 'FORBIDDEN'`), and `BaetaErrorCode` still works as a type (it now resolves to the union of code strings). Code that relied on enum-only behavior must be updated: using a single member as a type (`BaetaErrorCode.Forbidden` in type position) and enum reverse-mapping (`BaetaErrorCode['FORBIDDEN']`) are no longer available. The error classes (`UnauthenticatedError`, `ForbiddenError`, `BadUserInput`, `InternalServerError`, `AggregateGraphQLError`) and their runtime behavior are otherwise unchanged.
