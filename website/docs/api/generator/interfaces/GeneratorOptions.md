# GeneratorOptions

Options for the Baeta Generator.

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Default value</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="schemas"></a> `schemas`

</td>
<td>

`string`[]

</td>
<td>

```ts
["src/∗∗/∗.gql", "src/∗∗/∗.graphql"];
```

</td>
<td>

Glob pattern(s) to locate GraphQL schema files.

</td>
</tr>
<tr>
<td>

<a id="basetypespath"></a> `baseTypesPath?`

</td>
<td>

`string`

</td>
<td>

```ts
`${modulesDir}/../__generated__/types.ts`;
```

</td>
<td>

Output path for the generated base types file.

</td>
</tr>
<tr>
<td>

<a id="contexttype"></a> `contextType?`

</td>
<td>

`string`

</td>
<td>

```ts
undefined;
```

</td>
<td>

Path to the context type definition.
Supports both named and default exports.

**Examples**

```ts
contextType: "src/types/context.ts#Context"; // for named export
```

```ts
contextType: "src/types/context.ts"; // for default export
```

</td>
</tr>
<tr>
<td>

<a id="cwd"></a> `cwd?`

</td>
<td>

`string`

</td>
<td>

```ts
process.cwd();
```

</td>
<td>

Current working directory for resolving relative paths.

</td>
</tr>
<tr>
<td>

<a id="extensions"></a> `extensions?`

</td>
<td>

`string`

</td>
<td>

```ts
undefined;
```

</td>
<td>

Path to Baeta Extensions (ex. auth-extension).
Only default export is supported.

**Example**

```ts
extensions: "src/extensions.ts";
```

</td>
</tr>
<tr>
<td>

<a id="fileoptions"></a> `fileOptions?`

</td>
<td>

[`FileOptions`](../../generator-sdk/interfaces/FileOptions.md)

</td>
<td>

`undefined`

</td>
<td>

Configuration options for generated files.

</td>
</tr>
<tr>
<td>

<a id="importextension"></a> `importExtension?`

</td>
<td>

`false` \| `".js"` \| `".ts"`

</td>
<td>

```ts
".ts";
```

</td>
<td>

File extension to use in generated import statements.
Set to false to omit extensions.

</td>
</tr>
<tr>
<td>

<a id="loaders"></a> `loaders?`

</td>
<td>

[`Loader`](../../generator-sdk/interfaces/Loader.md)\<`any`\>[]

</td>
<td>

`undefined`

</td>
<td>

Custom schema loaders for processing schema files.

</td>
</tr>
<tr>
<td>

<a id="moduledefinitionname"></a> `moduleDefinitionName?`

</td>
<td>

`string`

</td>
<td>

```ts
"typedef.ts";
```

</td>
<td>

Filename for the generated module definition file.
Contains type definitions and the GraphQL AST.

</td>
</tr>
<tr>
<td>

<a id="modulesdir"></a> `modulesDir?`

</td>
<td>

`string`

</td>
<td>

```ts
"src/modules";
```

</td>
<td>

Root directory where GraphQL modules are defined.

</td>
</tr>
<tr>
<td>

<a id="scalars"></a> `scalars?`

</td>
<td>

`Record`\<`string`, `string` \| \{ `input`: `string`; `output`: `string`; \}\>

</td>
<td>

```ts
undefined;
```

</td>
<td>

Custom scalar type mappings.
Maps GraphQL scalar types to TypeScript types.
Supports global types and imports.

**Example**

```ts
{ DateTime: 'Date', JSON: 'Record<string, unknown>' }	 *
```

</td>
</tr>
</tbody>
</table>
