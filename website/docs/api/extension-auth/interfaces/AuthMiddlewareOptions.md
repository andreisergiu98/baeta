# AuthMiddlewareOptions\<Grants, Result, Root, Context, Args, Info\>

Options for authorization middlewares

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

`Grants` _extends_ `string`

</td>
</tr>
<tr>
<td>

`Result`

</td>
</tr>
<tr>
<td>

`Root`

</td>
</tr>
<tr>
<td>

`Context`

</td>
</tr>
<tr>
<td>

`Args`

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

<a id="grants-1"></a> `grants?`

</td>
<td>

[`GetGrant`](../type-aliases/GetGrant.md)\<`Grants`, `Result`, `Root`, `Context`, `Args`, `Info`\>

</td>
<td>

Permissions to grant after successful authorization

</td>
</tr>
<tr>
<td>

<a id="onerror"></a> `onError?`

</td>
<td>

[`ScopeErrorResolver`](../type-aliases/ScopeErrorResolver.md)

</td>
<td>

Custom error handler for this operation

</td>
</tr>
<tr>
<td>

<a id="skipdefaults"></a> `skipDefaults?`

</td>
<td>

`boolean`

</td>
<td>

Whether to skip default scopes for this operation

</td>
</tr>
</tbody>
</table>
