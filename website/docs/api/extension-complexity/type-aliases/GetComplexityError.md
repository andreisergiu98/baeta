# Type Alias: GetComplexityError()

> **GetComplexityError**: (`kind`, `limits`, `results`) => `GraphQLError`

Function type for creating custom complexity error messages.

## Parameters

### kind

[`ComplexityErrorKind`](../enumerations/ComplexityErrorKind.md)

The type of complexity limit that was exceeded

### limits

`number`

The maximum allowed value

### results

`number`

The actual value that exceeded the limit

## Returns

`GraphQLError`

A GraphQL error with a custom message
