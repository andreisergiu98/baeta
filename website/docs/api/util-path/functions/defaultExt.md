# Function: defaultExt()

> **defaultExt**(`filename`, `ext`, `ignoreExts`?, `maxSize`?): `string`

Adds .ext to filename, only if it doesn't already have any old extension.

(Old) extensions are considered to be up to maxSize chars long, counting the dot (defaults to 7).

An Array of ignoreExts (eg ['.min']) will force adding default .ext even if one of these is present.

## Parameters

• **filename**: `string`

string filename to default to it's extension

• **ext**: `string`

string extension to default to

• **ignoreExts?**: `string`[]

array extensions to ignore

• **maxSize?**: `number`

number max length of the extension

## Returns

`string`

## Defined in

[packages/util-path/index.ts:15](https://github.com/andreisergiu98/baeta/blob/277f62f15bfdecc05d507a84e60b62e5bc08a747/packages/util-path/index.ts#L15)
