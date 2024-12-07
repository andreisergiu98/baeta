# Function: context()

> **context**\<`T`\>(`options`): `Promise`\<[`BuildContext`](../interfaces/BuildContext.md)\<`T`\>\>

This is the advanced long-running form of "build" that supports additional
features such as watch mode and a local development server.

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#build

## Type Parameters

• **T** *extends* [`BuildOptions`](../interfaces/BuildOptions.md)

## Parameters

• **options**: [`SameShape`](../type-aliases/SameShape.md)\<[`BuildOptions`](../interfaces/BuildOptions.md), `T`\>

## Returns

`Promise`\<[`BuildContext`](../interfaces/BuildContext.md)\<`T`\>\>

## Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:553
