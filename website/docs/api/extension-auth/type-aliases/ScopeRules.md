# Type Alias: ScopeRules

> **ScopeRules**: `{ [K in Scopes]?: ScopeRule<Scopes[K]> }` & `{ [r in LogicRule]?: ScopeRules }` & `object`

Defines the structure of authorization scope rules.
Combines individual scope rules with logical operators and granted permissions.

## Type declaration

### $granted?

> `optional` **$granted**: [`Grants`](../namespaces/AuthExtension/type-aliases/Grants.md)
