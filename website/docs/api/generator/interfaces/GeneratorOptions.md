# Interface: GeneratorOptions

Options for the Baeta Generator.

## Properties

### schemas

> **schemas**: `string`[]

Glob pattern(s) to locate GraphQL schema files.

#### Default

```ts
["src/∗∗/∗.gql", "src/∗∗/∗.graphql"];
```

---

### baseTypesPath?

> `optional` **baseTypesPath**: `string`

Output path for the generated base types file.

#### Default

```ts
`${modulesDir}/../__generated__/types.ts`;
```

---

### contextType?

> `optional` **contextType**: `string`

Path to the context type definition.
Supports both named and default exports.

#### Examples

```ts
contextType: "src/types/context.ts#Context"; // for named export
```

```ts
contextType: "src/types/context.ts"; // for default export
```

#### Default

```ts
undefined;
```

---

### cwd?

> `optional` **cwd**: `string`

Current working directory for resolving relative paths.

#### Default

```ts
process.cwd();
```

---

### extensions?

> `optional` **extensions**: `string`

Path to Baeta Extensions (ex. auth-extension).
Only default export is supported.

#### Example

```ts
extensions: "src/extensions.ts";
```

#### Default

```ts
undefined;
```

---

### fileOptions?

> `optional` **fileOptions**: [`FileOptions`](../../generator-sdk/interfaces/FileOptions.md)

Configuration options for generated files.

---

### importExtension?

> `optional` **importExtension**: `false` \| `".js"` \| `".ts"`

File extension to use in generated import statements.
Set to false to omit extensions.

#### Default

```ts
".ts";
```

---

### loaders?

> `optional` **loaders**: [`Loader`](../../generator-sdk/interfaces/Loader.md)\<`any`\>[]

Custom schema loaders for processing schema files.

---

### moduleDefinitionName?

> `optional` **moduleDefinitionName**: `string`

Filename for the generated module definition file.
Contains type definitions and the GraphQL AST.

#### Default

```ts
"typedef.ts";
```

---

### modulesDir?

> `optional` **modulesDir**: `string`

Root directory where GraphQL modules are defined.

#### Default

```ts
"src/modules";
```

---

### scalars?

> `optional` **scalars**: `Record`\<`string`, `string`\>

Custom scalar type mappings.
Maps GraphQL scalar types to TypeScript types.
Supports global types and imports.

#### Example

```ts
{ DateTime: 'Date', JSON: 'Record<string, unknown>' }	 *
```

#### Default

```ts
undefined;
```
