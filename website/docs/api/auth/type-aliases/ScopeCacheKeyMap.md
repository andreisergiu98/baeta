# ScopeCacheKeyMap\<Scopes\>

> **ScopeCacheKeyMap**\<`Scopes`\> = `{ [K in keyof Scopes as Scopes[K] extends boolean ? never : K]?: ScopeCacheKeyFn<Scopes[K]> }`

Provide an entry when the scope's argument can't be safely
auto-serialized in a stable manner or when a more compact key
is preferable.

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
