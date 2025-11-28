# transformSync()

> **transformSync**\<`T`\>(`input`, `options?`): [`TransformResult`](../interfaces/TransformResult.md)\<`T`\>

A synchronous version of "transform".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#transform

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

`T` _extends_ [`TransformOptions`](../interfaces/TransformOptions.md)

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

`input`

</td>
<td>

`string` \| `Uint8Array`\<`ArrayBufferLike`\>

</td>
</tr>
<tr>
<td>

`options?`

</td>
<td>

[`SameShape`](../type-aliases/SameShape.md)\<[`TransformOptions`](../interfaces/TransformOptions.md), `T`\>

</td>
</tr>
</tbody>
</table>

## Returns

[`TransformResult`](../interfaces/TransformResult.md)\<`T`\>
