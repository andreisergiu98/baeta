# buildSync()

> **buildSync**\<`T`\>(`options`): [`BuildResult`](../interfaces/BuildResult.md)\<`T`\>

A synchronous version of "build".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#build

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

`T` _extends_ [`BuildOptions`](../interfaces/BuildOptions.md)

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

`options`

</td>
<td>

[`SameShape`](../type-aliases/SameShape.md)\<[`BuildOptions`](../interfaces/BuildOptions.md), `T`\>

</td>
</tr>
</tbody>
</table>

## Returns

[`BuildResult`](../interfaces/BuildResult.md)\<`T`\>
