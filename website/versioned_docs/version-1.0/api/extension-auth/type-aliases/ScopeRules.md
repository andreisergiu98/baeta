# ScopeRules\<Scopes, Grants\>

> **ScopeRules**\<`Scopes`, `Grants`\> = `{ [K in keyof Scopes]?: ScopeRule<Scopes[K]> }` & `{ [r in LogicRule]?: ScopeRules<Scopes, Grants> }` & `object`

Defines the structure of authorization scope rules.
Combines individual scope rules with logical operators and granted permissions.

## Type declaration

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

`$granted?`

</td>
<td>

`Grants`

</td>
</tr>
</tbody>
</table>

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

`Scopes`

</td>
</tr>
<tr>
<td>

`Grants` _extends_ `string`

</td>
</tr>
</tbody>
</table>
