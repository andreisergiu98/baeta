# Options

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

<a id="modules"></a> `modules`

</td>
<td>

`Record`\<`string`, `unknown`\>[]

</td>
<td>

`undefined`

</td>
<td>

Array of module objects to include in the application.

**Example**

```typescript
const modules = [userModule, postModule, commentModule];
```

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

`undefined`

</td>
<td>

Options to pass to makeExecutableSchema. See https://the-guild.dev/graphql/tools/docs/generate-schema#makeexecutableschema

</td>
</tr>
<tr>
<td>

<a id="pruneschema"></a> `pruneSchema?`

</td>
<td>

`boolean`

</td>
<td>

```ts
false;
```

</td>
<td>

When true, removes fields that don't have corresponding resolvers.

</td>
</tr>
</tbody>
</table>
