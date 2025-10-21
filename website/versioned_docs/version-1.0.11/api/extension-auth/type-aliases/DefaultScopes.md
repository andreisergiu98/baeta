# DefaultScopes\<Scopes, Grants\>

> **DefaultScopes**\<`Scopes`, `Grants`\> = `object`

Configuration for default authorization scopes that apply to all operations of a specific type.

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

<a id="mutation"></a> `Mutation?`

</td>
<td>

[`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>

</td>
<td>

Default scopes applied to all Mutation operations

</td>
</tr>
<tr>
<td>

<a id="query"></a> `Query?`

</td>
<td>

[`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>

</td>
<td>

Default scopes applied to all Query operations

</td>
</tr>
<tr>
<td>

<a id="subscription"></a> `Subscription?`

</td>
<td>

`object`

</td>
<td>

Default scopes for Subscription operations

</td>
</tr>
<tr>
<td>

`Subscription.resolve?`

</td>
<td>

[`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>

</td>
<td>

Scopes applied during the resolve phase

</td>
</tr>
<tr>
<td>

`Subscription.subscribe?`

</td>
<td>

[`ScopeRules`](ScopeRules.md)\<`Scopes`, `Grants`\>

</td>
<td>

Scopes applied during the subscription phase

</td>
</tr>
</tbody>
</table>
