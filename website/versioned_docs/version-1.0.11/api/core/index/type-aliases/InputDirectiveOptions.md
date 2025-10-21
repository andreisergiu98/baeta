# InputDirectiveOptions\<DirectiveConfig, Context\>

> **InputDirectiveOptions**\<`DirectiveConfig`, `Context`\> = `object`

Configuration options for creating an input directive.

## Type Parameters

<table>
<thead>
<tr>
<th>Type Parameter</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`DirectiveConfig`

</td>
<td>

Type of the directive arguments

</td>
</tr>
<tr>
<td>

`Context`

</td>
<td>

Type of the context

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

<a id="name"></a> `name`

</td>
<td>

`string`

</td>
<td>

Name of the directive as it appears in the GraphQL schema (without '@' prefix)

**Example**

```ts
'trim' for '@trim' directive
```

</td>
</tr>
<tr>
<td>

<a id="resolve"></a> `resolve`

</td>
<td>

[`ValidationDirectiveFn`](ValidationDirectiveFn.md)\<`DirectiveConfig`, `Context`\>

</td>
<td>

Function that implements the directive's validation/transformation logic

</td>
</tr>
<tr>
<td>

<a id="target"></a> `target`

</td>
<td>

[`ValidationTarget`](ValidationTarget.md)

</td>
<td>

Validation target indicating when the directive should be applied

</td>
</tr>
<tr>
<td>

<a id="getlistdepth"></a> `getListDepth?`

</td>
<td>

(`config`) => `number`

</td>
<td>

Returns the depth of list of lists validated by this directive.
The depth 0 indicates the topmost list of a field or argument.
The depth 1 indicates the first nested list.
The depth 2 indicates the second nested list, and so on.

The directive config is provided as an argument, so depth can be based on directive arguments.

So in the following example:

```
input Input {
  list: [[[String!]!]!]! @validList(maxItems: 2, listDepth: 0) @validList(maxItems: 5, listDepth: 1) @validList(maxItems: 3, listDepth: 2)
}
```

</td>
</tr>
</tbody>
</table>
