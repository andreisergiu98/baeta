# Function: build()

> **build**\<`T`\>(`options`): `Promise`\<[`BuildResult`](../interfaces/BuildResult.md)\<`T`\>\>

This function invokes the "esbuild" command-line tool for you. It returns a
promise that either resolves with a "BuildResult" object or rejects with a
"BuildFailure" object.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#build

## Type Parameters

• **T** *extends* [`BuildOptions`](../interfaces/BuildOptions.md)

## Parameters

• **options**: [`SameShape`](../type-aliases/SameShape.md)\<[`BuildOptions`](../interfaces/BuildOptions.md), `T`\>

## Returns

`Promise`\<[`BuildResult`](../interfaces/BuildResult.md)\<`T`\>\>
