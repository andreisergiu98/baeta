# Interface: BuildResult\<ProvidedOptions\>

## Type Parameters

• **ProvidedOptions** *extends* [`BuildOptions`](BuildOptions.md) = [`BuildOptions`](BuildOptions.md)

## Properties

### errors

> **errors**: [`Message`](Message.md)[]

***

### mangleCache

> **mangleCache**: `Record`\<`string`, `string` \| `false`\> \| `ProvidedOptions`\[`"mangleCache"`\] *extends* `Object` ? `never` : `undefined`

Only when "mangleCache" is present

***

### metafile

> **metafile**: [`Metafile`](Metafile.md) \| `ProvidedOptions`\[`"metafile"`\] *extends* `true` ? `never` : `undefined`

Only when "metafile: true"

***

### outputFiles

> **outputFiles**: [`OutputFile`](OutputFile.md)[] \| `ProvidedOptions`\[`"write"`\] *extends* `false` ? `never` : `undefined`

Only when "write: false"

***

### warnings

> **warnings**: [`Message`](Message.md)[]
