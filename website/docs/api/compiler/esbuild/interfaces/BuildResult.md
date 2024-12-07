# Interface: BuildResult\<ProvidedOptions\>

## Type Parameters

• **ProvidedOptions** _extends_ [`BuildOptions`](BuildOptions.md) = [`BuildOptions`](BuildOptions.md)

## Properties

### errors

> **errors**: [`Message`](Message.md)[]

---

### mangleCache

> **mangleCache**: `Record`\<`string`, `string` \| `false`\> \| `ProvidedOptions`\[`"mangleCache"`\] _extends_ `Object` ? `never` : `undefined`

Only when "mangleCache" is present

---

### metafile

> **metafile**: [`Metafile`](Metafile.md) \| `ProvidedOptions`\[`"metafile"`\] _extends_ `true` ? `never` : `undefined`

Only when "metafile: true"

---

### outputFiles

> **outputFiles**: [`OutputFile`](OutputFile.md)[] \| `ProvidedOptions`\[`"write"`\] _extends_ `false` ? `never` : `undefined`

Only when "write: false"

---

### warnings

> **warnings**: [`Message`](Message.md)[]
