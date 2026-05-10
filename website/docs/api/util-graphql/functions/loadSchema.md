# loadSchema()

> **loadSchema**(`schemas`, `cwd`, `extraLoaders?`): `Promise`\<\{ `outputSchema`: `DocumentNode`; `outputSchemaAst`: `GraphQLSchema`; \}\>

## Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Default value</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`schemas`

</td>
<td>

`string` \| `string`[]

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`cwd`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
</tr>
<tr>
<td>

`extraLoaders`

</td>
<td>

`Loader`\<`BaseLoaderOptions`\>[]

</td>
<td>

`[]`

</td>
</tr>
</tbody>
</table>

## Returns

`Promise`\<\{ `outputSchema`: `DocumentNode`; `outputSchemaAst`: `GraphQLSchema`; \}\>
