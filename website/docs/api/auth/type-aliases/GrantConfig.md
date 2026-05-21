# GrantConfig\<Grant, Result\>

> **GrantConfig**\<`Grant`, `Result`\> = `object`

Attaches a grant to a specific object derived from the resolver result,
instead of the result itself. For array results, `target` is invoked per
entry. `target` must return a non-primitive value.

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

`Grant` *extends* `string`

</td>
</tr>
<tr>
<td>

`Result`

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
</tr>
</thead>
<tbody>
<tr>
<td>

<a id="grant-1"></a> `grant`

</td>
<td>

`Grant` \| `Grant`[]

</td>
</tr>
<tr>
<td>

<a id="target"></a> `target`

</td>
<td>

(`result`) => `unknown`

</td>
</tr>
</tbody>
</table>
