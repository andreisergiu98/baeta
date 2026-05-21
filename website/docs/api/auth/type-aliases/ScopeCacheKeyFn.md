# ScopeCacheKeyFn\<Param\>

> **ScopeCacheKeyFn**\<`Param`\> = (`param`) => `unknown`

Builds a cache key for a single scope. The returned value must be stable —
equal inputs must produce a value that compares equal as a `Map` key (a
string, or a stable object reference).

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

`Param`

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

`param`

</td>
<td>

`Param`

</td>
</tr>
</tbody>
</table>

## Returns

`unknown`
