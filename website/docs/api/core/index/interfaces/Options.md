# Interface: Options

## Properties

### modules

> **modules**: `Record`\<`string`, `unknown`\>[]

Array of module objects to include in the application.

#### Example

```typescript
const modules = [userModule, postModule, commentModule];
```

---

### executableSchemaOptions?

> `optional` **executableSchemaOptions**: [`ExecutableSchemaOptions`](../type-aliases/ExecutableSchemaOptions.md)

Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

---

### pruneSchema?

> `optional` **pruneSchema**: `boolean`

When true, removes fields that don't have corresponding resolvers.

#### Default

```ts
false;
```
