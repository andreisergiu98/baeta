# Interface: GeneratorOptions

Options for the graphql generator.

## Properties

### baseTypesPath?

> `optional` **baseTypesPath**: `string`

Path for the generated base types file.

#### Default

`${modulesDir}/../__generated__/types.ts`

---

### contextType?

> `optional` **contextType**: `string`

Path where the context type is exported.

#### Examples

```ts
contextType: "src/types/context#Context"; // for named export
```

```ts
contextType: "src/types/context"; // for default export
```

#### Default

```ts
undefined;
```

---

### cwd?

> `optional` **cwd**: `string`

Current working directory.

#### Default

```ts
process.cwd();
```

---

### extensions?

> `optional` **extensions**: `string`

Path where extensions (ex. auth-extension) are exported. Only default export is supported.

#### Example

```ts
extensions: "src/extensions";
```

#### Default

```ts
undefined;
```

---

### fileOptions?

> `optional` **fileOptions**: [`FileOptions`](../../generator-sdk/interfaces/FileOptions.md)

Options for generated files.

---

### importExtension?

> `optional` **importExtension**: `".js"` \| `".ts"`

File extension for generated import statements.

---

### loaders?

> `optional` **loaders**: [`Loader`](../../generator-sdk/interfaces/Loader.md)\<`any`\>[]

Additional schema loaders to be used for "schemas" option.

---

### moduleDefinitionName?

> `optional` **moduleDefinitionName**: `string`

Name for the generated module definition file. This will contain type definitions and the graphql ast.

#### Default

```ts
"typedef.ts";
```

---

### modulesDir?

> `optional` **modulesDir**: `string`

Directory where modules are defined.

#### Default

```ts
"src/modules";
```

---

### scalars?

> `optional` **scalars**: `Record`\<`string`, `string`\>

Custom scalar mappings.

#### Example

```ts
scalars: {
  DateTime: "Date";
}
```

#### Default

```ts
undefined;
```

---

### schemas

> **schemas**: `string`[]

Glob pattern(s) to load graphql schema files.

#### Default

```ts
["src/∗∗/∗.graphql"];
```
