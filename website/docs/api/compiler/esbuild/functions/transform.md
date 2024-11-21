# Function: transform()

> **transform**\<`T`\>(`input`, `options`?): `Promise`\<[`TransformResult`](../interfaces/TransformResult.md)\<`T`\>\>

This function transforms a single JavaScript file. It can be used to minify
JavaScript, convert TypeScript/JSX to JavaScript, or convert newer JavaScript
to older JavaScript. It returns a promise that is either resolved with a
"TransformResult" object or rejected with a "TransformFailure" object.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#transform

## Type Parameters

• **T** *extends* [`TransformOptions`](../interfaces/TransformOptions.md)

## Parameters

• **input**: `string` \| `Uint8Array`

• **options?**: [`SameShape`](../type-aliases/SameShape.md)\<[`TransformOptions`](../interfaces/TransformOptions.md), `T`\>

## Returns

`Promise`\<[`TransformResult`](../interfaces/TransformResult.md)\<`T`\>\>

## Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:566
