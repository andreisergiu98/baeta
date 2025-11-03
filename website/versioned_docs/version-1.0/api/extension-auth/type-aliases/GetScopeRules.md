# GetScopeRules()\<Scopes, Grants, Root, Context, Args\>

> **GetScopeRules**\<`Scopes`, `Grants`, `Root`, `Context`, `Args`\> = (`params`) => `boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\> \| `Promise`\<`boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>\>

Function to get scope rules for pre-resolution authorization

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

`Scopes` _extends_ [`ScopesShape`](ScopesShape.md)

</td>
</tr>
<tr>
<td>

`Grants` _extends_ `string`

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

`params`

</td>
<td>

[`MiddlewareParams`](../../core/index/type-aliases/MiddlewareParams.md)\<`Root`, `Context`, `Args`\>

</td>
</tr>
</tbody>
</table>

## Returns

`boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\> \| `Promise`\<`boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>\>
