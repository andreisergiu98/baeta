# Interface: Options

## Properties

### executableSchemaOptions?

> `optional` **executableSchemaOptions**: `ExecutableSchemaOptions`

Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

#### Defined in

[lib/application.ts:23](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/lib/application.ts#L23)

***

### modules

> **modules**: `Record`\<`string`, `unknown`\>[]

Modules to include in the application

#### Defined in

[lib/application.ts:12](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/lib/application.ts#L12)

***

### pruneSchema?

> `optional` **pruneSchema**: `boolean`

Whether to remove fields with no resolvers

#### Default

```ts
false
```

#### Defined in

[lib/application.ts:18](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/core/lib/application.ts#L18)
