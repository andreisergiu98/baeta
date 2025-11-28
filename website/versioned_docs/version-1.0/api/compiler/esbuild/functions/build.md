# build()

> **build**\<`T`\>(`options`): `Promise`\<[`BuildResult`](../interfaces/BuildResult.md)\<`T`\>\>

This function invokes the "esbuild" command-line tool for you. It returns a
promise that either resolves with a "BuildResult" object or rejects with a
"BuildFailure" object.

- Works in node: yes
- Works in browser: yes

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

`Promise`\<[`BuildResult`](../interfaces/BuildResult.md)\<`T`\>\>
