# Interface: PluginBuild

## Properties

### esbuild

> **esbuild**: `object`

#### analyzeMetafile()

> **analyzeMetafile**: (`metafile`, `options`?) => `Promise`\<`string`\>

Pretty-prints an analysis of the metafile JSON to a string. This is just for
convenience to be able to match esbuild's pretty-printing exactly. If you want
to customize it, you can just inspect the data in the metafile yourself.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#analyze

##### Parameters

• **metafile**: `string` \| [`Metafile`](Metafile.md)

• **options?**: [`AnalyzeMetafileOptions`](AnalyzeMetafileOptions.md)

##### Returns

`Promise`\<`string`\>

#### analyzeMetafileSync()

> **analyzeMetafileSync**: (`metafile`, `options`?) => `string`

A synchronous version of "analyzeMetafile".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#analyze

##### Parameters

• **metafile**: `string` \| [`Metafile`](Metafile.md)

• **options?**: [`AnalyzeMetafileOptions`](AnalyzeMetafileOptions.md)

##### Returns

`string`

#### build()

> **build**: \<`T`\>(`options`) => `Promise`\<[`BuildResult`](BuildResult.md)\<`T`\>\>

This function invokes the "esbuild" command-line tool for you. It returns a
promise that either resolves with a "BuildResult" object or rejects with a
"BuildFailure" object.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#build

##### Type Parameters

• **T** *extends* [`BuildOptions`](BuildOptions.md)

##### Parameters

• **options**: [`SameShape`](../type-aliases/SameShape.md)\<[`BuildOptions`](BuildOptions.md), `T`\>

##### Returns

`Promise`\<[`BuildResult`](BuildResult.md)\<`T`\>\>

#### buildSync()

> **buildSync**: \<`T`\>(`options`) => [`BuildResult`](BuildResult.md)\<`T`\>

A synchronous version of "build".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#build

##### Type Parameters

• **T** *extends* [`BuildOptions`](BuildOptions.md)

##### Parameters

• **options**: [`SameShape`](../type-aliases/SameShape.md)\<[`BuildOptions`](BuildOptions.md), `T`\>

##### Returns

[`BuildResult`](BuildResult.md)\<`T`\>

#### context()

> **context**: \<`T`\>(`options`) => `Promise`\<[`BuildContext`](BuildContext.md)\<`T`\>\>

This is the advanced long-running form of "build" that supports additional
features such as watch mode and a local development server.

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#build

##### Type Parameters

• **T** *extends* [`BuildOptions`](BuildOptions.md)

##### Parameters

• **options**: [`SameShape`](../type-aliases/SameShape.md)\<[`BuildOptions`](BuildOptions.md), `T`\>

##### Returns

`Promise`\<[`BuildContext`](BuildContext.md)\<`T`\>\>

#### formatMessages()

> **formatMessages**: (`messages`, `options`) => `Promise`\<`string`[]\>

Converts log messages to formatted message strings suitable for printing in
the terminal. This allows you to reuse the built-in behavior of esbuild's
log message formatter. This is a batch-oriented API for efficiency.

- Works in node: yes
- Works in browser: yes

##### Parameters

• **messages**: [`PartialMessage`](PartialMessage.md)[]

• **options**: [`FormatMessagesOptions`](FormatMessagesOptions.md)

##### Returns

`Promise`\<`string`[]\>

#### formatMessagesSync()

> **formatMessagesSync**: (`messages`, `options`) => `string`[]

A synchronous version of "formatMessages".

- Works in node: yes
- Works in browser: no

##### Parameters

• **messages**: [`PartialMessage`](PartialMessage.md)[]

• **options**: [`FormatMessagesOptions`](FormatMessagesOptions.md)

##### Returns

`string`[]

#### initialize()

> **initialize**: (`options`) => `Promise`\<`void`\>

This configures the browser-based version of esbuild. It is necessary to
call this first and wait for the returned promise to be resolved before
making other API calls when using esbuild in the browser.

- Works in node: yes
- Works in browser: yes ("options" is required)

Documentation: https://esbuild.github.io/api/#browser

##### Parameters

• **options**: [`InitializeOptions`](InitializeOptions.md)

##### Returns

`Promise`\<`void`\>

#### transform()

> **transform**: \<`T`\>(`input`, `options`?) => `Promise`\<[`TransformResult`](TransformResult.md)\<`T`\>\>

This function transforms a single JavaScript file. It can be used to minify
JavaScript, convert TypeScript/JSX to JavaScript, or convert newer JavaScript
to older JavaScript. It returns a promise that is either resolved with a
"TransformResult" object or rejected with a "TransformFailure" object.

- Works in node: yes
- Works in browser: yes

Documentation: https://esbuild.github.io/api/#transform

##### Type Parameters

• **T** *extends* [`TransformOptions`](TransformOptions.md)

##### Parameters

• **input**: `string` \| `Uint8Array`

• **options?**: [`SameShape`](../type-aliases/SameShape.md)\<[`TransformOptions`](TransformOptions.md), `T`\>

##### Returns

`Promise`\<[`TransformResult`](TransformResult.md)\<`T`\>\>

#### transformSync()

> **transformSync**: \<`T`\>(`input`, `options`?) => [`TransformResult`](TransformResult.md)\<`T`\>

A synchronous version of "transform".

- Works in node: yes
- Works in browser: no

Documentation: https://esbuild.github.io/api/#transform

##### Type Parameters

• **T** *extends* [`TransformOptions`](TransformOptions.md)

##### Parameters

• **input**: `string` \| `Uint8Array`

• **options?**: [`SameShape`](../type-aliases/SameShape.md)\<[`TransformOptions`](TransformOptions.md), `T`\>

##### Returns

[`TransformResult`](TransformResult.md)\<`T`\>

#### version

> **version**: `string`

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:320

***

### initialOptions

> **initialOptions**: [`BuildOptions`](BuildOptions.md)

Documentation: https://esbuild.github.io/plugins/#build-options

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:295

## Methods

### onDispose()

> **onDispose**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-dispose

#### Parameters

• **callback**

#### Returns

`void`

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:317

***

### onEnd()

> **onEnd**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-end

#### Parameters

• **callback**

#### Returns

`void`

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:305

***

### onLoad()

> **onLoad**(`options`, `callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-load

#### Parameters

• **options**: [`OnLoadOptions`](OnLoadOptions.md)

• **callback**

#### Returns

`void`

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:313

***

### onResolve()

> **onResolve**(`options`, `callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-resolve

#### Parameters

• **options**: [`OnResolveOptions`](OnResolveOptions.md)

• **callback**

#### Returns

`void`

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:309

***

### onStart()

> **onStart**(`callback`): `void`

Documentation: https://esbuild.github.io/plugins/#on-start

#### Parameters

• **callback**

#### Returns

`void`

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:301

***

### resolve()

> **resolve**(`path`, `options`?): `Promise`\<[`ResolveResult`](ResolveResult.md)\>

Documentation: https://esbuild.github.io/plugins/#resolve

#### Parameters

• **path**: `string`

• **options?**: [`ResolveOptions`](ResolveOptions.md)

#### Returns

`Promise`\<[`ResolveResult`](ResolveResult.md)\>

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:298
