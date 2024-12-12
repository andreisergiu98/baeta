# Function: aggregateErrorResolver()

> **aggregateErrorResolver**(`err`, `path`): `any`

Default error resolver for authorization failures.
If multiple authorization errors are encountered they are combined into `AggregateGraphQLError` with proper HTTP status codes.

## Parameters

### err

`AggregateError`

### path

`string`

## Returns

`any`
