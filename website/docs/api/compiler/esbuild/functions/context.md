# Function: context()

> **context**\<`T`\>(`options`): `Promise`\<[`BuildContext`](../interfaces/BuildContext.md)\<`T`\>\>

This is the advanced long-running form of "build" that supports additional
features such as watch mode and a local development server.

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#build

## Type Parameters

• **T** _extends_ [`BuildOptions`](../interfaces/BuildOptions.md)

## Parameters

• **options**: [`SameShape`](../type-aliases/SameShape.md)\<[`BuildOptions`](../interfaces/BuildOptions.md), `T`\>

## Returns

`Promise`\<[`BuildContext`](../interfaces/BuildContext.md)\<`T`\>\>
