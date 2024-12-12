# Type Alias: DefaultScopes

> **DefaultScopes**: `object`

Configuration for default authorization scopes that apply to all operations of a specific type.

## Type declaration

### Mutation?

> `optional` **Mutation**: [`ScopeRules`](ScopeRules.md)

Default scopes applied to all Mutation operations

### Query?

> `optional` **Query**: [`ScopeRules`](ScopeRules.md)

Default scopes applied to all Query operations

### Subscription?

> `optional` **Subscription**: `object`

Default scopes for Subscription operations

#### Subscription.resolve?

> `optional` **Subscription.resolve**: [`ScopeRules`](ScopeRules.md)

Scopes applied during the resolve phase

#### Subscription.subscribe?

> `optional` **Subscription.subscribe**: [`ScopeRules`](ScopeRules.md)

Scopes applied during the subscription phase
