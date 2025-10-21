# GetPostScopeRules()\<Scopes, Grants, Result, Source, Context, Args, Info\>

> **GetPostScopeRules**\<`Scopes`, `Grants`, `Result`, `Source`, `Context`, `Args`, `Info`\> = (`params`, `result`) => `boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\> \| `PromiseLike`\<`boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>\>

Function to get scope rules for post-resolution authorization

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

`Result`

</td>
</tr>
<tr>
<td>

`Source`

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

[`ResolverParams`](../../core/index/type-aliases/ResolverParams.md)\<`Source`, `Context`, `Args`, `Info`\>

</td>
</tr>
<tr>
<td>

`result`

</td>
<td>

`Result`

</td>
</tr>
</tbody>
</table>

## Returns

`boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\> \| `PromiseLike`\<`boolean` \| [`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>\>
