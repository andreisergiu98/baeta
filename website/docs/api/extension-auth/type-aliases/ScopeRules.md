# Type Alias: ScopeRules

> **ScopeRules**: `{ [K in Scopes]?: ScopeRule<AuthExtension.Scopes[K]> }` & `{ [r in LogicRule]?: ScopeRules }` & `object`

## Type declaration

### $granted?

> `optional` **$granted**: `AuthExtension.Grants`

## Defined in

[lib/scope-rules.ts:10](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/extension-auth/lib/scope-rules.ts#L10)
