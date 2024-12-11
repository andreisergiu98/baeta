# Interface: PaginationOptions

Configuration options for the pagination plugin

## Properties

### types

> **types**: `Record`\<`string`, `boolean` \| [`PaginationTypeOptions`](PaginationTypeOptions.md)\>

Map of type names to their pagination configuration.

#### Example

```typescript
{
  // Simple configuration
  User: true,

  // Advanced configuration
  UserCustom: {
    nodeType: "User",
    cursorType: "UUID!",
    connectionFields: ["totalCount: Int!"],
    edgeFields: ["hasPhotos: Boolean!"]
  }
}
```

---

### createExport?

> `optional` **createExport**: `boolean`

Whether to create an export file

---

### moduleName?

> `optional` **moduleName**: `string`

Custom name for the pagination module

#### Default

```ts
"baeta-pagination";
```

---

### nullableNode?

> `optional` **nullableNode**: `boolean`

Whether the node field should be nullable in all connections

#### Default

```ts
true;
```

---

### pageInfoFields?

> `optional` **pageInfoFields**: `string`[]

Additional fields to add to the PageInfo type

#### Example

```ts
["hasMorePages: Boolean!"];
```
