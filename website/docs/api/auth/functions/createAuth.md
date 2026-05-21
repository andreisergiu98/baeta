# createAuth()

> **createAuth**\<`Context`, `Scopes`, `Grants`\>(`loadScopes`, `globalOptions?`): `object`

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

`Scopes` *extends* [`ScopesShape`](../type-aliases/ScopesShape.md)

</td>
</tr>
<tr>
<td>

`Grants` *extends* `string`

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
</tr>
</thead>
<tbody>
<tr>
<td>

`loadScopes`

</td>
<td>

[`GetScopeLoader`](../type-aliases/GetScopeLoader.md)\<`Scopes`, `Context`\>

</td>
</tr>
<tr>
<td>

`globalOptions`

</td>
<td>

[`AuthOptions`](../interfaces/AuthOptions.md)\<`Scopes`, `Grants`\>

</td>
</tr>
</tbody>
</table>

## Returns

`object`

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

`auth()`

</td>
<td>

\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`scopes`, `options?`) => `AuthPlugin`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`authAfter()`

</td>
<td>

\<`Result`, `Source`, `Context`, `Args`, `Info`\>(`getScopes`, `options?`) => `AuthPlugin`\<`Result`, `Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`authAppPlugin`

</td>
<td>

[`AppPlugin`](../../core/sdk/interfaces/AppPlugin.md)

</td>
</tr>
<tr>
<td>

`rule`

</td>
<td>

`RuleAccessor`\<`Scopes`, `Grants`\>

</td>
</tr>
<tr>
<td>

`scope`

</td>
<td>

`ScopeAccessor`\<`Scopes`, `Grants`\>

</td>
</tr>
</tbody>
</table>
