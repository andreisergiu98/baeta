# createApplication()

> **createApplication**\<`Context`, `Info`\>(`options`): `object`

Creates a Baeta application by combining the modules.

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

## Parameters

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

[`Options`](../interfaces/Options.md)\<`Context`, `Info`\>

</td>
<td>

Configuration options for the application

</td>
</tr>
</tbody>
</table>

## Returns

`object`

An object containing the GraphQL schema

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`schema`

</td>
<td>

`GraphQLSchema`

</td>
</tr>
</tbody>
</table>

## Example

```typescript
const baeta = createApplication({
  modules: [userModule, postModule],
});

const { schema } = baeta;
```
