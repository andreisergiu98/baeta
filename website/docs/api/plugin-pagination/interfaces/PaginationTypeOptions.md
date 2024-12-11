# Interface: PaginationTypeOptions

Configuration options for a specific pagination type

## Properties

### connectionFields?

> `optional` **connectionFields**: `string`[]

Additional fields to add to the connection type

#### Example

```ts
connectionFields: ["totalCount: Int!"];
```

---

### cursorType?

> `optional` **cursorType**: `string`

The GraphQL type for cursors

#### Default

```ts
"ID!";
```

---

### edgeFields?

> `optional` **edgeFields**: `string`[]

Additional fields to add to the edge type

#### Example

```ts
edgeFields: ["hasPhotos: Boolean!"];
```

---

### nodeType?

> `optional` **nodeType**: `string`

The GraphQL type for nodes (e.g., "User!")
