# ScopeCacheKeyMap\<Scopes\>

> **ScopeCacheKeyMap**\<`Scopes`\> = `{ [K in keyof Scopes]?: ScopeCacheKeyFn<Scopes[K]> }`

Per-scope overrides for cache key generation. Provide an entry when the
scope's argument can't be safely auto-serialized (class instances, `Map`,
etc.) or when a more compact key is preferable.

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

`Scopes` *extends* [`ScopesShape`](ScopesShape.md)

</td>
</tr>
</tbody>
</table>
