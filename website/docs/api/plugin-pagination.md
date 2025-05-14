# @baeta/plugin-pagination

## Interfaces

### PaginationOptions

Configuration options for the pagination plugin

#### Properties

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

`Record`\<`string`, `boolean` \| [`PaginationTypeOptions`](#paginationtypeoptions)\>

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

---

### PaginationTypeOptions

Configuration options for a specific pagination type

#### Properties

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

## Functions

### paginationPlugin()

> **paginationPlugin**(`options`): [`GeneratorPluginV1`](generator.md#generatorpluginv1)\<`unknown`\>

A plugin that generates Relay-style pagination types for GraphQL.
See https://baeta.io/docs/plugins/pagination for more details

#### Parameters

<table>
<thead>
<tr>
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`options`

</td>
<td>

[`PaginationOptions`](#paginationoptions)

</td>
<td>

Configuration options for the pagination plugin

</td>
</tr>
</tbody>
</table>

#### Returns

[`GeneratorPluginV1`](generator.md#generatorpluginv1)\<`unknown`\>

A Baeta generator plugin
