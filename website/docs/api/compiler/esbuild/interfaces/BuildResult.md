# Interface: BuildResult\<ProvidedOptions\>

## Type Parameters

• **ProvidedOptions** *extends* [`BuildOptions`](BuildOptions.md) = [`BuildOptions`](BuildOptions.md)

## Properties

### errors

> **errors**: [`Message`](Message.md)[]

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:221

***

### mangleCache

> **mangleCache**: `Record`\<`string`, `string` \| `false`\> \| `ProvidedOptions`\[`"mangleCache"`\] *extends* `Object` ? `never` : `undefined`

Only when "mangleCache" is present

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:228

***

### metafile

> **metafile**: [`Metafile`](Metafile.md) \| `ProvidedOptions`\[`"metafile"`\] *extends* `true` ? `never` : `undefined`

Only when "metafile: true"

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:226

***

### outputFiles

> **outputFiles**: [`OutputFile`](OutputFile.md)[] \| `ProvidedOptions`\[`"write"`\] *extends* `false` ? `never` : `undefined`

Only when "write: false"

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:224

***

### warnings

> **warnings**: [`Message`](Message.md)[]

#### Defined in

.yarn/unplugged/esbuild-npm-0.24.0-1252872327/node\_modules/esbuild/lib/main.d.ts:222
