# Function: analyzeMetafile()

> **analyzeMetafile**(`metafile`, `options`?): `Promise`\<`string`\>

Pretty-prints an analysis of the metafile JSON to a string. This is just for
convenience to be able to match esbuild's pretty-printing exactly. If you want
to customize it, you can just inspect the data in the metafile yourself.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#analyze

## Parameters

• **metafile**: `string` \| [`Metafile`](../interfaces/Metafile.md)

• **options?**: [`AnalyzeMetafileOptions`](../interfaces/AnalyzeMetafileOptions.md)

## Returns

`Promise`\<`string`\>

## Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:588
