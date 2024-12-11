# Function: trimExt()

> **trimExt**(`filename`, `ignoreExts`?, `maxSize`?): `string`

Trims a filename's extension.

Extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) prevents these from being considered as extension, thus are not trimmed.

## Parameters

### filename

`string`

string filename to trim it's extension

### ignoreExts?

`string`[]

array extensions to ignore

### maxSize?

`number`

number max length of the extension

## Returns

`string`
