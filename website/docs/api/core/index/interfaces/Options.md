# Interface: Options

## Properties

### executableSchemaOptions?

> `optional` **executableSchemaOptions**: `ExecutableSchemaOptions`

Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

#### Defined in

[lib/application.ts:23](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/lib/application.ts#L23)

***

### modules

> **modules**: `Record`\<`string`, `unknown`\>[]

Modules to include in the application

#### Defined in

[lib/application.ts:12](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/lib/application.ts#L12)

***

### pruneSchema?

> `optional` **pruneSchema**: `boolean`

Whether to remove fields with no resolvers

#### Default

```ts
false
```

#### Defined in

[lib/application.ts:18](https://github.com/andreisergiu98/baeta/blob/e352a1ec749c5b23df693f5f8373ac0b75347349/packages/core/lib/application.ts#L18)
