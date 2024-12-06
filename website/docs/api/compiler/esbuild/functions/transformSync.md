# Function: transformSync()

> **transformSync**\<`T`\>(`input`, `options`?): [`TransformResult`](../interfaces/TransformResult.md)\<`T`\>

A synchronous version of "transform".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#transform

## Type Parameters

• **T** *extends* [`TransformOptions`](../interfaces/TransformOptions.md)

## Parameters

• **input**: `string` \| `Uint8Array`\<`ArrayBufferLike`\>

• **options?**: [`SameShape`](../type-aliases/SameShape.md)\<[`TransformOptions`](../interfaces/TransformOptions.md), `T`\>

## Returns

[`TransformResult`](../interfaces/TransformResult.md)\<`T`\>

## Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:608
