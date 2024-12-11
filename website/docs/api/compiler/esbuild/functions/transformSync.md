# Function: transformSync()

> **transformSync**\<`T`\>(`input`, `options`?): [`TransformResult`](../interfaces/TransformResult.md)\<`T`\>

A synchronous version of "transform".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#transform

## Type Parameters

• **T** _extends_ [`TransformOptions`](../interfaces/TransformOptions.md)

## Parameters

### input

`string` | `Uint8Array`\<`ArrayBufferLike`\>

### options?

[`SameShape`](../type-aliases/SameShape.md)\<[`TransformOptions`](../interfaces/TransformOptions.md), `T`\>

## Returns

[`TransformResult`](../interfaces/TransformResult.md)\<`T`\>
