# PaginationOptions

Configuration options for the pagination plugin

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

<a id="types"></a> `types`

</td>
<td>

`Record`\<`string`, `boolean` \| [`PaginationTypeOptions`](PaginationTypeOptions.md)\>

</td>
<td>

`undefined`

</td>
<td>

Map of type names to their pagination configuration.

**Example**

```typescript
{
  // Simple configuration
  User: true,

  // Advanced configuration
  UserCustom: {
    nodeType: "User",
    cursorType: "UUID!",
    connectionFields: ["totalCount: Int!"],
    edgeFields: ["hasPhotos: Boolean!"]
  }
}
```

</td>
</tr>
<tr>
<td>

<a id="createexport"></a> `createExport?`

</td>
<td>

`boolean`

</td>
<td>

`undefined`

</td>
<td>

Whether to create an export file

</td>
</tr>
<tr>
<td>

<a id="modulename"></a> `moduleName?`

</td>
<td>

`string`

</td>
<td>

```ts
"baeta-pagination";
```

</td>
<td>

Custom name for the pagination module

</td>
</tr>
<tr>
<td>

<a id="nullablenode"></a> `nullableNode?`

</td>
<td>

`boolean`

</td>
<td>

```ts
true;
```

</td>
<td>

Whether the node field should be nullable in all connections

</td>
</tr>
<tr>
<td>

<a id="pageinfofields"></a> `pageInfoFields?`

</td>
<td>

`string`[]

</td>
<td>

`undefined`

</td>
<td>

Additional fields to add to the PageInfo type

**Example**

```ts
["hasMorePages: Boolean!"];
```

</td>
</tr>
</tbody>
</table>
