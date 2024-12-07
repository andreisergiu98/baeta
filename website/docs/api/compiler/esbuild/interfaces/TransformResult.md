# Interface: TransformResult\<ProvidedOptions\>

## Type Parameters

• **ProvidedOptions** *extends* [`TransformOptions`](TransformOptions.md) = [`TransformOptions`](TransformOptions.md)

## Properties

### code

> **code**: `string`

***

### legalComments

> **legalComments**: `string` \| `ProvidedOptions`\[`"legalComments"`\] *extends* `"external"` ? `never` : `undefined`

Only when "legalComments" is "external"

***

### mangleCache

> **mangleCache**: `Record`\<`string`, `string` \| `false`\> \| `ProvidedOptions`\[`"mangleCache"`\] *extends* `Object` ? `never` : `undefined`

Only when "mangleCache" is present

***

### map

> **map**: `string`

***

### warnings

> **warnings**: [`Message`](Message.md)[]
