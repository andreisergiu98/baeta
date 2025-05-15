# PaginationTypeOptions

Configuration options for a specific pagination type

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

<a id="connectionfields"></a> `connectionFields?`

</td>
<td>

`string`[]

</td>
<td>

`undefined`

</td>
<td>

Additional fields to add to the connection type

**Example**

```ts
connectionFields: ["totalCount: Int!"];
```

</td>
</tr>
<tr>
<td>

<a id="cursortype"></a> `cursorType?`

</td>
<td>

`string`

</td>
<td>

```ts
"ID!";
```

</td>
<td>

The GraphQL type for cursors

</td>
</tr>
<tr>
<td>

<a id="edgefields"></a> `edgeFields?`

</td>
<td>

`string`[]

</td>
<td>

`undefined`

</td>
<td>

Additional fields to add to the edge type

**Example**

```ts
edgeFields: ["hasPhotos: Boolean!"];
```

</td>
</tr>
<tr>
<td>

<a id="nodetype"></a> `nodeType?`

</td>
<td>

`string`

</td>
<td>

`undefined`

</td>
<td>

The GraphQL type for nodes (e.g., "User!")

</td>
</tr>
</tbody>
</table>
