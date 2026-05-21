# AuthOptions\<Scopes, Grants\>

Configuration options for Auth

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

<a id="cachekeymap"></a> `cacheKeyMap?`

</td>
<td>

[`ScopeCacheKeyMap`](../type-aliases/ScopeCacheKeyMap.md)\<`Scopes`\>

</td>
<td>

Per-scope cache key overrides. Recommended for scopes whose argument
isn't safely auto-serializable: serializable args (primitives, plain
objects, arrays of those) are stringified automatically, and anything
else falls back to reference identity — which may miss cache hits when
callers construct equivalent-but-distinct values.

</td>
</tr>
<tr>
<td>

<a id="defaultscopes"></a> `defaultScopes?`

</td>
<td>

(`opt`) => [`DefaultScopes`](../type-aliases/DefaultScopes.md)\<`Scopes`, `Grants`\>

</td>
<td>

Default authorization scopes for queries, mutations or subscriptions

</td>
</tr>
<tr>
<td>

<a id="errorresolver"></a> `errorResolver?`

</td>
<td>

[`ScopeErrorResolver`](../type-aliases/ScopeErrorResolver.md)

</td>
<td>

Custom error resolver for authorization failures

</td>
</tr>
</tbody>
</table>
