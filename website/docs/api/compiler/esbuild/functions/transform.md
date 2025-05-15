# transform()

> **transform**\<`T`\>(`input`, `options?`): `Promise`\<[`TransformResult`](../interfaces/TransformResult.md)\<`T`\>\>

This function transforms a single JavaScript file. It can be used to minify
JavaScript, convert TypeScript/JSX to JavaScript, or convert newer JavaScript
to older JavaScript. It returns a promise that is either resolved with a
"TransformResult" object or rejected with a "TransformFailure" object.

- Works in node: yes
- Works in browser: yes

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

`Promise`\<[`TransformResult`](../interfaces/TransformResult.md)\<`T`\>\>
