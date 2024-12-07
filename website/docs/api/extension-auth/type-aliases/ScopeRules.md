# Type Alias: ScopeRules

> **ScopeRules**: `{ [K in Scopes]?: ScopeRule<AuthExtension.Scopes[K]> }` & `{ [r in LogicRule]?: ScopeRules }` & `object`

## Type declaration

### $granted?

> `optional` **$granted**: `AuthExtension.Grants`
