# Type Alias: ScopeRules

> **ScopeRules**: `{ [K in Scopes]?: ScopeRule<AuthExtension.Scopes[K]> }` & `{ [r in LogicRule]?: ScopeRules }` & `object`

## Type declaration

### $granted?

> `optional` **$granted**: `AuthExtension.Grants`

## Defined in

[lib/scope-rules.ts:10](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/extension-auth/lib/scope-rules.ts#L10)
