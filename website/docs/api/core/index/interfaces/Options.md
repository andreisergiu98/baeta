# Interface: Options

## Properties

### executableSchemaOptions?

> `optional` **executableSchemaOptions**: `ExecutableSchemaOptions`

Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

---

### modules

> **modules**: `Record`\<`string`, `unknown`\>[]

Modules to include in the application

---

### pruneSchema?

> `optional` **pruneSchema**: `boolean`

Whether to remove fields with no resolvers

#### Default

```ts
false;
```
