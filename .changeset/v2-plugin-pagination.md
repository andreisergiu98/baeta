---
"@baeta/plugin-pagination": major
---

The pagination plugin still emits the same Relay-style SDL (`Connection`, `Edge`, `PageInfo`), but its generated `index.ts` now wires up the new v2 builder-pattern resolvers instead of v1's side-effect module getter.

The `createExport` option was removed (the resolver file is always generated), and the `types` map is now type-checked against your schema via `paginationPlugin<T>({ types })`.

**Options change:**

```typescript
// v1
paginationPlugin({
  types: { User: true },
  createExport: false, // could opt out of the generated export file
});

// v2
paginationPlugin<Types>({
  types: { User: true }, // keys are now type-checked; createExport removed
});
```
