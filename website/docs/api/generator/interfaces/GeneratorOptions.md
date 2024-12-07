# Interface: GeneratorOptions

Options for the graphql generator.

## Properties

### baseTypesPath?

> `optional` **baseTypesPath**: `string`

Path for the generated base types file.

#### Default

`${modulesDir}/../__generated__/types.ts`

#### Defined in

[generator-sdk/lib/config.ts:44](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L44)

***

### contextType?

> `optional` **contextType**: `string`

Path where the context type is exported.

#### Examples

```ts
contextType: 'src/types/context#Context' // for named export
```

```ts
contextType: 'src/types/context' // for default export
```

#### Default

```ts
undefined
```

#### Defined in

[generator-sdk/lib/config.ts:52](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L52)

***

### cwd?

> `optional` **cwd**: `string`

Current working directory.

#### Default

```ts
process.cwd()
```

#### Defined in

[generator-sdk/lib/config.ts:20](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L20)

***

### extensions?

> `optional` **extensions**: `string`

Path where extensions (ex. auth-extension) are exported. Only default export is supported.

#### Example

```ts
extensions: 'src/extensions'
```

#### Default

```ts
undefined
```

#### Defined in

[generator-sdk/lib/config.ts:59](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L59)

***

### fileOptions?

> `optional` **fileOptions**: [`FileOptions`](../../generator-sdk/interfaces/FileOptions.md)

Options for generated files.

#### Defined in

[generator-sdk/lib/config.ts:71](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L71)

***

### importExtension?

> `optional` **importExtension**: `".js"` \| `".ts"`

File extension for generated import statements.

#### Defined in

[generator-sdk/lib/config.ts:81](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L81)

***

### loaders?

> `optional` **loaders**: [`Loader`](../../generator-sdk/interfaces/Loader.md)\<`any`\>[]

Additional schema loaders to be used for "schemas" option.

#### Defined in

[generator-sdk/lib/config.ts:76](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L76)

***

### moduleDefinitionName?

> `optional` **moduleDefinitionName**: `string`

Name for the generated module definition file. This will contain type definitions and the graphql ast.

#### Default

```ts
'typedef.ts'
```

#### Defined in

[generator-sdk/lib/config.ts:38](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L38)

***

### modulesDir?

> `optional` **modulesDir**: `string`

Directory where modules are defined.

#### Default

```ts
'src/modules'
```

#### Defined in

[generator-sdk/lib/config.ts:32](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L32)

***

### scalars?

> `optional` **scalars**: `Record`\<`string`, `string`\>

Custom scalar mappings.

#### Example

```ts
scalars: { DateTime: 'Date' }
```

#### Default

```ts
undefined
```

#### Defined in

[generator-sdk/lib/config.ts:66](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L66)

***

### schemas

> **schemas**: `string`[]

Glob pattern(s) to load graphql schema files.

#### Default

```ts
['src/∗∗/∗.graphql']
```

#### Defined in

[generator-sdk/lib/config.ts:26](https://github.com/andreisergiu98/baeta/blob/4c16a2c8fa14b6d48e42b6a2c2893542bd64b987/packages/generator-sdk/lib/config.ts#L26)
