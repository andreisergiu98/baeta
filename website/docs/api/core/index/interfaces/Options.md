# Options\<Context, Info\>

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Info`

</td>
</tr>
</tbody>
</table>

## Properties

<table>
<thead>
<tr>
<th>Property</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="modules"></a> `modules`

</td>
<td>

[`ModuleCompilerFactory`](../../sdk/type-aliases/ModuleCompilerFactory.md)\<`Context`, `Info`, [`TypesResolversMap`](../../sdk/type-aliases/TypesResolversMap.md)\<`Context`, `Info`\>\>[]

</td>
<td>

Array of module objects to include in the application.

**Example**

```typescript
const modules = [
  userModule,
  postModule,
  commentModule
];
```

</td>
</tr>
<tr>
<td>

<a id="buildschema"></a> `buildSchema?`

</td>
<td>

(`options`) => `GraphQLSchema`

</td>
<td>

Optional function to build the GraphQL schema. If not provided, the default implementation using makeExecutableSchema will be used.
This allows you to customize the schema building process, for example by using a different library or applying additional transformations.

</td>
</tr>
<tr>
<td>

<a id="executableschemaoptions"></a> `executableSchemaOptions?`

</td>
<td>

[`ExecutableSchemaOptions`](../type-aliases/ExecutableSchemaOptions.md)

</td>
<td>

Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

</td>
</tr>
<tr>
<td>

<a id="plugins"></a> `plugins?`

</td>
<td>

[`AppPlugin`](../../sdk/interfaces/AppPlugin.md)[]

</td>
<td>

Optional array of plugins to extend the functionality of the application.

</td>
</tr>
</tbody>
</table>
