# ScopeRule\<Scopes, Grants\>

> **ScopeRule**\<`Scopes`, `Grants`\> = `{ [K in keyof Scopes]: { key: K; type: "scope"; value: Scopes[K] extends boolean ? true : Scopes[K] } }`\[keyof `Scopes`\] \| \{ `grant`: `Grants`; `type`: `"grant"`; \}

Utility type that enforces boolean scopes must be true.
For non-boolean scopes, preserves the original type.

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
<tr>
<td>

`Grants` *extends* `string`

</td>
</tr>
</tbody>
</table>
