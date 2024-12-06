# Type Alias: ScopeRules

> **ScopeRules**: `{ [K in Scopes]?: ScopeRule<AuthExtension.Scopes[K]> }` & `{ [r in LogicRule]?: ScopeRules }` & `object`

## Type declaration

### $granted?

> `optional` **$granted**: `AuthExtension.Grants`

## Defined in

[lib/scope-rules.ts:10](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/extension-auth/lib/scope-rules.ts#L10)
